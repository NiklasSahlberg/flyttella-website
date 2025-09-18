import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { Storage } from '@google-cloud/storage';
import fs from 'fs';
import path from 'path';

// Function to calculate estimated value based on purchase price, year, receipt, condition, and damage level
function calculateEstimatedValue(
  purchasePrice: number,
  purchaseYear: number,
  wasNew: string,
  hasReceipt: string,
  damageLevel?: string
): { estimatedValue: number; breakdown: string[] } {
  let estimatedValue = purchasePrice;
  const breakdown: string[] = [];
  
  // Start with original purchase price
  breakdown.push(`Ursprungligt inköpspris: ${purchasePrice} SEK`);

  // Apply damage level reduction FIRST
  if (damageLevel) {
    if (damageLevel === 'lindrigt_skadad') {
      const reduction = estimatedValue * 0.75;
      estimatedValue -= reduction;
      breakdown.push(`Minskning för lindrigt skadad (75%): -${reduction.toFixed(0)} SEK`);
    } else if (damageLevel === 'delvis_skadad') {
      const reduction = estimatedValue * 0.65;
      estimatedValue -= reduction;
      breakdown.push(`Minskning för delvis skadad (65%): -${reduction.toFixed(0)} SEK`);
    }
    // For 'helt_forstord', no additional reduction is applied
  }

  // If item was not new, reduce by 20%
  if (wasNew.toLowerCase() === 'nej') {
    const reduction = estimatedValue * 0.3;
    estimatedValue -= reduction;
    breakdown.push(`Minskning för begagnat föremål (30%): -${reduction.toFixed(0)} SEK`);
  }
  
  // If no receipt, reduce by 20%
  if (hasReceipt.toLowerCase() === 'nej') {
    const reduction = estimatedValue * 0.2;
    estimatedValue -= reduction;
    breakdown.push(`Minskning för saknat kvitto (20%): -${reduction.toFixed(0)} SEK`);
  }
  
  // Calculate years passed and reduce by 10% per year
  const currentYear = new Date().getFullYear();
  const yearsPassed = currentYear - purchaseYear;
  
  if (yearsPassed > 0) {
    const yearlyReduction = estimatedValue * 0.15;
    const totalYearlyReduction = yearlyReduction * yearsPassed;
    estimatedValue -= totalYearlyReduction;
    breakdown.push(`Värdeminskning för ${yearsPassed} år (15% per år): -${totalYearlyReduction.toFixed(0)} SEK`);
  }
  
  breakdown.push(`**Beräknat värde: ${Math.max(0, estimatedValue).toFixed(0)} SEK**`);
  
  return {
    estimatedValue: Math.max(0, estimatedValue),
    breakdown
  };
}

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

