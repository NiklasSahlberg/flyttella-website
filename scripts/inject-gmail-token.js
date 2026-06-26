const fs = require('fs');
const path = require('path');

const tokenPath = path.join(__dirname, '..', 'token.json');
const bundledTokenPath = path.join(
  __dirname,
  '..',
  'src',
  'lib',
  'gmail-token.generated.json'
);

function writeBundledToken(tokenJson) {
  const parsed = JSON.parse(tokenJson);
  if (!parsed.refresh_token) {
    throw new Error('missing refresh_token');
  }

  fs.writeFileSync(bundledTokenPath, `${JSON.stringify(parsed)}\n`);
  console.log('[gmail] gmail-token.generated.json written for deployment');
}

function ensurePlaceholder() {
  if (!fs.existsSync(bundledTokenPath)) {
    fs.writeFileSync(bundledTokenPath, '{}\n');
  }
}

function main() {
  ensurePlaceholder();

  const b64 = process.env.GMAIL_TOKEN_BASE64?.trim();
  const raw = process.env.GMAIL_TOKEN?.trim();

  let tokenJson;
  if (b64) {
    tokenJson = Buffer.from(b64, 'base64').toString('utf8');
  } else if (raw) {
    tokenJson = raw;
  } else if (fs.existsSync(tokenPath)) {
    tokenJson = fs.readFileSync(tokenPath, 'utf8');
    console.log('[gmail] using local token.json for build bundle');
  } else {
    if (process.env.VERCEL === '1') {
      console.error(
        '[gmail] ERROR: Set GMAIL_TOKEN_BASE64 or GMAIL_TOKEN for Production in Vercel.'
      );
      process.exit(1);
    }

    console.log('[gmail] No Gmail token found at build time, keeping placeholder bundle');
    fs.writeFileSync(bundledTokenPath, '{}\n');
    return;
  }

  try {
    writeBundledToken(tokenJson);
  } catch (error) {
    console.error('[gmail] Failed to prepare bundled Gmail token:', error.message);
    process.exit(1);
  }
}

main();
