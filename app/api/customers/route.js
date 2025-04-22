import { query } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request) {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user.role !== 'admin' && session.user.role !== 'manager')) {
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

    // Get customers
    const { rows: customers } = await query(
      'SELECT * FROM customers ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );

    // Get total count
    const { rows: countRows } = await query('SELECT COUNT(*) FROM customers');
    const total = parseInt(countRows[0].count);

    return new Response(JSON.stringify({
      customers,
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

export async function POST(request) {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user.role !== 'admin' && session.user.role !== 'manager')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.customer_type || !data.phone || !data.address) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Insert customer
    const { rows } = await query(
      `INSERT INTO customers (
        customer_type, email, phone, address, tax_id, notes,
        first_name, last_name, company_name, company_reg_number, contact_person,
        credit_limit, payment_terms, is_active
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *`,
      [
        data.customer_type,
        data.email,
        data.phone,
        data.address,
        data.tax_id,
        data.notes,
        data.first_name,
        data.last_name,
        data.company_name,
        data.company_reg_number,
        data.contact_person,
        data.credit_limit || 0,
        data.payment_terms || 'NET 30',
        data.is_active !== false
      ]
    );

    return new Response(JSON.stringify(rows[0]), {
      status: 201,
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