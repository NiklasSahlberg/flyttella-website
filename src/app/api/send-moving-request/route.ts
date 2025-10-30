import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import path from 'path';
import { incrementMovingSubmission } from '../../../lib/kvCounters';

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

  // Load token from file
  let token;
  try {
    const tokenPath = path.join(process.cwd(), 'token.json');
    const tokenData = fs.readFileSync(tokenPath, 'utf8');
    token = JSON.parse(tokenData);
  } catch (error) {
    console.error('Error loading token:', error);
    throw new Error('Failed to load Gmail token');
  }

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
      oauth2Client.setCredentials(newToken);
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw new Error('Failed to refresh access token');
    }
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

// Function to map flexible date option values to display text
function getFlexibleDateText(value: string): string {
  const flexibleDateMap: { [key: string]: string } = {
    '1': '+ 1 dag',
    '2': '+ 2 dagar', 
    '3': '+ 3 dagar',
    '4': '+ 4 dagar',
    '5': '+ 5 dagar',
    '6': '+ 6 dagar',
    '7': '+ 1 vecka',
    '14': '+ 2 veckor',
    '21': '+ 3 veckor',
    '30': '+ 1 månad',
    '31+': '+ 1 månad eller mer'
  };
  
  return flexibleDateMap[value] || value;
}

