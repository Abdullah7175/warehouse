import { query } from '@/lib/db';
import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function POST(request) {
  const session = await getSession(request);
  
  if (!session || (session.user.role !== 'dealer' && session.user.role !== 'retailer')) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const { customerEmail } = await request.json();

  try {
    // Check if customer exists
    const { rows: customers } = await query(
      'SELECT id FROM users WHERE email = $1 AND role = $2',
      [customerEmail, 'customer']
    );

    if (customers.length === 0) {
      return NextResponse.json(
        { error: 'Customer not found' },
        { status: 404 }
      );
    }

    const customerId = customers[0].id;

    // Check if customer is already assigned
    const { rows: existingAssignments } = await query(
      'SELECT dealer_id FROM customer_assignments WHERE customer_id = $1',
      [customerId]
    );

    if (existingAssignments.length > 0) {
      return NextResponse.json(
        { error: 'Customer already assigned to another dealer' },
        { status: 400 }
      );
    }

    // Create assignment
    await query(
      'INSERT INTO customer_assignments (customer_id, dealer_id) VALUES ($1, $2)',
      [customerId, session.user.id]
    );

    return NextResponse.json(
      { success: true, message: 'Customer assigned successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Assignment error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}