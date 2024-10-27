import fs from 'fs';

const staticSitesDir = 'public/static-sites';
const outputPath = 'src/app/ui/pages.json';

// Read all HTML files from the output directory
fs.readdir(staticSitesDir, (err, files) => {
  if (err) {
    console.error('Unable to scan directory:', err);
    return;
  }

  const htmlFiles = files.filter((file) => file.endsWith('.html'));
  const pagesJson = { pages: htmlFiles };

  fs.writeFile(outputPath, JSON.stringify(pagesJson, null, 2), (err) => {
    if (err) {
      console.error('Error writing pages.json:', err);
    } else {
      console.log('pages.json updated successfully');
    }
  });
});
