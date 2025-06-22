import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import path from 'path';

// If modifying these scopes, delete the token.json file
const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

// OAuth 2.0 credentials
const CLIENT_SECRETS = {
  "installed": {
    "client_id": "670734392263-v52llecuh1rtakdsm3meo265a81r32rp.apps.googleusercontent.com",
    "project_id": "gothic-concept-433715-s3",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "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",
    "redirect_uris": ["http://localhost"]
  }
};

// Initialize Google Cloud Storage client
const storage = new Storage();
const BUCKET_NAME = "flyttella-logs";
const bucket = storage.bucket(BUCKET_NAME);
const FAILED_EMAILS_FILE = "failed_emails.txt";

async function getGmailClient() {
  const oauth2Client = new google.auth.OAuth2(
    CLIENT_SECRETS.installed.client_id,
    CLIENT_SECRETS.installed.client_secret,
    CLIENT_SECRETS.installed.redirect_uris[0]
  );

  // Check if we have stored tokens
  const tokenPath = path.join(process.cwd(), 'token.json');
  
  if (fs.existsSync(tokenPath)) {
    const token = JSON.parse(fs.readFileSync(tokenPath, 'utf-8'));
    oauth2Client.setCredentials(token);
    
    // Check if token is expired
    if (token.expiry_date && token.expiry_date < Date.now()) {
      try {
        const response = await oauth2Client.getAccessToken();
        const newToken = {
          access_token: response.token || token.access_token,
          refresh_token: token.refresh_token,
          scope: token.scope,
          token_type: token.token_type,
          expiry_date: Date.now() + 3600000 // 1 hour from now
        };
        fs.writeFileSync(tokenPath, JSON.stringify(newToken));
        oauth2Client.setCredentials(newToken);
      } catch (error) {
        console.error('Error refreshing access token:', error);
        throw new Error('Failed to refresh access token');
      }
    }
  } else {
    throw new Error('No token.json file found. Please run the generate-token script first.');
  }

  return google.gmail({ version: 'v1', auth: oauth2Client });
}

function createEmail(to: string, from: string, subject: string, messageText: string) {
  const emailLines = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=utf-8',
    '',
    messageText
  ];

  const email = emailLines.join('\r\n').trim();
  const base64Email = Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  
  return base64Email;
}

