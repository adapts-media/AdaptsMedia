import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { verifyAdminSession } from "@/lib/session";

export default async function LeadsLayout({ children }: { children: React.ReactNode }) {
  const session = await verifyAdminSession();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#0B0B0C]/90 px-6 py-4 backdrop-blur-xl">
        <Link href="/admin/leads" className="text-sm font-medium tracking-tight">
          Adapts Media <span className="text-white/40">/ CMS</span>
        </Link>
        <div className="flex items-center gap-4">
          {session?.username && <span className="text-xs text-white/40">Signed in as {session.username}</span>}
          <LogoutButton />
        </div>
      </header>
      <main className="flex-1 px-6 py-8">{children}</main>
    </div>
  );
}
