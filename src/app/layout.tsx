import '@/app/ui/globals.css';
import Image from 'next/image';
import Link from 'next/link'
import SideNav from '@/app/ui/sidenav';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className='text-black'>
        <header className='flex pb-6 gap-2 items-center'>
          <Link href="/">
            <Image src={"/mslogo.png"} width={30} height={30} alt='megshinagawa logo'/>
          </Link>
          <Link href="/">
            <h1 className='text-xl font-bold'>MEG&apos;S SECOND BRAIN</h1>
          </Link>
          
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