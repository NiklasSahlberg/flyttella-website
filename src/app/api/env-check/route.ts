export const runtime = 'nodejs';
import { NextResponse } from 'next/server';

export async function GET() {
  const hasUrl = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_URL.length > 0);
  const hasToken = Boolean(process.env.KV_REST_API_TOKEN && process.env.KV_REST_API_TOKEN.length > 0);

  return NextResponse.json({
    hasUrl,
    hasToken
  });
}


