import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

const CLIENT_SECRETS = {
  installed: {
    client_id:
      '670734392263-v52llecuh1rtakdsm3meo265a81r32rp.apps.googleusercontent.com',
    project_id: 'gothic-concept-433715-s3',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_secret: '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',
    redirect_uris: ['http://localhost:3001/oauth2callback'],
  },
};

interface GmailToken {
  access_token?: string;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
  expiry_date?: number;
}

// Dynamic lookup prevents Next.js from inlining undefined at build time.
function readEnv(key: string): string | undefined {
  return process.env[key];
}

function parseTokenJson(raw: string, source: string): GmailToken {
  const trimmed = raw.trim();

  try {
    return JSON.parse(trimmed) as GmailToken;
  } catch {
    // Common Vercel paste mistake: extra wrapping quotes around the JSON object
    if (
      (trimmed.startsWith("'") && trimmed.endsWith("'")) ||
      (trimmed.startsWith('"') && trimmed.endsWith('"') && !trimmed.startsWith('{"'))
    ) {
      try {
        return JSON.parse(trimmed.slice(1, -1)) as GmailToken;
      } catch (innerError) {
        console.error(`Error parsing ${source}:`, innerError);
      }
    }

    throw new Error(`Failed to parse ${source}. Paste the full JSON on one line.`);
  }
}

function loadGmailToken(): GmailToken {
  const envTokenB64 = readEnv('GMAIL_TOKEN_BASE64');
  if (envTokenB64?.trim()) {
    const decoded = Buffer.from(envTokenB64.trim(), 'base64').toString('utf8');
    const token = parseTokenJson(decoded, 'GMAIL_TOKEN_BASE64');
    if (!token.refresh_token) {
      throw new Error(
        'GMAIL_TOKEN_BASE64 is missing refresh_token. Regenerate token with generate-token.ts.'
      );
    }
    return token;
  }

  const envToken = readEnv('GMAIL_TOKEN');
  if (envToken?.trim()) {
    const token = parseTokenJson(envToken, 'GMAIL_TOKEN');
    if (!token.refresh_token) {
      throw new Error(
        'GMAIL_TOKEN is missing refresh_token. Regenerate token with generate-token.ts and paste the full JSON.'
      );
    }
    return token;
  }

  try {
    const tokenPath = path.join(process.cwd(), 'token.json');
    const tokenData = fs.readFileSync(tokenPath, 'utf8');
    return parseTokenJson(tokenData, 'token.json');
  } catch (error) {
    console.error('Error loading token:', error);
    throw new Error(
      'Failed to load Gmail token. Set GMAIL_TOKEN_BASE64, GMAIL_TOKEN, or create token.json locally.'
    );
  }
}

export function getGmailTokenStatus() {
  const rawToken = readEnv('GMAIL_TOKEN');
  const rawTokenB64 = readEnv('GMAIL_TOKEN_BASE64');
  const envSource = rawTokenB64?.trim()
    ? 'GMAIL_TOKEN_BASE64'
    : rawToken?.trim()
      ? 'GMAIL_TOKEN'
      : null;

  if (envSource) {
    try {
      const raw = envSource === 'GMAIL_TOKEN_BASE64' ? rawTokenB64! : rawToken!;
      const parsed =
        envSource === 'GMAIL_TOKEN_BASE64'
          ? parseTokenJson(
              Buffer.from(raw.trim(), 'base64').toString('utf8'),
              envSource
            )
          : parseTokenJson(raw, envSource);

      return {
        configured: true,
        source: envSource,
        parseOk: true,
        hasRefreshToken: Boolean(parsed.refresh_token),
        hasAccessToken: Boolean(parsed.access_token),
        expired: parsed.expiry_date ? parsed.expiry_date < Date.now() : null,
        tokenLength: raw.trim().length,
      };
    } catch {
      const raw = envSource === 'GMAIL_TOKEN_BASE64' ? rawTokenB64! : rawToken!;
      return {
        configured: true,
        source: envSource,
        parseOk: false,
        hasRefreshToken: false,
        tokenLength: raw.trim().length,
      };
    }
  }

  const tokenPath = path.join(process.cwd(), 'token.json');
  if (fs.existsSync(tokenPath)) {
    try {
      const raw = fs.readFileSync(tokenPath, 'utf8');
      const parsed = parseTokenJson(raw, 'token.json');
      return {
        configured: true,
        source: 'token.json',
        parseOk: true,
        hasRefreshToken: Boolean(parsed.refresh_token),
        hasAccessToken: Boolean(parsed.access_token),
        expired: parsed.expiry_date ? parsed.expiry_date < Date.now() : null,
        tokenLength: raw.trim().length,
      };
    } catch {
      return {
        configured: true,
        source: 'token.json',
        parseOk: false,
        hasRefreshToken: false,
        tokenLength: 0,
      };
    }
  }

  return {
    configured: false,
    source: null,
    parseOk: false,
    hasRefreshToken: false,
    tokenLength: 0,
  };
}

export async function getGmailClient() {
  const oauth2Client = new google.auth.OAuth2(
    CLIENT_SECRETS.installed.client_id,
    CLIENT_SECRETS.installed.client_secret,
    CLIENT_SECRETS.installed.redirect_uris[0]
  );

  const token = loadGmailToken();
  oauth2Client.setCredentials(token);

  try {
    await oauth2Client.getAccessToken();
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw new Error('Failed to refresh access token');
  }

  return google.gmail({ version: 'v1', auth: oauth2Client });
}
