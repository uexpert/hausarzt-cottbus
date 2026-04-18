const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

const sourcePath = path.join(__dirname, 'src', 'assets');
const destPath = path.join(__dirname, 'dist', 'hausarzt-cottbus', 'browser');

// .htaccess
const htaSource = path.join(sourcePath, '.htaccess');
const htaDest = path.join(destPath, '.htaccess');
fs.copyFile(htaSource, htaDest, (err) => {
  if (err) {
    console.error('Failed to copy .htaccess:', err);
  } else {
    console.log('.htaccess copied to dist folder.');
  }
});

// sitemap.xml
const siteSource = path.join(sourcePath, 'sitemap.xml');
const siteDest = path.join(destPath, 'sitemap.xml');

fs.copyFile(siteSource, siteDest, (err) => {
  if (err) {
    console.error('Failed to copy sitemap:', err);
  } else {
    console.log('sitemap copied to dist folder.');
  }
});

// robots.txt
const robotsSource = path.join(sourcePath, 'robots.txt');
const robotsDest = path.join(destPath, 'robots.txt');

fs.copyFile(robotsSource, robotsDest, (err) => {
  if (err) {
    console.error('Failed to copy robots:', err);
  } else {
    console.log('robots copied to dist folder.');
  }
});


// Google search
const googleSource = path.join(sourcePath, 'google20c1bc195e6a42b7.html');
const googleDest = path.join(destPath, 'google20c1bc195e6a42b7.html');

fs.copyFile(googleSource, googleDest, (err) => {
  if (err) {
    console.error('Failed to copy google20c1bc195e6a42b7:', err);
  } else {
    console.log('google20c1bc195e6a42b7 copied to dist folder.');
  }
});

// Bing search
const bingSource = path.join(sourcePath, 'BingSiteAuth.xml');
const bingDest = path.join(destPath, 'BingSiteAuth.xml');

fs.copyFile(bingSource, bingDest, (err) => {
  if (err) {
    console.error('Failed to copy BingSiteAuth:', err);
  } else {
    console.log('BingSiteAuth copied to dist folder.');
  }
});

// PHP API endpoint (excluded from Angular assets to avoid static-file conflict with dev proxy)
const apiSourceDir = path.join(__dirname, 'server', 'api');
const apiDestDir = path.join(destPath, 'api');
fsp.mkdir(apiDestDir, { recursive: true })
  .then(() => fsp.readdir(apiSourceDir))
  .then(files => Promise.all(
    files.map(f => fsp.copyFile(path.join(apiSourceDir, f), path.join(apiDestDir, f)))
  ))
  .then(() => console.log('api/ folder copied to dist folder.'))
  .catch(err => console.error('Failed to copy api/ folder:', err));
