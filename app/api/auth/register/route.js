import { query } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, password, role, dealerCode } = await request.json();
    
    // Validate role
    const allowedRoles = ['customer', 'dealer', 'retailer', 'admin'];
    if (!allowedRoles.includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role specified' },
        { status: 400 }
      );
    }

    // Additional validation for dealers/retailers
    if ((role === 'dealer' || role === 'retailer') && !dealerCode) {
      return NextResponse.json(
        { error: 'Dealer code is required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const { rows: existingUsers } = await query(
      'SELECT id FROM users WHERE email = $1',
      [email.toLowerCase().trim()]
    );

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const { rows } = await query(
      `INSERT INTO users (name, email, password, role, dealer_code) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, name, email, role, dealer_code`,
      [name.trim(), email.toLowerCase().trim(), hashedPassword, role, dealerCode]
    );

    return NextResponse.json(rows[0], { status: 201 });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}