async function createEmailWithAttachments(to: string, from: string, subject: string, messageText: string, files: { [key: string]: File }) {
  const boundary = `boundary_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  const emailContent = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/html; charset=utf-8',
    '',
    messageText
  ];

  // Add file attachments
  for (const [filename, file] of Object.entries(files)) {
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const base64File = fileBuffer.toString('base64');
    
    emailContent.push(
      '',
      `--${boundary}`,
      `Content-Type: ${file.type}; name="${file.name}"`,
      'Content-Transfer-Encoding: base64',
      `Content-Disposition: attachment; filename="${file.name}"`,
      '',
      base64File
    );
  }

  emailContent.push(`--${boundary}--`);

  const email = emailContent.join('\r\n');
  const base64Email = Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  
  return base64Email;
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
    // Parse multipart form data
    const formData = await req.formData();
    const data: any = {};
    const files: { [key: string]: File } = {};
    
    // Extract form data and files
    const entries = Array.from(formData.entries());
    for (const [key, value] of entries) {
      if (value instanceof File) {
        files[key] = value;
        data[key] = true; // Mark that file exists
      } else {
        data[key] = value;
      }
    }
    
    console.log('Received report data:', data);
    console.log('Received files:', Object.keys(files));

    // Determine the type of report and create appropriate email content
    let emailContent = '';
    let subject = '';

    if (data.type === 'skada' && data.damageType === 'skada') {
      // Damage report
      subject = 'Skadeanmälan - Flyttella';
      
      // Calculate estimated value
      const purchasePrice = parseFloat(data.purchasePrice) || 0;
      const purchaseYear = parseInt(data.purchaseYear) || new Date().getFullYear();
      const { estimatedValue, breakdown } = calculateEstimatedValue(
        purchasePrice,
        purchaseYear,
        data.wasNew || 'ja',
        data.hasReceipt || 'ja',
        data.damageLevel
      );
      
      emailContent = `
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
  .value-breakdown {
    background-color: #fff3cd;
    border: 1px solid #ffeaa7;
    padding: 15px;
    margin: 20px 0;
    border-radius: 5px;
  }
  .value-breakdown h4 {
    margin-top: 0;
    color: #856404;
  }
  .value-breakdown ul {
    margin: 10px 0;
    padding-left: 20px;
  }
  .value-breakdown li {
    margin: 5px 0;
  }
  .final-value {
    font-weight: bold;
    font-size: 1.1em;
    color: #28a745;
  }
</style>
</head>
<body>
  <h2>Skadeanmälan - Flyttella</h2>

  <div class="section-header">Anmälningsinformation</div>
  <table>
    <tr>
      <th>Offertnummer</th>
      <td>${data.order || ''}</td>
    </tr>
    <tr>
      <th>Händelsedatum</th>
      <td>${data.eventDate || ''}</td>
    </tr>
  </table>

  <div class="section-header">Föremålsinformation</div>
  <table>
    <tr>
      <th>Typ av föremål</th>
      <td>${data.itemType || ''}</td>
    </tr>
    <tr>
      <th>Märke och modell</th>
      <td>${data.brandModel || ''}</td>
    </tr>
    <tr>
      <th>Var föremålet nytt vid inköp?</th>
      <td>${data.wasNew || ''}</td>
    </tr>
    <tr>
      <th>Inköpspris</th>
      <td>${data.purchasePrice || ''} SEK</td>
    </tr>
    <tr>
      <th>Inköpsår</th>
      <td>${data.purchaseYear || ''}</td>
    </tr>
  </table>

  <div class="section-header">Värdeberäkning</div>
  <div class="value-breakdown">
    <h4>Beräknat värde baserat på:</h4>
    <ul>
      ${breakdown.map(item => `<li>${item}</li>`).join('')}
    </ul>
    <p class="final-value">Slutligt beräknat värde: ${estimatedValue.toFixed(0)} SEK</p>
  </div>

  <div class="section-header">Skadeinformation</div>
  <table>
    <tr>
      <th>Beskrivning av skadan</th>
      <td>${data.description || ''}</td>
    </tr>
    <tr>
      <th>Vem packade föremålet?</th>
      <td>${data.packedBy || ''}</td>
    </tr>
  </table>

  <div class="section-header">Reparation</div>
  <table>
    <tr>
      <th>Har du varit i kontakt med reparatör?</th>
      <td>${data.contactedRepair || ''}</td>
    </tr>
    ${data.contactedRepair === 'ja' ? `
    <tr>
      <th>Reparationspris</th>
      <td>${data.repairPrice || ''} SEK</td>
    </tr>
    ` : ''}
  </table>

  <div class="section-header">Kvitto</div>
  <table>
    <tr>
      <th>Har du kvitto från butiken?</th>
      <td>${data.hasReceipt || ''}</td>
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
  </table>

  <div class="section-header">Bifogade filer</div>
  <table>
    <tr>
      <th>Bilder på skadat föremål</th>
      <td>${files.damagedItemImage ? `Bifogad (${files.damagedItemImage.name})` : 'Ej bifogad'}</td>
    </tr>
    <tr>
      <th>Bild på framsidan</th>
      <td>${files.frontImage ? `Bifogad (${files.frontImage.name})` : 'Ej bifogad'}</td>
    </tr>
    <tr>
      <th>Bild från vänster sida</th>
      <td>${files.leftImage ? `Bifogad (${files.leftImage.name})` : 'Ej bifogad'}</td>
    </tr>
    <tr>
      <th>Bild från höger sida</th>
      <td>${files.rightImage ? `Bifogad (${files.rightImage.name})` : 'Ej bifogad'}</td>
    </tr>
    ${files.receiptFile ? `
    <tr>
      <th>Kvitto</th>
      <td>Bifogad (${files.receiptFile.name})</td>
    </tr>
    ` : ''}
  </table>
</body>
</html>
      `;
    } else if (data.type === 'skada' && data.damageType === 'forlust') {
      // Loss report
      subject = 'Förlustanmälan - Flyttella';
      
      // Calculate estimated value
      const purchasePrice = parseFloat(data.purchasePrice) || 0;
      const purchaseYear = parseInt(data.purchaseYear) || new Date().getFullYear();
      const { estimatedValue, breakdown } = calculateEstimatedValue(
        purchasePrice,
        purchaseYear,
        data.wasNew || 'ja',
        data.hasReceipt || 'ja',
        data.damageLevel
      );
      
      emailContent = `
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
  .value-breakdown {
    background-color: #fff3cd;
    border: 1px solid #ffeaa7;
    padding: 15px;
    margin: 20px 0;
    border-radius: 5px;
  }
  .value-breakdown h4 {
    margin-top: 0;
    color: #856404;
  }
  .value-breakdown ul {
    margin: 10px 0;
    padding-left: 20px;
  }
  .value-breakdown li {
    margin: 5px 0;
  }
  .final-value {
    font-weight: bold;
    font-size: 1.1em;
    color: #28a745;
  }
</style>
</head>
<body>
  <h2>Förlustanmälan - Flyttella</h2>

  <div class="section-header">Anmälningsinformation</div>
  <table>
    <tr>
      <th>Offertnummer</th>
      <td>${data.order || ''}</td>
    </tr>
    <tr>
      <th>Händelsedatum</th>
      <td>${data.eventDate || ''}</td>
    </tr>
  </table>

  <div class="section-header">Föremålsinformation</div>
  <table>
    <tr>
      <th>Typ av föremål</th>
      <td>${data.itemType || ''}</td>
    </tr>
    <tr>
      <th>Märke och modell</th>
      <td>${data.brandModel || ''}</td>
    </tr>
    <tr>
      <th>Var föremålet nytt vid inköp?</th>
      <td>${data.wasNew || ''}</td>
    </tr>
    <tr>
      <th>Inköpspris</th>
      <td>${data.purchasePrice || ''} SEK</td>
    </tr>
    <tr>
      <th>Inköpsår</th>
      <td>${data.purchaseYear || ''}</td>
    </tr>
  </table>

  <div class="section-header">Värdeberäkning</div>
  <div class="value-breakdown">
    <h4>Beräknat värde baserat på:</h4>
    <ul>
      ${breakdown.map(item => `<li>${item}</li>`).join('')}
    </ul>
    <p class="final-value">Slutligt beräknat värde: ${estimatedValue.toFixed(0)} SEK</p>
  </div>

  <div class="section-header">Förlustinformation</div>
  <table>
    <tr>
      <th>Beskriv hur föremålet har försvunnit</th>
      <td>${data.description || ''}</td>
    </tr>
  </table>

  <div class="section-header">Kvitto</div>
  <table>
    <tr>
      <th>Har du kvitto från butiken?</th>
      <td>${data.hasReceipt || ''}</td>
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
  </table>

  <div class="section-header">Bifogade filer</div>
  <table>
    ${files.receiptFile ? `
    <tr>
      <th>Kvitto</th>
      <td>Bifogad (${files.receiptFile.name})</td>
    </tr>
    ` : ''}
  </table>
</body>
</html>
      `;
    } else if (data.type === 'reklamation') {
      // Cleaning complaint report
      subject = 'Reklamationsstäd - Flyttella';
      emailContent = `
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
  <h2>Reklamationsstäd - Flyttella</h2>


  <table>
    <tr>
      <th>Offertnummer</th>
      <td>${data.order || ''}</td>
    </tr>
    <tr>
      <th>Datum för flyttstädningen</th>
      <td>${data.cleaningDate || ''}</td>
    </tr>
  </table>

  <div class="section-header">Reklamationsinformation</div>
  <table>
    <tr>
      <th>Beskrivning av bristfälligheter</th>
      <td>${data.description || ''}</td>
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
  </table>

  <div class="section-header">Bifogade filer</div>
  <table>
    <tr>
      <th>Bilder på bristmoment</th>
      <td>${Object.keys(files).filter(key => key.startsWith('files')).length > 0 ? 
        `${Object.keys(files).filter(key => key.startsWith('files')).length} bilder bifogade: ${Object.keys(files).filter(key => key.startsWith('files')).map(key => files[key].name).join(', ')}` : 
        'Inga bilder bifogade'}</td>
    </tr>
  </table>
</body>
</html>
      `;
    }

    console.log('Creating Gmail client...');
    // Get Gmail client
    const gmail = await getGmailClient();
    console.log('Gmail client created successfully');

    console.log('Creating email with subject:', subject);
    // Create the email with attachments if files exist
    let raw: string;
    if (Object.keys(files).length > 0) {
      console.log('Creating email with attachments:', Object.keys(files));
      raw = await createEmailWithAttachments(
        'niklassahlbergdeveloper@gmail.com',
        'niklassahlbergdeveloper@gmail.com',
        subject,
        emailContent,
        files
      );
    } else {
      console.log('Creating email without attachments');
      raw = createEmail(
        'niklassahlbergdeveloper@gmail.com',
        'niklassahlbergdeveloper@gmail.com',
        subject,
        emailContent
      );
    }
    console.log('Email created successfully');

    console.log('Sending email...');
    // Send the email
    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: raw
      }
    });

    console.log('Report email sent successfully:', res.data.id);
    return NextResponse.json({ success: true, messageId: res.data.id });
  } catch (error) {
    console.error('Error sending report email:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined
    });
    
    // Log failed email to Cloud Storage
    try {
      const failedEmail = `${new Date().toISOString()}: ${error instanceof Error ? error.message : String(error)}\n`;
      const file = bucket.file(FAILED_EMAILS_FILE);
      await file.save(failedEmail, { resumable: false });
    } catch (storageError) {
      console.error('Error logging to storage:', storageError);
    }

    return NextResponse.json(
      { error: 'Failed to send report email', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 