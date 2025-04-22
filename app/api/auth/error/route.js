import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const error = searchParams.get('error');
  
  // Add detailed error logging
  console.error("Authentication error:", error);
  
  return NextResponse.json({
    error: error || 'Authentication error occurred',
    url: request.url
  }, { status: 500 });
}