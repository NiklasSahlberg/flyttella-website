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

async function getGmailClient() {
  const oauth2Client = new google.auth.OAuth2(
    CLIENT_SECRETS.installed.client_id,
    CLIENT_SECRETS.installed.client_secret,
    CLIENT_SECRETS.installed.redirect_uris[0]
  );

  // Hardcoded token for production use
  const token = {
    "access_token": "ya29.a0AQQ_BDQhbhe9MN1j5QWfzJ2c6-rIKrRBvSg14u5QorvsOekhvJY_PZ0vz76SFjJL7UnPzhlJYO-uKEX5rB0cO2L_sXe9zac0DRzjhCNzfGGK4hhmp4e-ou8mN8V3DzPAbjB4fXlZQW4vCS85rh-iyxV3LuxH9ENnVXoBLBslMBa-lj41Y9ioUMvxiBPdl9h9wACEOuBfPAaCgYKAdoSARISFQHGX2Mizu5GZBaOBaZa-XqjJdBh_w0209",
    "refresh_token": "1//0cyImmJzOOjkcCgYIARAAGAwSNgF-L9Ir5HhyLUKncIG-oO6rOPmPekq5dVJM5PtjmC42gH3jUUu6T8YEhayurysrrPMkMNM2sQ",
    "scope": "https://www.googleapis.com/auth/gmail.send",
    "token_type": "Bearer",
    "expiry_date": 1758216122138
  };

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
  // Encode subject with proper MIME encoding for Swedish characters
  const subjectBytes = Buffer.from(subject, 'utf8');
  const encodedSubject = subjectBytes.toString('base64');
  
  const emailLines = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: =?UTF-8?B?${encodedSubject}?=`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=utf-8',
    '',
    messageText
  ];

  const email = emailLines.join('\r\n').trim();
  const base64Email = Buffer.from(email, 'utf8').toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  
  return base64Email;
}

function formatFlexibleDate(value: string | undefined): string {
  if (!value || value === 'Nej') {
    return 'Nej';
  }
  return value;
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
    const isFlexible = data.flexibleMovingDate && data.flexibleMovingDate !== 'Nej';
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
               <h2 style="margin: 0; font-size: 24px;">Ny Lead - ${data.cleaningType || 'Städning'}</h2>
             </div>
    <div class="content">

      <div class="section-header">📅 Städdatum</div>
      <table>
        <tr>
          <th>${data.cleaningType === 'Fönsterputs' || data.cleaningType === 'Window cleaning' ? 'Fönsterputsning' : 'Städning'}</th>
          <td>${data.movingDate || ''}</td>
        </tr>
        <tr>
          <th>Flexibelt datum</th>
          <td>${isFlexible ? 'Ja' : 'Nej'}</td>
        </tr>
        ${isFlexible ? `
        <tr>
          <th>Flexibilitet</th>
          <td>${formatFlexibleDate(data.flexibleMovingDate)}</td>
        </tr>
        ` : ''}
      </table>

      <div class="section-header">🏠 Bostadsinformation</div>
  <table>
    <tr>
      <th>${data.customerType === 'foretag' ? 'Bostadstyp' : 'Vilken typ av bostad ska städas?'}</th>
      <td>${data.typeOfHome || ''}</td>
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
      <td>${data.areaSize || ''} kvm</td>
    </tr>
  </table>

      <div class="section-header">🔧 Tilläggstjänster</div>
  <table>
    ${data.cleaningType === 'Flyttstädning' || data.cleaningType === 'Moving cleaning' || data.cleaningType === 'Visningsstädning' || data.cleaningType === 'Viewing cleaning' ? `
    <tr>
      <th>Balkong, max 5 kvm</th>
      <td>${data.hasBalconyCleaning ? "Ja" : "Nej"}</td>
    </tr>
    <tr>
      <th>Källare/Vindsförråd, max 5 kvm</th>
      <td>${data.hasStorageCleaning ? "Ja" : "Nej"}</td>
    </tr>
    <tr>
      <th>Garage, max 15 kvm</th>
      <td>${data.hasGarageCleaning ? "Ja" : "Nej"}</td>
    </tr>
    <tr>
      <th>Inglasad balkong, max 10 kvm</th>
      <td>${data.hasGlazedBalconyCleaning ? "Ja" : "Nej"}</td>
    </tr>
    <tr>
      <th>Inglasad altan, max 10 kvm</th>
      <td>${data.hasGlazedPatioCleaning ? "Ja" : "Nej"}</td>
    </tr>
    <tr>
      <th>Avfrostning av frys</th>
      <td>${data.hasFreezerDefrosting ? "Ja" : "Nej"}</td>
    </tr>
    <tr>
      <th>Demontering/rengöring av vattenlås</th>
      <td>${data.waterTrapCleaningCount > 0 ? data.waterTrapCleaningCount : "Nej"}</td>
    </tr>
    <tr>
      <th>Rengöring av persienner</th>
      <td>${data.blindsCleaningCount > 0 ? data.blindsCleaningCount : "Nej"}</td>
    </tr>
    ` : ''}
    ${data.cleaningType === 'Hemstädning' || data.cleaningType === 'Home cleaning' ? `
    ${data.customerType === 'foretag' ? `
    <tr>
      <th>Balkong, max 5 kvm</th>
      <td>${data.hasBalconyCleaning ? "Ja" : "Nej"}</td>
    </tr>
    <tr>
      <th>Källare/Vindsförråd, max 5 kvm</th>
      <td>${data.hasStorageCleaning ? "Ja" : "Nej"}</td>
    </tr>
    <tr>
      <th>Garage, max 15 kvm</th>
      <td>${data.hasGarageCleaning ? "Ja" : "Nej"}</td>
    </tr>
    <tr>
      <th>Inglasad balkong, max 10 kvm</th>
      <td>${data.hasGlazedBalconyCleaning ? "Ja" : "Nej"}</td>
    </tr>
    <tr>
      <th>Inglasad altan, max 10 kvm</th>
      <td>${data.hasGlazedPatioCleaning ? "Ja" : "Nej"}</td>
    </tr>
    <tr>
      <th>Avfrostning av frys</th>
      <td>${data.hasFreezerDefrosting ? "Ja" : "Nej"}</td>
    </tr>
    <tr>
      <th>Demontering/rengöring av vattenlås</th>
      <td>${data.waterTrapCleaningCount > 0 ? data.waterTrapCleaningCount : "Nej"}</td>
    </tr>
    ` : `
    <tr>
      <th>Önskar fönsterputsning</th>
      <td>${data.windowCleaning ? "Ja" : "Nej"}</td>
    </tr>
    <tr>
      <th>Önskar bäddning</th>
      <td>${data.bedMaking ? "Ja" : "Nej"}</td>
    </tr>
    <tr>
      <th>Önskar diskning</th>
      <td>${data.dishWashing ? "Ja" : "Nej"}</td>
    </tr>
    <tr>
      <th>Önskar strykning</th>
      <td>${data.ironing ? "Ja" : "Nej"}</td>
    </tr>
    `}
    ` : ''}
    ${data.cleaningType === 'Byggstädning' || data.cleaningType === 'Construction cleaning' ? `
    <tr>
      <th>Vilken sorts arbete har du gjort?</th>
      <td>${data.constructionWorkType ? data.constructionWorkType.join(', ') : ''}</td>
    </tr>
    <tr>
      <th>Släng skräp och avfall</th>
      <td>${data.constructionCleaningServices && data.constructionCleaningServices.includes('Släng skräp och avfall') ? "Ja" : "Nej"}</td>
    </tr>
    ` : ''}
    ${data.cleaningType === 'Dödsbostädning' || data.cleaningType === 'Estate cleaning' ? `
    <tr>
      <th>Önskar tömning/bortforsling och flytt av möbler</th>
      <td>${data.estateClearing ? "Ja" : "Nej"}</td>
    </tr>
    ` : ''}
    ${data.cleaningType === 'Fönsterputs' || data.cleaningType === 'Window cleaning' ? `
    <tr>
      <th>Behöver vi ta med oss en stege för att nå alla fönster?</th>
      <td>${data.needsLadder === 'Yes' ? 'Ja' : data.needsLadder === 'No' ? 'Nej' : data.needsLadder === 'Dont know' ? 'Vet ej' : data.needsLadder || ''}</td>
    </tr>
    <tr>
      <th>Vilken typ av fönster har du?</th>
      <td>${data.windowTypes ? data.windowTypes.join(', ') : ''}</td>
    </tr>
    <tr>
      <th>Fönster med spröjs</th>
      <td>${data.windowsWithMullions || 0}</td>
    </tr>
    <tr>
      <th>Fönster utan spröjs</th>
      <td>${data.windowsWithoutMullions || 0}</td>
    </tr>
    <tr>
      <th>Överkantshängda fönster</th>
      <td>${data.topHungWindows || 0}</td>
    </tr>
    ` : ''}
    ${data.cleaningType !== 'Flyttstädning' && data.cleaningType !== 'Moving cleaning' && data.cleaningType !== 'Visningsstädning' && data.cleaningType !== 'Viewing cleaning' && data.cleaningType !== 'Hemstädning' && data.cleaningType !== 'Home cleaning' && data.cleaningType !== 'Byggstädning' && data.cleaningType !== 'Construction cleaning' && data.cleaningType !== 'Dödsbostädning' && data.cleaningType !== 'Estate cleaning' && data.cleaningType !== 'Fönsterputs' && data.cleaningType !== 'Window cleaning' ? `
    ${data.customerType === 'foretag' ? `
    <tr>
      <th>Balkong, max 5 kvm</th>
      <td>${data.hasBalconyCleaning ? "Ja" : "Nej"}</td>
    </tr>
    <tr>
      <th>Källare/Vindsförråd, max 5 kvm</th>
      <td>${data.hasStorageCleaning ? "Ja" : "Nej"}</td>
    </tr>
    <tr>
      <th>Garage, max 15 kvm</th>
      <td>${data.hasGarageCleaning ? "Ja" : "Nej"}</td>
    </tr>
    <tr>
      <th>Inglasad balkong, max 10 kvm</th>
      <td>${data.hasGlazedBalconyCleaning ? "Ja" : "Nej"}</td>
    </tr>
    <tr>
      <th>Inglasad altan, max 10 kvm</th>
      <td>${data.hasGlazedPatioCleaning ? "Ja" : "Nej"}</td>
    </tr>
    <tr>
      <th>Avfrostning av frys</th>
      <td>${data.hasFreezerDefrosting ? "Ja" : "Nej"}</td>
    </tr>
    <tr>
      <th>Demontering/rengöring av vattenlås</th>
      <td>${data.waterTrapCleaningCount > 0 ? data.waterTrapCleaningCount : "Nej"}</td>
    </tr>
    ` : `
    <tr>
      <th>Önskar bäddning</th>
      <td>${data.bedMaking ? "Ja" : "Nej"}</td>
    </tr>
    <tr>
      <th>Önskar diskning</th>
      <td>${data.dishWashing ? "Ja" : "Nej"}</td>
    </tr>
    <tr>
      <th>Önskar strykning</th>
      <td>${data.ironing ? "Ja" : "Nej"}</td>
    </tr>
    `}
    ` : ''}
  </table>

      <div class="section-header">👤 Kontakttyp</div>
      <table>
        <tr>
          <th>Typ</th>
          <td>${data.customerType === 'foretag' ? 'Företag' : 'Privat'}</td>
        </tr>
      </table>

      <div class="section-header">📞 Kontaktinformation</div>
      <table>
        <tr>
          <th>${data.customerType === 'foretag' ? 'Företagsnamn' : 'Namn'}</th>
          <td>${data.name || ''}</td>
        </tr>
        ${data.customerType === 'foretag' ? `
        <tr>
          <th>Kontaktperson</th>
          <td>${data.contactPersonName || ''}</td>
        </tr>
        ` : ''}
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
      <div class="section-header">💬 Kommentarer</div>
      <table>
        <tr>
          <td style="padding: 12px; background-color: #f9fafb; border-radius: 4px;">${data.comments}</td>
        </tr>
      </table>
      ` : ''}
      ${data.additionalInfo ? `
      <div class="section-header">💬 Övrig information</div>
      <table>
        <tr>
          <td style="padding: 12px; background-color: #f9fafb; border-radius: 4px;">${data.additionalInfo}</td>
        </tr>
      </table>
      ` : ''}
    </div>
  </div>
</body>
</html>
    `;

    // Get Gmail client
    const gmail = await getGmailClient();

    // Create the email
    const raw = createEmail(
      'niklassahlbergdeveloper@gmail.com',
      'niklassahlbergdeveloper@gmail.com',
      `Ny lead - ${data.cleaningType || 'Städning'}`,
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