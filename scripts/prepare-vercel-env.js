const fs = require('fs');
const path = require('path');

// Read the token.json file
const tokenPath = path.join(__dirname, '..', 'token.json');
const logoPath = path.join(__dirname, '..', 'public', 'flyttella-logo.png');

console.log('🔧 Preparing environment variables for Vercel deployment...\n');

// Read and display Gmail token
if (fs.existsSync(tokenPath)) {
  const tokenRaw = fs.readFileSync(tokenPath, 'utf-8');
  const token = JSON.parse(tokenRaw);
  const tokenBase64 = Buffer.from(tokenRaw.trim()).toString('base64');

  console.log('📧 GMAIL_TOKEN_BASE64 (recommended for Vercel):');
  console.log('Copy this value to your Vercel environment variables:');
  console.log('─'.repeat(80));
  console.log(tokenBase64);
  console.log('─'.repeat(80));

  console.log('\n📧 GMAIL_TOKEN (alternative, full JSON on one line):');
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
console.log('   - GMAIL_TOKEN_BASE64: (recommended, paste the base64 token above)');
console.log('   - GMAIL_TOKEN: (alternative, paste the JSON token above)');
console.log('   - FLYTTELLA_LOGO_BASE64: (paste the base64 logo above)');
console.log('4. Enable for Production AND Preview');
console.log('5. Redeploy your project (required after changing env vars)');
console.log('\n💡 Local development:');
console.log('   - Either keep token.json in the project root, or');
console.log('   - Add GMAIL_TOKEN to .env.local with the same JSON value');
console.log('\n🔒 Security: token.json is gitignored. Remove it from git history if it was committed:');
console.log('   git rm --cached token.json');
console.log('\n✅ Environment variables prepared!');
