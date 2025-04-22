import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function GET(request) {
  try {
    const token = request.cookies.get('authToken')?.value;

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const decoded = verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      }
    });
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}