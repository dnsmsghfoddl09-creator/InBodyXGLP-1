import { Suspense } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopNav } from "@/components/layout/TopNav";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f9fafb]">
      <Suspense
        fallback={
          <aside className="hidden w-[272px] shrink-0 border-r border-gray-100 bg-white lg:block" />
        }
      >
        <Sidebar />
      </Suspense>
      <div className="flex min-w-0 flex-1 flex-col">
        <TopNav />
        {children}
      </div>
    </div>
  );
}
