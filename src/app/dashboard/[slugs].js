import fs from 'fs';
import path from 'path';

export async function getStaticProps({ params }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'public', 'static-sites', `${slug}.html`);

  let content = '';
  try {
    content = fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error('Error reading file:', error);
    content = '<h1>Page Not Found</h1>';
  }

  return {
    props: { content },
  };
}

export async function getStaticPaths() {
  const directoryPath = path.join(process.cwd(), 'public', 'static-sites');
  const filenames = fs.readdirSync(directoryPath);

  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(/\.html$/, '') },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default function StaticPage({ content }) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
