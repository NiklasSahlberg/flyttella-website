const fs = require('fs');
const path = require('path');

// Read the token.json file
const tokenPath = path.join(__dirname, '..', 'token.json');
const logoPath = path.join(__dirname, '..', 'public', 'flyttella-logo.png');

console.log('🔧 Preparing environment variables for Vercel deployment...\n');

// Read and display Gmail token
if (fs.existsSync(tokenPath)) {
  const token = JSON.parse(fs.readFileSync(tokenPath, 'utf-8'));
  console.log('📧 GMAIL_TOKEN environment variable:');
  console.log('Copy this value to your Vercel environment variables:');
  console.log('─'.repeat(80));
  console.log(JSON.stringify(token));
  console.log('─'.repeat(80));
} else {
  console.log('❌ token.json not found. Please run the generate-token script first.');
}

console.log('\n');

// Read and convert logo to base64
if (fs.existsSync(logoPath)) {
  const logoBuffer = fs.readFileSync(logoPath);
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;
  console.log('🖼️  FLYTTELLA_LOGO_BASE64 environment variable:');
  console.log('Copy this value to your Vercel environment variables:');
  console.log('─'.repeat(80));
  console.log(logoBase64);
  console.log('─'.repeat(80));
} else {
  console.log('❌ flyttella-logo.png not found in public folder.');
}

console.log('\n📋 Instructions:');
console.log('1. Go to your Vercel project dashboard');
console.log('2. Navigate to Settings > Environment Variables');
console.log('3. Add the following environment variables:');
console.log('   - GMAIL_TOKEN: (paste the JSON token above)');
console.log('   - FLYTTELLA_LOGO_BASE64: (paste the base64 logo above)');
console.log('4. Redeploy your project');
console.log('\n✅ Environment variables prepared!');
