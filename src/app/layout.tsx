import '@/app/ui/globals.css';
import '@/app/ui/markdown-styles.css'
import Image from 'next/image';
import Link from 'next/link'
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className='text-black'>
        <div className='flex pb-6 items-center justify-between'>
          <header className='flex gap-2'>
            <Link href="/">
              <Image src={"/mslogo.png"} width={30} height={30} alt='megshinagawa logo'/>
            </Link>
            <Link href="/">
              <h1 className='text-xl font-bold'>MEG&apos;S SECOND BRAIN</h1>
            </Link>
          </header>
          <nav className='flex gap-8'>
            <Link href="/dashboard">
              <p>NOTES</p>
            </Link>
            <Link href="/tags">
              <p>TAGS</p>
            </Link>
            <Link href="/journal">
              <p>JOURNAL</p>
            </Link>
          </nav>
        </div>
        <main>{children}</main>
      </body>
    </html>
  )
}