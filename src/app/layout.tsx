'use client';

import '@/app/ui/globals.css';
import '@/app/ui/markdown-styles.css'
import Image from 'next/image';
import Link from 'next/link'
import { SCP } from '@/app/ui/fonts'
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <html lang="en" className={SCP.className}>
      <body className='text-black p-0'>
        <div className='flex p-10 items-center bg-gray'>
          <header className='flex gap-5'>
            <Link href="/" >
              <Image src={"/mslogo.png"} width={30} height={30} alt='megshinagawa logo'/>
            </Link>
            <Link href="/">
              <h1 className='text-xl font-bold'>MEG&apos;S SECOND BRAIN</h1>
            </Link>
          </header>
          <div className='w-20'></div>
          <nav className='flex gap-8'>
            <Link href="/about" className={clsx({'text-accent': pathname.startsWith('/about'),})}>
              <p>ABOUT</p>
            </Link>
            <Link href="/dashboard" className={clsx({'text-accent': pathname.startsWith('/dashboard'),})}>
              <p>NOTES</p>
            </Link>
            <Link href="/tags" className={clsx({'text-accent': pathname.startsWith('/tags'),})}>
              <p>TAGS</p>
            </Link>
            <Link href="/journal" className={clsx({'text-accent': pathname.startsWith('/journal'),})}>
              <p>JOURNAL</p>
            </Link>
          </nav>
        </div>
        <main className='pt-5 pl-10 pr-10'>{children}</main>
      </body>
    </html>
  )
}