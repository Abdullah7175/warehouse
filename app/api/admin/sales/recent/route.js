import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Recent orders (last 24 hours)
    const { rows: orders } = await query(`
      SELECT 
        o.id, o.total_amount, o.date,
        u.name AS customer_name
      FROM orders o
      JOIN users u ON o.customer_id = u.id
      WHERE o.date >= NOW() - INTERVAL '24 HOUR'
      ORDER BY o.date DESC
      LIMIT 5
    `);

    // Recent invoices (last 24 hours)
    const { rows: invoices } = await query(`
      SELECT 
        i.id, i.total_amount, i.date,
        c.company_name AS customer_name
      FROM invoices i
      JOIN customers c ON i.customer_id = c.id
      WHERE i.date >= NOW() - INTERVAL '24 HOUR'
      ORDER BY i.date DESC
      LIMIT 5
    `);

    return NextResponse.json({
      count: orders.length + invoices.length,
      orders: [...orders, ...invoices].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5)
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch recent sales' },
      { status: 500 }
    );
  }
}