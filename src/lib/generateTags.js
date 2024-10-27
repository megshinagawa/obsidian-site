import fs from 'fs-extra';
import path from 'path';
import { processMarkdown } from './parseMarkdown.js';

const inputDir = 'vault/tags';
const outputDir = 'public/tags';

// Ensure output directory is clean
fs.emptyDirSync(outputDir);

// Function to add /dashboard prefix to all internal links
function prefixLinks(htmlContent) {
  // Regular expression to match markdown-style links [text](url)
  return htmlContent.replace(/href="(\/(?!tags\/)[^"]*)"/g, 'href="/tags$1"');
}


// Recursively read all markdown files
function generateSite() {
  const files = fs.readdirSync(inputDir);

  files.forEach(file => {
    const filePath = path.join(inputDir, file);

    // Only handle Markdown files
    if (file.endsWith('.md')) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const { html, metadata } = processMarkdown(content);

      // Apply /dashboard prefix to links in HTML content
      const updatedHtml = prefixLinks(html);

      // Define output file
      const outputFilePath = path.join(outputDir, file.replace('.md', '.html'));

      // Generate HTML with optional metadata (title, etc.)
      const finalHtml = `
        <html>
          <head>
            <title>${metadata.title || 'Untitled'}</title>
          </head>
          <body>
            ${updatedHtml}
          </body>
        </html>
      `;

      // Write the HTML file to the output directory
      fs.writeFileSync(outputFilePath, finalHtml);
      // console.log(`Generated ${outputFilePath}`);

      
    }
  });
}

generateSite();

