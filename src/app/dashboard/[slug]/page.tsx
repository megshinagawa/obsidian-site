
import fs from 'fs';
import path from 'path';

// Generate static paths for pre-rendering
export async function generateStaticParams() {
  const directoryPath = path.join(process.cwd(), 'public', 'static-sites');
  const filenames = fs.readdirSync(directoryPath);

  // Create slug paths based on filenames
  return filenames.map((filename) => ({
    slug: filename.replace(/\.html$/, ''), // Remove the .html extension for the slug
  }));
}

// The component that renders the static page
export default async function StaticPage({ params }: { params: { slug: string } }) { // Use 'params' (lowercase)
  const { slug } = await params; // Destructure slug from params
  const filePath = path.join(process.cwd(), 'public', 'static-sites', `${slug}.html`);

  let content = '';
  try {
    content = fs.readFileSync(filePath, 'utf-8'); // Read the HTML file
  } catch (error) {
    console.error('Error reading file:', error);
    content = '<h1>Page Not Found</h1>'; // Fallback content
  }

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
