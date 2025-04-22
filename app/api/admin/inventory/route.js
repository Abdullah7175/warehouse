import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { rows } = await query(`
      SELECT 
        SUM(quantity) AS count,
        SUM(quantity * cost_price) AS total_cost,
        SUM(quantity * selling_price) AS total_value
      FROM inventory
    `);
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch inventory data' },
      { status: 500 }
    );
  }
}