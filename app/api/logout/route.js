import { NextResponse } from 'next/server';
import { removeTokenCookie } from '@/lib/auth';

export function POST() {
  const response = NextResponse.json({ success: true });
  removeTokenCookie(response);
  return response;
}