import { NextResponse } from 'next/server';
import { Storage } from '@google-cloud/storage';

const storage = new Storage();
const BUCKET_NAME = "flyttella-logs";
const bucket = storage.bucket(BUCKET_NAME);
const SUBMISSION_COUNTS_FILE = "submission_counts.json";

export async function GET() { 
  try {
    const file = bucket.file(SUBMISSION_COUNTS_FILE);
    const [exists] = await file.exists();
    if (!exists) {
      return NextResponse.json({ moving: 0, cleaning: 0, total: 0 });
    }
    const [contents] = await file.download();
    let counts: Record<string, number> = {};
    try {
      counts = JSON.parse(contents.toString() || '{}');
    } catch {
      counts = {};
    }
    const moving = counts['moving'] || 0;
    const cleaning = counts['cleaning'] || 0;
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


