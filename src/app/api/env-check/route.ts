export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getGmailTokenStatus } from '@/lib/gmail';

export async function GET() {
  const hasUrl = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_URL.length > 0);
  const hasToken = Boolean(process.env.KV_REST_API_TOKEN && process.env.KV_REST_API_TOKEN.length > 0);
  const gmailTokenB64Len = process.env['GMAIL_TOKEN_BASE64']?.trim().length ?? 0;
  const gmailTokenLen = process.env['GMAIL_TOKEN']?.trim().length ?? 0;
  const gmailKeys = Object.keys(process.env).filter((key) => key.includes('GMAIL'));
  const tokenFileExists = fs.existsSync(path.join(process.cwd(), 'token.json'));

  return NextResponse.json({
    vercelEnv: process.env.VERCEL_ENV ?? null,
    deploymentId: process.env.VERCEL_DEPLOYMENT_ID ?? null,
    hasUrl,
    hasToken,
    gmailKeysPresent: gmailKeys,
    gmailTokenB64Len,
    gmailTokenLen,
    tokenFileExists,
    gmail: getGmailTokenStatus(),
  });
}


