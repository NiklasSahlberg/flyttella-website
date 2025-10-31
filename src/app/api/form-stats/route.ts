export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { kv as envKv, createClient } from '@vercel/kv';

// TEMPORARY: mirror fallback used in src/lib/kvCounters.ts
const FALLBACK_URL = 'https://full-bobcat-31285.upstash.io';
const FALLBACK_TOKEN = 'AXo1AAIncDJmYWQ0MWE4ODljODk0OGEyOGJiYWU0M2Y3OTFmZmE3ZnAyMzEyODU';

const kv = (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
  ? envKv
  : createClient({ url: FALLBACK_URL, token: FALLBACK_TOKEN });

export async function GET() {
  try {
    const [cleaning, moving] = await Promise.all([
      kv.get<number>('forms:cleaning:count'),
      kv.get<number>('forms:moving:count')
    ]);

    return NextResponse.json({
      cleaning: cleaning ?? 0,
      moving: moving ?? 0
    });
  } catch (error) {
    console.error('form-stats read error', error);
    return NextResponse.json(
      { error: 'Failed to read counters' },
      { status: 500 }
    ); 
  }
}


