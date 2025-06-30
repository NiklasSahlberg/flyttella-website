import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import path from 'path';

// If modifying these scopes, delete the token.json file
const _SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

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

// Replace any with proper type
interface _EmailData {
  name: string;
  email: string;
  phone: string;
  // ... other email fields
}

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

export async function POST(req: Request) {
  try {
    const data = await req.json();

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
  <h2>Ny lead flyttella</h2>

  <div class="section-header">Behov</div>
  <table>
    <tr>
      <th>Flytta från utlandet</th>
      <td>${data.flyttaFran?.fromAbroad || 'no'}</td>
    </tr>
    <tr>
      <th>Flytta till utlandet</th>
      <td>${data.flyttaTill?.toAbroad || 'no'}</td>
    </tr>
    <tr>
      <th>Kontakttyp</th>
      <td>${data.kontaktTyp || 'Privat'}</td>
    </tr>
    <tr>
      <th>Önskat flyttdatum</th>
      <td>${data.datum || ''}</td>
    </tr>
    <tr>
      <th>Flexibelt flyttdatum</th>
      <td>${data.flexibeltDatum || ''}</td>
    </tr>
  </table>

  <div class="section-header">Tjänster</div>
  <table>
    <tr>
      <th>Vill du att flyttfirman packar dina ägodelar?</th>
      <td>${data.villDuHaPackhjalp ? 'Ja' : 'Nej'}</td>
    </tr>
    <tr>
      <th>Ska dina ägodelar förvaras i lager mellan ut- och inflyttning?</th>
      <td>${data.villDuHaLagring ? 'Ja' : 'Nej'}</td>
    </tr>
    <tr>
      <th>Vill du ha flyttstädning i din nuvarande bostad?</th>
      <td>${data.villDuHaStadning ? 'Ja' : 'Nej'}</td>
    </tr>
  </table>

  <div class="section-header">Flytta från (nuvarande)</div>
  <table>
    <tr>
      <th>Nuvarande adress</th>
      <td>${data.flyttaFran?.address || ''}</td>
    </tr>
    <tr>
      <th>Nuvarande gatunummer</th>
      <td>${data.flyttaFran?.gatunummer || ''}</td>
    </tr>
    <tr>
      <th>Nuvarande postnummer</th>
      <td>${data.flyttaFran?.postnummer || ''}</td>
    </tr>
    <tr>
      <th>Nuvarande bostadstyp</th>
      <td>${data.flyttaFran?.bostadstyp || ''}</td>
    </tr>
    <tr>
      <th>Nuvarande antal kvadratmeter</th>
      <td>${data.flyttaFran?.kvadrat || ''}</td>
    </tr>
    <tr>
      <th>Nuvarande antal rum</th>
      <td>${data.flyttaFran?.antalRum || ''}</td>
    </tr>
    <tr>
      <th>Nuvarande våning</th>
      <td>${data.flyttaFran?.vaningNr || ''}</td>
    </tr>
    <tr>
      <th>Nuvarande hiss</th>
      <td>${data.flyttaFran?.hasElevator || ''}</td>
    </tr>
    ${data.flyttaFran?.hasElevator === 'Ja' ? `
    <tr>
      <th>Nuvarande hisstorlek</th>
      <td>${data.flyttaFran?.elevatorSize || ''}</td>
    </tr>
    ` : ''}
    <tr>
      <th>Nuvarande parkeringsavstånd</th>
      <td>${data.flyttaFran?.parkeringsAvstand || ''}</td>
    </tr>
    ${data.flyttaFran?.workplaceCount ? `
    <tr>
      <th>Antal arbetsplatser</th>
      <td>${data.flyttaFran.workplaceCount}</td>
    </tr>
    ` : ''}
  </table>

  <div class="section-header">Flytta till (ny)</div>
  <table>
    <tr>
      <th>Ny adress</th>
      <td>${data.flyttaTill?.address || ''}</td>
    </tr>
    <tr>
      <th>Nytt gatunummer</th>
      <td>${data.flyttaTill?.gatunummer || ''}</td>
    </tr>
    <tr>
      <th>Nytt postnummer</th>
      <td>${data.flyttaTill?.postnummer || ''}</td>
    </tr>
    <tr>
      <th>Ny bostadstyp</th>
      <td>${data.flyttaTill?.bostadstyp || ''}</td>
    </tr>
    <tr>
      <th>Nytt antal kvadratmeter</th>
      <td>${data.flyttaTill?.kvadrat || ''}</td>
    </tr>
    <tr>
      <th>Nytt antal rum</th>
      <td>${data.flyttaTill?.antalRum || ''}</td>
    </tr>
    <tr>
      <th>Ny våning</th>
      <td>${data.flyttaTill?.vaningNr || ''}</td>
    </tr>
    <tr>
      <th>Ny hiss</th>
      <td>${data.flyttaTill?.hasElevator || ''}</td>
    </tr>
    ${data.flyttaTill?.hasElevator === 'Ja' ? `
    <tr>
      <th>Ny hisstorlek</th>
      <td>${data.flyttaTill?.elevatorSize || ''}</td>
    </tr>
    ` : ''}
    <tr>
      <th>Nytt parkeringsavstånd</th>
      <td>${data.flyttaTill?.parkeringsAvstand || ''}</td>
    </tr>
  </table>

  <div class="section-header">Föremål</div>
  <table>
    <tr>
      <th>Tunga föremål</th>
      <td>${data.tungaForemal || 'Nej'}</td>
    </tr>
    <tr>
      <th>Ömtåliga föremål</th>
      <td>${data.omtaligaForemal || 'Nej'}</td>
    </tr>
  </table>

  <div class="section-header">Kontaktinformation</div>
  <table>
    <tr>
      <th>Namn</th>
      <td>${data.kontaktInfo?.namn || ''}</td>
    </tr>
    <tr>
      <th>E-post</th>
      <td>${data.kontaktInfo?.email || ''}</td>
    </tr>
    <tr>
      <th>Telefon</th>
      <td>${data.kontaktInfo?.telefon || ''}</td>
    </tr>
  </table>

  ${data.additionalInfo ? `
  <div class="section-header">Övriga önskemål</div>
  <table>
    <tr>
      <td>${data.additionalInfo}</td>
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
      'Ny lead flyttella',
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
  } catch (error: any) {
    console.error('Error sending email:', error);
    
    // Log failed email to Cloud Storage
    try {
      const failedEmail = `${new Date().toISOString()}: ${error.message}\n`;
      const file = bucket.file(FAILED_EMAILS_FILE);
      await file.save(failedEmail, { resumable: false });
    } catch (storageError) {
      console.error('Error logging to storage:', storageError);
    }

    return NextResponse.json(
      { error: 'Failed to send email', details: error.message },
      { status: 500 }
    );
  }
} 