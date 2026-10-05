import fs from 'fs';
import path from 'path';
import https from 'https';

const imagesDir = path.join(process.cwd(), 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const imageUrls = {
  'kb_hero.jpg': 'C:\ABCD\images\kb_hero.jpg',
  'kb1.jpg': 'C:\ABCD\images\kb1.jpg',
  'kb2.jpg': 'C:\ABCD\images\kb2.jpg',
  'kb3.jpg': 'C:\ABCD\images\kb3.jpg',
  'kb4.jpg': 'C:\ABCD\images\kb4.jpg',
  'kb5.jpg': 'C:\ABCD\images\kb5.jpg',
  'kb6.jpg': 'C:\ABCD\images\kb6.jpg',
  'kb7.jpg': 'C:\ABCD\images\kb7.jpg',
  'kb8.jpg': 'C:\ABCD\images\kb8.jpg'
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => { });
      reject(err);
    });
  });
}

async function main() {
  console.log('Downloading sample images...');
  for (const [filename, url] of Object.entries(imageUrls)) {
    const dest = path.join(imagesDir, filename);
    try {
      await download(url, dest);
      console.log(`Saved ${filename}`);
    } catch (err) {
      console.error(`Failed to download ${filename}:`, err);
    }
  }
}

main();
