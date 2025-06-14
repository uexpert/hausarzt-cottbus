const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, 'src', 'assets');
const destPath = path.join(__dirname, 'dist', 'hausarzt-cottbus', 'browser');

const htaSource = path.join(sourcePath, '.htaccess');
const htaDest = path.join(destPath, '.htaccess');
fs.copyFile(htaSource, htaDest, (err) => {
  if (err) {
    console.error('Failed to copy .htaccess:', err);
  } else {
    console.log('.htaccess copied to dist folder.');
  }
});


const siteSource = path.join(sourcePath, 'sitemap.xml');
const siteDest = path.join(destPath, 'sitemap.xml');

fs.copyFile(siteSource, siteDest, (err) => {
  if (err) {
    console.error('Failed to copy sitemap:', err);
  } else {
    console.log('sitemap copied to dist folder.');
  }
});


const robotsSource = path.join(sourcePath, 'robots.txt');
const robotsDest = path.join(destPath, 'robots.txt');

fs.copyFile(robotsSource, robotsDest, (err) => {
  if (err) {
    console.error('Failed to copy robots:', err);
  } else {
    console.log('robots copied to dist folder.');
  }
});
