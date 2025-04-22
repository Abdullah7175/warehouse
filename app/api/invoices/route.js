import { query } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const offset = (page - 1) * limit;

    let queryStr = `
      SELECT i.*, c.name as customer_name 
      FROM invoices i
      LEFT JOIN customers c ON i.customer_id = c.id
    `;
    const params = [limit, offset];

    // Different access based on role
    if (session.user.role === 'retailer') {
      queryStr = `
        SELECT i.*, c.name as customer_name 
        FROM invoices i
        LEFT JOIN customers c ON i.customer_id = c.id
        WHERE c.email = $3
        ORDER BY i.date DESC
        LIMIT $1 OFFSET $2
      `;
      params.push(session.user.email);
    } else {
      queryStr += ' ORDER BY i.date DESC LIMIT $1 OFFSET $2';
    }

    const { rows: invoices } = await query(queryStr, params);

    // Get invoice items for each invoice
    for (const invoice of invoices) {
      const { rows: items } = await query(
        'SELECT * FROM invoice_items WHERE invoice_id = $1',
        [invoice.id]
      );
      invoice.items = items;
    }

    // Get total count
    let countQuery = 'SELECT COUNT(*) FROM invoices';
    if (session.user.role === 'retailer') {
      countQuery = `
        SELECT COUNT(*) 
        FROM invoices i
        LEFT JOIN customers c ON i.customer_id = c.id
        WHERE c.email = $1
      `;
    }
    const { rows: countRows } = await query(
      countQuery,
      session.user.role === 'retailer' ? [session.user.email] : []
    );
    const total = parseInt(countRows[0].count);

    return new Response(JSON.stringify({
      invoices,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}