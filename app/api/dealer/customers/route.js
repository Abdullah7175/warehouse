import { query } from '@/lib/db';
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function GET(request) {
  const session = await getSession(request);
  
  if (!session || (session.user.role !== 'dealer' && session.user.role !== 'retailer')) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    // Get assigned customers with their order history
    const { rows: customers } = await query(`
      SELECT 
        u.id, u.name, u.email, 
        COUNT(o.id) as total_orders,
        SUM(o.total_amount) as total_spent
      FROM 
        customer_assignments ca
      JOIN 
        users u ON ca.customer_id = u.id
      LEFT JOIN 
        orders o ON u.id = o.customer_id
      WHERE 
        ca.dealer_id = $1
      GROUP BY 
        u.id, u.name, u.email
    `, [session.user.id]);

    return NextResponse.json({ customers });

  } catch (error) {
    console.error('Failed to fetch dealer customers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}