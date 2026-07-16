const fs = require('fs');
let content = fs.readFileSync('src/sanity/migrateToSanity.ts', 'utf8');

const regex = /answer:\s*\[\s*\{\s*_type:\s*'block',\s*children:\s*\[\s*\{\s*_type:\s*'span',\s*text:\s*(['"`])(.*?)\1\s*\}\s*\]\s*\}\s*\]/g;

content = content.replace(regex, "answer: `$2`");

fs.writeFileSync('src/sanity/migrateToSanity.ts', content);
console.log('Fixed migrateToSanity.ts');
