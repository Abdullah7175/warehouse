import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { rows } = await query(`
      SELECT COUNT(*) AS count 
      FROM items
      WHERE id IN (SELECT item_id FROM inventory WHERE quantity > 0)
    `);
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product count' },
      { status: 500 }
    );
  }
}