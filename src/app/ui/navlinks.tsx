'use client';
 
import Link from 'next/link';
import notesList from '@/app/ui/pages.json';

const links = notesList.pages.map(page => {
  const name = page.replace('.html', '');
  return { name, href: `/dashboard/${name}` };
});


export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        return (
          <Link 
            key={link.name}
            href={link.href}
            >
            <p className="hidden md:block">{link.name.replace("-", " ")}</p>
          </Link>
        );
      })}
    </>
  );
}