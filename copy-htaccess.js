const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, 'src/assets/.htaccess');
const dest = path.join(__dirname, 'dist', 'hausarzt-cottbus', 'browser','.htaccess');

fs.copyFile(source, dest, (err) => {
  if (err) {
    console.error('Failed to copy .htaccess:', err);
  } else {
    console.log('.htaccess copied to dist folder.');
  }
});
