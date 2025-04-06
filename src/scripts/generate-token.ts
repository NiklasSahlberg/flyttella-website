import { google } from 'googleapis';
import http from 'http';
import url from 'url';
import fs from 'fs';
import path from 'path';
import open from 'open';

const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];
const TOKEN_PATH = path.join(process.cwd(), 'token.json');

const CLIENT_SECRETS = {
  "installed": {
    "client_id": "670734392263-v52llecuh1rtakdsm3meo265a81r32rp.apps.googleusercontent.com",
    "project_id": "gothic-concept-433715-s3",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "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",
    "redirect_uris": ["http://localhost:3000/oauth2callback"]
  }
};

async function generateToken() {
  const oauth2Client = new google.auth.OAuth2(
    CLIENT_SECRETS.installed.client_id,
    CLIENT_SECRETS.installed.client_secret,
    CLIENT_SECRETS.installed.redirect_uris[0]
  );

  // Create an HTTP server to handle the OAuth2 callback
  const server = http.createServer(async (req, res) => {
    try {
      const parsedUrl = url.parse(req.url!, true);
      if (parsedUrl.pathname === '/oauth2callback') {
        const code = parsedUrl.query.code as string;
        
        // Exchange the authorization code for tokens
        const { tokens } = await oauth2Client.getToken(code);
        
        // Save the tokens to file
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
        console.log('Token stored to:', TOKEN_PATH);

        // Close the response and the server
        res.end('Authentication successful! You can close this window.');
        server.close();
      }
    } catch (error) {
      console.error('Error getting tokens:', error);
      res.end('Authentication failed! Please check the console.');
      server.close();
    }
  });

  // Start the server on port 3000
  server.listen(3000, () => {
    // Generate the authentication URL
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });

    // Open the authorization URL in the default browser
    console.log('Opening browser for authentication...');
    open(authUrl);
  });

  console.log('Waiting for authentication...');
}

generateToken(); 