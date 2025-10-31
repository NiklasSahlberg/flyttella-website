import { kv as envKv, createClient } from '@vercel/kv';

// TEMPORARY hardcoded fallback. Remove after Production env vars work, then rotate tokens.
const FALLBACK_URL = 'https://full-bobcat-31285.upstash.io';
const FALLBACK_TOKEN = 'AXo1AAIncDJmYWQ0MWE4ODljODk0OGEyOGJiYWU0M2Y3OTFmZmE3ZnAyMzEyODU';

const kv = (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
  ? envKv
  : createClient({ url: FALLBACK_URL, token: FALLBACK_TOKEN });

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


