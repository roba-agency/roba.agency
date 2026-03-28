import { generate } from 'critical';
import { readdir, readFile } from 'fs/promises';
import path from 'path';

async function findHtml(dir) {
  let results = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(await findHtml(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = await findHtml('dist');

for (const file of htmlFiles) {
  console.log(`Processing: ${file}`);
  await generate({
    inline: true,
    base: 'dist/',
    html: await readFile(file, 'utf-8'),
    target: path.relative('dist', file),
    width: 1440,
    height: 900,
    extract: true,
    ignore: {
      atrule: ['@font-face'],
    },
    request: {
      https: { rejectUnauthorized: false },
    },
  });
}