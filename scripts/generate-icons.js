import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = path.join(__dirname, '../src/assets/image/AutoFinance.png');
const out = path.join(__dirname, '../public');

if (!fs.existsSync(out)) fs.mkdirSync(out, { recursive: true });

const icons = [
  { name: 'pwa-192x192.png', size: 192 },
  { name: 'pwa-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'favicon-32x32.png', size: 32 },
];

for (const icon of icons) {
  await sharp(src)
    .resize(icon.size, icon.size, { fit: 'cover' })
    .png()
    .toFile(path.join(out, icon.name));
  console.log(`✓ Generated ${icon.name}`);
}

console.log('All icons generated successfully!');
