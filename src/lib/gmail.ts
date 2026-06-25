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
    redirect_uris: ['http://localhost'],
  },
};

interface GmailToken {
  access_token?: string;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
  expiry_date?: number;
}

function loadGmailToken(): GmailToken {
  const envToken = process.env.GMAIL_TOKEN;
  if (envToken) {
    try {
      return JSON.parse(envToken) as GmailToken;
    } catch (error) {
      console.error('Error parsing GMAIL_TOKEN:', error);
      throw new Error('Failed to parse GMAIL_TOKEN');
    }
  }

  try {
    const tokenPath = path.join(process.cwd(), 'token.json');
    const tokenData = fs.readFileSync(tokenPath, 'utf8');
    return JSON.parse(tokenData) as GmailToken;
  } catch (error) {
    console.error('Error loading token:', error);
    throw new Error(
      'Failed to load Gmail token. Set GMAIL_TOKEN or create token.json locally.'
    );
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

  if (token.expiry_date && token.expiry_date < Date.now()) {
    try {
      const response = await oauth2Client.getAccessToken();
      const newToken = {
        access_token: response.token || token.access_token,
        refresh_token: token.refresh_token,
        scope: token.scope,
        token_type: token.token_type,
        expiry_date: Date.now() + 3600000,
      };
      oauth2Client.setCredentials(newToken);
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw new Error('Failed to refresh access token');
    }
  }

  return google.gmail({ version: 'v1', auth: oauth2Client });
}
