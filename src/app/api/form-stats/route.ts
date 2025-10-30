import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

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


