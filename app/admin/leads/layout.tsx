import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function LeadsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#0B0B0C]/90 px-6 py-4 backdrop-blur-xl">
        <Link href="/admin/leads" className="text-sm font-medium tracking-tight">
          Adapts Media <span className="text-white/40">/ CMS</span>
        </Link>
        <LogoutButton />
      </header>
      <main className="flex-1 px-6 py-8">{children}</main>
    </div>
  );
}
