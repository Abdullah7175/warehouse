import { NextResponse } from 'next/server';
import { createToken, verifyPassword } from '@/lib/auth';
import { query } from '@/lib/db';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Get user from database
    const { rows } = await query(
      'SELECT id, email, password, role, name FROM users WHERE email = $1',
      [email.toLowerCase().trim()]
    );

    if (!rows.length) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const user = rows[0];

    // Verify password
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create token
    const token = createToken(user);

    // Create response
    const response = NextResponse.json({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      redirectTo: getRedirectPath(user.role)
    });

    // Set cookie
    response.cookies.set('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: MAX_AGE
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


function getRedirectPath(role) {
  switch(role) {
    case 'admin': return '/admin/dashboard';
    case 'dealer': return '/dealer/dashboard';
    case 'retailer': return '/retailer/dashboard';
    case 'customer': return '/customer/dashboard';
    case 'manager': return '/manager/dashboard';
    default: return '/';
  }
}