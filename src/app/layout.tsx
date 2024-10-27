import '@/app/ui/globals.css';
import Image from 'next/image';
import Link from 'next/link'
import SideNav from '@/app/ui/sidenav';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className='flex p-6 gap-4 items-center'>
          <Link href="/">
            <Image src={"/mslogo.png"} width={40} height={40} alt='megshinagawa logo'/>
          </Link>
          <h1 className='text-xl font-bold'>Meg&apos;s Second Brain</h1>
        </header>

        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideNav />
          </div>
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
            <div>{children}</div>
          </div>
        </div>  
      </body>
    </html>
  )
}