function formatFlexibleDate(value: string | undefined): string {
  if (!value || value === 'Nej') {
    return 'Nej';
  }
  return value;
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const isFlexible = data.flexibleMovingDate && data.flexibleMovingDate !== 'Nej';

    // Format the email content with HTML table
    const emailContent = `
<!DOCTYPE html>
<html>
<head>
<style>
  table {
    border-collapse: collapse;
    width: 100%;
    max-width: 800px;
    margin: 20px 0;
    font-family: Arial, sans-serif;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }
  th {
    background-color: #f8f9fa;
    font-weight: bold;
  }
  .section-header {
    background-color: #f8f9fa;
    padding: 10px;
    margin-top: 20px;
    font-weight: bold;
    border: 1px solid #ddd;
  }
</style>
</head>
<body>
  <h2>Ny lead Flyttella - Städning</h2>

  <div class="section-header">Städdatum</div>
  <table>
    <tr>
      <th>När ska flyttstädningen ske?</th>
      <td>${data.movingDate || ''}</td>
    </tr>
    <tr>
      <th>Är städdatumet flexibelt?</th>
      <td>${isFlexible ? 'Ja' : 'Nej'}</td>
    </tr>
    ${isFlexible ? `
    <tr>
      <th>Flexibilitet</th>
      <td>${formatFlexibleDate(data.flexibleMovingDate)}</td>
    </tr>
    ` : ''}
  </table>

  <div class="section-header">Bostadsinformation</div>
  <table>
    <tr>
      <th>${data.customerType === 'foretag' ? 'Bostadstyp' : 'Vilken typ av bostad ska städas?'}</th>
      <td>${data.typeOfHome || ''}</td>
    </tr>
    <tr>
      <th>${data.customerType === 'privat' && data.typeOfHome?.toLowerCase() === 'lagenhet' ? 'Vilken våning ligger lägenheten på?' : 'Antal våningar'}</th>
      <td>${data.numberOfFloors || ''}</td>
    </tr>
    ${(data.customerType === 'foretag' || (data.customerType === 'privat' && data.typeOfHome?.toLowerCase() === 'lagenhet')) ? `
    <tr>
      <th>Finns hiss i byggnaden?</th>
      <td>${data.hasElevator === "yes" ? "Ja" : "Nej"}</td>
    </tr>
    ` : ''}
    <tr>
      <th>Hela bostaden</th>
      <td>${data.entireHome === "yes" ? "Ja" : "Nej"}</td>
    </tr>
    <tr>
      <th>Yta</th>
      <td>${data.squareMeters || ''} kvm</td>
    </tr>
  </table>

  <div class="section-header">Rum</div>
  <table>
    <tr>
      <th>Sovrum</th>
      <td>${data.bedrooms || 0}</td>
    </tr>
    <tr>
      <th>Badrum</th>
      <td>${data.bathrooms || 0}</td>
    </tr>
    <tr>
      <th>Kök</th>
      <td>${data.kitchen || 0}</td>
    </tr>
    <tr>
      <th>Vardagsrum</th>
      <td>${data.livingRoom || 0}</td>
    </tr>
    <tr>
      <th>Övriga rum</th>
      <td>${data.otherRooms || 0}</td>
    </tr>
  </table>

  <div class="section-header">Ytterligare utrymmen</div>
  <table>
    ${data.customerType !== 'foretag' ? `
    <tr>
      <th>Garage</th>
      <td>${data.hasGarage ? "Ja" : "Nej"}</td>
    </tr>
    <tr>
      <th>Balkong/veranda/terrass</th>
      <td>${data.hasBalcony ? "Ja" : "Nej"}</td>
    </tr>
    <tr>
      <th>Förråd/uthus</th>
      <td>${data.hasStorage ? "Ja" : "Nej"}</td>
    </tr>
    ` : ''}
  </table>

  <div class="section-header">Kontakttyp</div>
  <table>
    <tr>
      <th>Kontakttyp</th>
      <td>${data.customerType === 'foretag' ? 'Företag' : 'Privat'}</td>
    </tr>
  </table>

  <div class="section-header">Kontaktinformation</div>
  <table>
    <tr>
      <th>Namn</th>
      <td>${data.name || ''}</td>
    </tr>
    <tr>
      <th>E-post</th>
      <td>${data.email || ''}</td>
    </tr>
    <tr>
      <th>Telefon</th>
      <td>${data.phone || ''}</td>
    </tr>
    <tr>
      <th>Adress</th>
      <td>${data.address || ''} ${data.streetNumber || ''}</td>
    </tr>
    <tr>
      <th>Postnummer</th>
      <td>${data.postalCode || ''}</td>
    </tr>
  </table>

  ${data.comments ? `
  <div class="section-header">Kommentarer</div>
  <table>
    <tr>
      <td>${data.comments}</td>
    </tr>
  </table>
  ` : ''}
</body>
</html>
    `;

    // Get Gmail client
    const gmail = await getGmailClient();

    // Create the email
    const raw = createEmail(
      'niklassahlbergdeveloper@gmail.com',
      'niklassahlbergdeveloper@gmail.com',
      'Ny lead Flyttella',
      emailContent
    );

    // Send the email
    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: raw
      }
    });

    console.log('Email sent successfully:', res.data.id);
    return NextResponse.json({ success: true, messageId: res.data.id });
  } catch (error: unknown) {
    console.error('Error sending email:', error);
    
    // Log failed email to Cloud Storage
    try {
      const failedEmail = `${new Date().toISOString()}: ${error instanceof Error ? error.message : String(error)}\n`;
      const file = bucket.file(FAILED_EMAILS_FILE);
      await file.save(failedEmail, { resumable: false });
    } catch (storageError) {
      console.error('Error logging to storage:', storageError);
    }

    return NextResponse.json(
      { error: 'Failed to send email', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 