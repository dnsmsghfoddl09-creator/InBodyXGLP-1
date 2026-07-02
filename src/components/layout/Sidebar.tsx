"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarGroups, PLATFORM_NAME } from "@/data/navigation";
import { IconClose, IconMenu } from "@/components/ui/Icons";

function isActivePath(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard" || pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <>
      <div className="flex h-16 shrink-0 items-center gap-3 border-b border-gray-100 px-4">
          <Link
          href="/dashboard"
          prefetch={false}
          onClick={() => setMobileOpen(false)}
          className="flex min-w-0 flex-1 items-center gap-3"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-sm font-bold text-white shadow-sm">
            IB
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900">InBody</p>
            <p className="truncate text-[10px] leading-tight text-gray-500">Global Strategy Intelligence</p>
          </div>
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 lg:hidden"
          aria-label="Close menu"
        >
          <IconClose className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {sidebarGroups.map((group, groupIndex) => (
          <div key={`${group.label}-${groupIndex}`} className={groupIndex > 0 ? "mt-4" : ""}>
            {group.label ? (
              <div className="mb-1.5 flex items-center gap-1.5 px-3">
                {group.emoji && <span className="text-sm">{group.emoji}</span>}
                <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  {group.label}
                </span>
              </div>
            ) : group.emoji && group.items.length === 1 ? (
              <div className="mb-1 px-3">
                <span className="text-sm">{group.emoji}</span>
              </div>
            ) : null}

            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = isActivePath(pathname, item.href);
                const isDashboard = item.id === "dashboard";
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      prefetch={false}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-medium transition-all ${
                        isActive
                          ? "bg-blue-50 text-blue-700 shadow-sm"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      } ${!group.label && !isDashboard ? "pl-6" : ""}`}
                    >
                      {isDashboard && <span className="text-base">🏠</span>}
                      {!group.label && !isDashboard && group.emoji && (
                        <span className="sr-only">{group.emoji}</span>
                      )}
                      {group.label && !isDashboard && (
                        <span className="text-gray-300">•</span>
                      )}
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {groupIndex < sidebarGroups.length - 1 && group.label && (
              <div className="mx-3 mt-4 border-t border-gray-100" />
            )}
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-gray-100 p-3">
        <div className="rounded-xl bg-gray-50 px-3 py-2.5">
          <p className="text-xs font-medium text-gray-900">HQ Strategy Team</p>
          <p className="text-[10px] text-gray-500">{PLATFORM_NAME.split(" ").slice(-2).join(" ")} · v2.0</p>
        </div>
      </div>
    </>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-[4.25rem] z-40 flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm lg:hidden"
        aria-label="Open menu"
      >
        <IconMenu className="h-4 w-4 text-gray-700" />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[272px] flex-col border-r border-gray-100 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
