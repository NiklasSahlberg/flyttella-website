import { NextResponse } from 'next/server';
import { google } from 'googleapis';
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

async function createEmail(to: string, from: string, subject: string, messageText: string, attachments: File[] = []) {
  // Encode the subject line to handle Swedish characters like å, ä, ö
  const encodedSubject = `=?UTF-8?B?${Buffer.from(subject).toString('base64')}?=`;
  
  if (attachments.length === 0) {
    // Simple email without attachments
    const emailLines = [
      `From: ${from}`,
      `To: ${to}`,
      `Subject: ${encodedSubject}`,
      'MIME-Version: 1.0',
      'Content-Type: text/html; charset=utf-8',
      '',
      messageText
    ];

    const email = emailLines.join('\r\n').trim();
    const base64Email = Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    
    return base64Email;
  } else {
    // Email with attachments - use multipart
    const boundary = `boundary_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    let emailContent = [
      `From: ${from}`,
      `To: ${to}`,
      `Subject: ${encodedSubject}`,
      'MIME-Version: 1.0',
      `Content-Type: multipart/mixed; boundary="${boundary}"`,
      '',
      `--${boundary}`,
      'Content-Type: text/html; charset=utf-8',
      '',
      messageText
    ];

    // Add attachments
    for (const attachment of attachments) {
      if (attachment.size > 0) {
        const fileBuffer = Buffer.from(await attachment.arrayBuffer());
        const base64File = fileBuffer.toString('base64');
        
        emailContent.push(
          `--${boundary}`,
          `Content-Type: ${attachment.type || 'application/octet-stream'}`,
          `Content-Disposition: attachment; filename="${attachment.name}"`,
          'Content-Transfer-Encoding: base64',
          '',
          base64File
        );
      }
    }

    emailContent.push(`--${boundary}--`);

    const email = emailContent.join('\r\n');
    const base64Email = Buffer.from(email).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    
    return base64Email;
  }
}

// Function to translate callback time values to Swedish
function translateCallbackTime(timeValue: string): string {
  const timeTranslations: { [key: string]: string } = {
    'morning': 'Förmiddag (08:00 - 12:00)',
    'afternoon': 'Eftermiddag (12:00 - 15:00)',
    'evening': 'Sen eftermiddag (15:00 - 18:00)'
  };
  
  return timeTranslations[timeValue] || timeValue;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    console.log('Received contact form data:', Object.fromEntries(formData.entries()));
    
    // Extract form data
    const data = {
      name: formData.get('name') as string || formData.get('callback-name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string || formData.get('callback-phone') as string,
      service: formData.get('service') as string || formData.get('callback-service') as string,
      message: formData.get('message') as string || formData.get('callback-message') as string,
      formType: formData.get('formType') as string,
      callbackTime: formData.get('callbackTime') as string || '',
      attachments: formData.getAll('attachments') as File[]
    };

    // Format the email content with HTML table
    const emailContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #0F172A 0%, #10B981 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background-color: #e9ecef; font-weight: bold; }
    .message { background: white; padding: 15px; border-radius: 5px; margin-top: 15px; border-left: 4px solid #10B981; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Ny kontakt från Flyttella.se</h2>
    </div>
    <div class="content">
      <table>
        <tr>
          <th>Namn</th>
          <td>${data.name || ''}</td>
        </tr>
        ${data.formType === 'message' ? `
        <tr>
          <th>E-post</th>
          <td>${data.email || ''}</td>
        </tr>
        ` : ''}
        <tr>
          <th>Telefon</th>
          <td>${data.phone || 'Inte angivet'}</td>
        </tr>
        <tr>
          <th>Tjänst</th>
          <td>${data.service || ''}</td>
        </tr>
        ${data.message ? `
        <tr>
          <th>Meddelande</th>
          <td>${data.message}</td>
        </tr>
        ` : ''}
        <tr>
          <th>Formulärtyp</th>
          <td>${data.formType === 'callback' ? 'Uppringning' : 'Meddelande'}</td>
        </tr>
        ${data.formType === 'callback' ? `
        <tr>
          <th>Önskad tid för uppringning</th>
          <td>${translateCallbackTime(data.callbackTime) || ''}</td>
        </tr>
        ` : ''}
        <tr>
          <th>Datum</th>
          <td>${new Date().toLocaleString('sv-SE')}</td>
        </tr>
        ${data.attachments && data.attachments.length > 0 ? `
        <tr>
          <th>Bilagor</th>
          <td>${data.attachments.length} fil(er) bifogade: ${data.attachments.map(file => file.name).join(', ')}</td>
        </tr>
        ` : ''}
      </table>
      
      ${data.message ? `
      <div class="message">
        <h4>Meddelande:</h4>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      </div>
      ` : ''}
    </div>
  </div>
</body>
</html>`;

    // Get Gmail client
    console.log('Getting Gmail client...');
    const gmail = await getGmailClient();
    console.log('Gmail client obtained successfully');

    // Create the email
    console.log('Creating email...');
    const raw = await createEmail(
      'niklassahlbergdeveloper@gmail.com',
      'niklassahlbergdeveloper@gmail.com',
      'Ny kontakt från Flyttella.se',
      emailContent,
      data.attachments
    );
    console.log('Email created successfully');

    // Send the email
    console.log('Sending email...');
    const result = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: raw
      }
    });

    console.log('Email sent successfully:', result.data);

    return NextResponse.json({ 
      success: true, 
      messageId: result.data.id 
    });

  } catch (error: any) {
    console.error('Error sending email:', error);
    
    return NextResponse.json(
      { error: 'Failed to send email', details: error.message },
      { status: 500 }
    );
  }
}