// Function to get base64 encoded logo
function getLogoBase64(): string {
  try {
    // Try to get logo from environment variable first (for Vercel)
    if (process.env.FLYTTELLA_LOGO_BASE64) {
      return process.env.FLYTTELLA_LOGO_BASE64;
    }
    
    // Fallback to file system (for local development)
    const logoPath = path.join(process.cwd(), 'public', 'flyttella-logo.png');
    if (fs.existsSync(logoPath)) {
      const logoBuffer = fs.readFileSync(logoPath);
      return `data:image/png;base64,${logoBuffer.toString('base64')}`;
    }
    
    return ''; // Return empty string if logo can't be read
  } catch (error) {
    console.error('Error reading logo file:', error);
    return ''; // Return empty string if logo can't be read
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const logoBase64 = getLogoBase64();

    // Format the email content with HTML table
    const emailContent = `
<!DOCTYPE html>
<html>
<head>
<style>
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f8f9fa;
  }
  .container {
    max-width: 600px;
    margin: 0 auto;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    overflow: hidden;
  }
  .header {
    background: linear-gradient(135deg, #0F172A 0%, #10B981 100%);
    color: white;
    padding: 20px;
    text-align: center;
  }
  .logo {
    width: 120px;
    height: auto;
    margin-bottom: 10px;
  }
  .content {
    padding: 20px;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    margin: 15px 0;
    font-size: 14px;
  }
  th, td {
    border: 1px solid #e5e7eb;
    padding: 8px 12px;
    text-align: left;
    vertical-align: top;
  }
  th {
    background-color: #f3f4f6;
    font-weight: 600;
    color: #374151;
    width: 40%;
  }
  td {
    background-color: white;
    color: #1f2937;
  }
  .section-header {
    background: linear-gradient(135deg, #0F172A 0%, #10B981 100%);
    color: white;
    padding: 12px 16px;
    margin: 20px 0 10px 0;
    font-weight: 600;
    font-size: 16px;
    border-radius: 4px;
  }
  .compact-row {
    margin-bottom: 5px;
  }
  .highlight {
    background-color: #fef3c7;
    border-left: 4px solid #f59e0b;
  }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      ${logoBase64 ? `<img src="${logoBase64}" alt="Flyttella Logo" class="logo" style="max-width: 120px; height: auto;">` : ''}
      <h2 style="margin: 0; font-size: 24px;">Ny Flyttlead - Flyttella</h2>
    </div>
    <div class="content">

      <div class="section-header">📋 Behov</div>
      <table>
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
          <td>${data.flexibeltDatum === 'Nej' ? 'Nej' : getFlexibleDateText(data.flexibeltDatum) || ''}</td>
        </tr>
      </table>

      <div class="section-header">🔧 Tjänster</div>
      <table>
        <tr>
          <th>Packning</th>
          <td>${data.villDuHaPackhjalp === 'Yes' ? 'Ja' : data.villDuHaPackhjalp === 'No' ? 'Nej' : data.villDuHaPackhjalp || 'Nej'}</td>
        </tr>
        <tr>
          <th>Magasinering</th>
          <td>${data.villDuHaLagring === 'Yes' ? 'Ja' : data.villDuHaLagring === 'No' ? 'Nej' : data.villDuHaLagring || 'Nej'}</td>
        </tr>
        <tr>
          <th>Flyttstädning</th>
          <td>${data.villDuHaStadning === 'Yes' ? 'Ja' : data.villDuHaStadning === 'No' ? 'Nej' : data.villDuHaStadning || 'Nej'}</td>
        </tr>
        <tr>
          <th>Bortforsling</th>
          <td>${data.villDuHaBortforsling === 'Yes' ? 'Ja' : data.villDuHaBortforsling === 'No' ? 'Nej' : data.villDuHaBortforsling || 'Nej'}</td>
        </tr>
      </table>

      <div class="section-header">🏠 Flytta från</div>
      <table>
        <tr>
          <th>Adress</th>
          <td>${data.flyttaFran?.address || ''}</td>
        </tr>
        <tr>
          <th>Gatunummer</th>
          <td>${data.flyttaFran?.gatunummer || ''}</td>
        </tr>
        <tr>
          <th>Postnummer</th>
          <td>${data.flyttaFran?.postnummer || ''}</td>
        </tr>
        ${data.kontaktTyp !== 'Företag' ? `
        <tr>
          <th>Bostadstyp</th>
          <td>${data.flyttaFran?.bostadstyp || ''}</td>
        </tr>
        ` : ''}
        <tr>
          <th>Kvadratmeter</th>
          <td>${data.flyttaFran?.kvadrat || ''}</td>
        </tr>
        <tr>
          <th>Våning</th>
          <td>${data.flyttaFran?.vaningNr || ''}</td>
        </tr>
        <tr>
          <th>Hiss</th>
          <td>${data.flyttaFran?.hasElevator === 'Yes' ? 'Ja' : data.flyttaFran?.hasElevator === 'No' ? 'Nej' : data.flyttaFran?.hasElevator || ''}</td>
        </tr>
        ${data.flyttaFran?.hasElevator === 'Ja' || data.flyttaFran?.hasElevator === 'Yes' ? `
        <tr>
          <th>Hisstorlek</th>
          <td>${data.flyttaFran?.elevatorSize || ''}</td>
        </tr>
        ` : ''}
        <tr>
          <th>Parkeringsavstånd</th>
          <td>${data.flyttaFran?.parkeringsAvstand || ''}</td>
        </tr>
        ${data.flyttaFran?.workplaceCount ? `
        <tr>
          <th>Arbetsplatser</th>
          <td>${data.flyttaFran.workplaceCount}</td>
        </tr>
        ` : ''}
        <tr>
          <th>Vind</th>
          <td>${data.flyttaFran?.hasAttic || ''}</td>
        </tr>
        ${data.flyttaFran?.hasAttic === 'Ja' || data.flyttaFran?.hasAttic === 'Yes' ? `
        <tr>
          <th>Vindens yta (kvm)</th>
          <td>${data.flyttaFran.atticArea || ''}</td>
        </tr>
        ` : ''}
        <tr>
          <th>Källarförråd</th>
          <td>${data.flyttaFran?.hasBasementStorage || ''}</td>
        </tr>
        ${data.flyttaFran?.hasBasementStorage === 'Ja' || data.flyttaFran?.hasBasementStorage === 'Yes' ? `
        <tr>
          <th>Källarförrådets yta (kvm)</th>
          <td>${data.flyttaFran.basementStorageArea || ''}</td>
        </tr>
        ` : ''}
        <tr>
          <th>Garage</th>
          <td>${data.flyttaFran?.hasGarage || ''}</td>
        </tr>
        ${data.flyttaFran?.hasGarage === 'Ja' || data.flyttaFran?.hasGarage === 'Yes' ? `
        <tr>
          <th>Garagets yta (kvm)</th>
          <td>${data.flyttaFran.garageArea || ''}</td>
        </tr>
        ` : ''}
        ${data.kontaktTyp === 'Företag' ? `
        <tr>
          <th>Lastkaj</th>
          <td>${data.flyttaFran?.hasLoadingDock || ''}</td>
        </tr>
        ` : ''}
      </table>

      <div class="section-header">🏡 Flytta till</div>
      <table>
        <tr>
          <th>Adress</th>
          <td>${data.flyttaTill?.address || ''}</td>
        </tr>
        <tr>
          <th>Gatunummer</th>
          <td>${data.flyttaTill?.gatunummer || ''}</td>
        </tr>
        <tr>
          <th>Postnummer</th>
          <td>${data.flyttaTill?.postnummer || ''}</td>
        </tr>
        ${data.kontaktTyp !== 'Företag' ? `
        <tr>
          <th>Bostadstyp</th>
          <td>${data.flyttaTill?.bostadstyp || ''}</td>
        </tr>
        ` : ''}
        <tr>
          <th>Kvadratmeter</th>
          <td>${data.flyttaTill?.kvadrat || ''}</td>
        </tr>
        <tr>
          <th>Våning</th>
          <td>${data.flyttaTill?.vaningNr || ''}</td>
        </tr>
        <tr>
          <th>Hiss</th>
          <td>${data.flyttaTill?.hasElevator === 'Yes' ? 'Ja' : data.flyttaTill?.hasElevator === 'No' ? 'Nej' : data.flyttaTill?.hasElevator || ''}</td>
        </tr>
        ${data.flyttaTill?.hasElevator === 'Ja' || data.flyttaTill?.hasElevator === 'Yes' ? `
        <tr>
          <th>Hisstorlek</th>
          <td>${data.flyttaTill?.elevatorSize || ''}</td>
        </tr>
        ` : ''}
        <tr>
          <th>Parkeringsavstånd</th>
          <td>${data.flyttaTill?.parkeringsAvstand || ''}</td>
        </tr>
        ${data.kontaktTyp === 'Företag' ? `
        <tr>
          <th>Lastkaj</th>
          <td>${data.flyttaTill?.hasLoadingDock || ''}</td>
        </tr>
        ` : ''}
      </table>

      <div class="section-header">📦 Föremål</div>
      <table>
        <tr>
          <th>Tunga föremål</th>
          <td>${data.tungaForemal === 'Yes' ? 'Ja' : data.tungaForemal === 'No' ? 'Nej' : data.tungaForemal || 'Nej'}</td>
        </tr>
        <tr>
          <th>Ömtåliga föremål</th>
          <td>${data.omtaligaForemal === 'Yes' ? 'Ja' : data.omtaligaForemal === 'No' ? 'Nej' : data.omtaligaForemal || 'Nej'}</td>
        </tr>
      </table>

      ${data.additionalInfo ? `
      <div class="section-header">💬 Övriga önskemål</div>
      <table>
        <tr>
          <td style="padding: 12px; background-color: #f9fafb; border-radius: 4px;">${data.additionalInfo}</td>
        </tr>
      </table>
      ` : ''}

      <div class="section-header">📞 Kontaktinformation</div>
      <table>
        <tr>
          <th>${data.kontaktTyp === 'Företag' ? 'Företagsnamn' : 'Namn'}</th>
          <td>${data.kontaktInfo?.namn || ''}</td>
        </tr>
        ${data.kontaktTyp === 'Företag' ? `
        <tr>
          <th>Kontaktperson</th>
          <td>${data.kontaktInfo?.contactPersonName || ''}</td>
        </tr>
        ` : ''}
        <tr>
          <th>E-post</th>
          <td>${data.kontaktInfo?.email || ''}</td>
        </tr>
        <tr>
          <th>Telefon</th>
          <td>${data.kontaktInfo?.telefon || ''}</td>
        </tr>
      </table>
    </div>
  </div>
</body>
</html>
    `;

    // Get Gmail client
    const gmail = await getGmailClient();

    // Create the email
    const raw = createEmail(
      'leads@flyttella.se',
      'leads@flyttella.se',
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
    await incrementMovingSubmission();
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