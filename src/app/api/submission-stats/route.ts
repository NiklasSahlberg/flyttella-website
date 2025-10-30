/// <reference path="../../../types/vercel-kv.d.ts" />
import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function GET() { 
  try {
    const [movingVal, cleaningVal] = await kv.mget<number>(
      'submission:moving',
      'submission:cleaning'
    );
    const moving = Number(movingVal || 0);
    const cleaning = Number(cleaningVal || 0);
    const total = moving + cleaning;
    return NextResponse.json(
      { moving, cleaning, total },
      { headers: { 'X-Robots-Tag': 'noindex, nofollow, noarchive' } }
    );
  } catch (err) {
    console.error('Error reading submission counts:', err);
    return NextResponse.json(
      { moving: 0, cleaning: 0, total: 0 },
      { headers: { 'X-Robots-Tag': 'noindex, nofollow, noarchive' } }
    );
  }
}


