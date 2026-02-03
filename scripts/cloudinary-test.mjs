import fs from 'fs';
import path from 'path';
import cloudinary from 'cloudinary';

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const text = fs.readFileSync(filePath, 'utf8');
  for (const rawLine of text.split(/\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const idx = line.indexOf('=');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    process.env[key] = val;
  }
}

const envPaths = [path.resolve(process.cwd(), '.env.local'), path.resolve(process.cwd(), '.env')];
for (const p of envPaths) loadEnvFile(p);

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error('Missing Cloudinary credentials. Please add them to .env.local (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET).');
  process.exit(2);
}

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

console.log('Running Cloudinary test: listing up to 1 resource...');

cloudinary.v2.api.resources({ max_results: 1 }, (err, result) => {
  if (err) {
    console.error('Cloudinary test failed:', err.message || err);
    process.exit(1);
  }
  console.log('Cloudinary test succeeded.');
  console.log('Resources returned:', (result && result.resources && result.resources.length) || 0);
  if (result && result.resources && result.resources[0]) {
    console.log('First resource URL:', result.resources[0].secure_url || result.resources[0].url);
  }
  process.exit(0);
});
