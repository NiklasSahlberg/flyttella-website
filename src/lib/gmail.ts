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
  const envToken = process.env.GMAIL_TOKEN;
  if (envToken) {
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
      'Failed to load Gmail token. Set GMAIL_TOKEN or create token.json locally.'
    );
  }
}

export function getGmailTokenStatus() {
  const envToken = process.env.GMAIL_TOKEN;
  if (!envToken) {
    return { configured: false, parseOk: false, hasRefreshToken: false };
  }

  try {
    const token = parseTokenJson(envToken, 'GMAIL_TOKEN');
    return {
      configured: true,
      parseOk: true,
      hasRefreshToken: Boolean(token.refresh_token),
      hasAccessToken: Boolean(token.access_token),
      expired: token.expiry_date ? token.expiry_date < Date.now() : null,
    };
  } catch {
    return { configured: true, parseOk: false, hasRefreshToken: false };
  }
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
