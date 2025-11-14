/**
 * Script untuk mengupdate file strings.xml Android dari config/birthday.ts
 * 
 * Usage: node scripts/update-android-strings.js
 */

const fs = require('fs');
const path = require('path');

// Baca config
const configPath = path.join(__dirname, '../config/birthday.ts');
const configContent = fs.readFileSync(configPath, 'utf-8');

// Extract BIRTHDAY_NAME dari config
const nameMatch = configContent.match(/export const BIRTHDAY_NAME = ["']([^"']+)["']/);
if (!nameMatch) {
  console.error('❌ Tidak dapat menemukan BIRTHDAY_NAME di config/birthday.ts');
  process.exit(1);
}

const birthdayName = nameMatch[1];
console.log(`✅ Nama ditemukan: ${birthdayName}`);

// Update strings.xml
const stringsXmlPath = path.join(__dirname, '../android/app/src/main/res/values/strings.xml');
let stringsXmlContent = fs.readFileSync(stringsXmlPath, 'utf-8');

// Update app_name dan title_activity_main
stringsXmlContent = stringsXmlContent.replace(
  /<string name="app_name">.*?<\/string>/,
  `<string name="app_name">Birthday for ${birthdayName}</string>`
);
stringsXmlContent = stringsXmlContent.replace(
  /<string name="title_activity_main">.*?<\/string>/,
  `<string name="title_activity_main">Birthday for ${birthdayName}</string>`
);

// Update komentar
stringsXmlContent = stringsXmlContent.replace(
  /<!--[\s\S]*?Saat ini menggunakan: .*?[\s\S]*?-->/,
  `<!-- 
        CATATAN: Nama di bawah ini diupdate otomatis dari config/birthday.ts
        Setelah mengubah BIRTHDAY_NAME di config/birthday.ts, jalankan: node scripts/update-android-strings.js
        Saat ini menggunakan: ${birthdayName}
    -->`
);

fs.writeFileSync(stringsXmlPath, stringsXmlContent, 'utf-8');
console.log(`✅ File strings.xml berhasil diupdate dengan nama: ${birthdayName}`);
console.log(`📝 File: ${stringsXmlPath}`);

