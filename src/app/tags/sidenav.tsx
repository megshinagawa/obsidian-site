import NavLinks  from '@/app/tags/navlinks';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="flex md:flex-col md:space-x-0 md:space-y-2">
        <h2>JOURNALS</h2>
        <NavLinks />
      </div>
    </div>
  );
}