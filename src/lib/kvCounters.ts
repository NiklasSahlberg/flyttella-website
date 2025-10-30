import { kv } from '@vercel/kv';

const CLEANING_TOTAL_KEY = 'forms:cleaning:count';
const MOVING_TOTAL_KEY = 'forms:moving:count';

async function incrementKey(key: string): Promise<void> {
  try {
    await kv.incr(key);
  } catch (error) {
    // Non-critical: log and continue without failing the request pipeline
    console.error('KV increment failed for', key, error);
  }
}

export async function incrementCleaningSubmission(): Promise<void> {
  await incrementKey(CLEANING_TOTAL_KEY);
}

export async function incrementMovingSubmission(): Promise<void> {
  await incrementKey(MOVING_TOTAL_KEY);
}


