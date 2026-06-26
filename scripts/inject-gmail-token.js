const fs = require('fs');
const path = require('path');

const tokenPath = path.join(__dirname, '..', 'token.json');

function main() {
  const b64 = process.env.GMAIL_TOKEN_BASE64?.trim();
  const raw = process.env.GMAIL_TOKEN?.trim();

  let tokenJson;
  if (b64) {
    tokenJson = Buffer.from(b64, 'base64').toString('utf8');
  } else if (raw) {
    tokenJson = raw;
  } else if (fs.existsSync(tokenPath)) {
    console.log('[gmail] token.json already exists, skipping inject');
    return;
  } else {
    console.log('[gmail] No Gmail token env var found at build time, skipping inject');
    return;
  }

  try {
    const parsed = JSON.parse(tokenJson);
    if (!parsed.refresh_token) {
      throw new Error('missing refresh_token');
    }
    fs.writeFileSync(tokenPath, tokenJson);
    console.log('[gmail] token.json written for deployment');
  } catch (error) {
    console.error('[gmail] Failed to prepare token.json:', error.message);
    process.exit(1);
  }
}

main();
