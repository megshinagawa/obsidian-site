'use client';
 
import Link from 'next/link';
import notesList from '@/app/ui/pages.json';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = notesList.pages.map(page => {
  const name = page.replace('.html', '');
  return { name, href: `/dashboard/${name}` };
});


export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        return (
          <Link 
            key={link.name}
            href={link.href}
            className={clsx(
              {
                'text-accent !bg-accentlight': pathname === link.href,
              },
              'flex h-auto grow items-center justify-center gap-2 rounded-md bg-gray p-3 text-sm font-medium hover:bg-accentlight hover:text-accent md:flex-none md:justify-start md:p-2 md:px-3'
            )}
            >
            <p className="hidden md:block">{link.name.replace(/-/g, " ")}</p>
          </Link>
        );
      })}
    </>
  );
}