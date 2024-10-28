import '@/app/ui/globals.css';
import SideNav from '@/app/journal/sidenav';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
            <SideNav />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
            <div>{children}</div>
        </div>
        <div className="w-full flex-none md:w-64">
          <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <div className="flex md:flex-col md:space-x-0 md:space-y-2">
              <p>right side panel</p>
            </div>
          </div>
        </div>
    </div>  
  )
}


