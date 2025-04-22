import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { rows } = await query(`
      SELECT 
        i.id, i.name, i.description, i.sku, i.barcode,
        c.name AS category_name,
        inv.quantity, inv.selling_price
      FROM items i
      JOIN categories c ON i.category_id = c.id
      JOIN inventory inv ON i.id = inv.item_id
      WHERE inv.quantity > 0
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error.message },
      { status: 500 }
    );
  }
}