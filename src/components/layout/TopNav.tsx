"use client";

import { useState } from "react";
import { notifications } from "@/data/mock-data";
import { PLATFORM_NAME } from "@/data/navigation";

export function TopNav() {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b border-gray-100 bg-white/90 px-4 backdrop-blur-xl lg:px-6">
      <div className="hidden min-w-0 flex-1 lg:block">
        <p className="truncate text-sm font-medium text-gray-900">{PLATFORM_NAME}</p>
        <p className="truncate text-xs text-gray-500">HQ · Subsidiaries · Executives</p>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 lg:flex-none lg:gap-3">
        <div className="relative hidden max-w-md flex-1 sm:block lg:w-72 lg:flex-none">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            type="search"
            placeholder="Search platform…"
            className="h-9 w-full rounded-xl border border-gray-200 bg-gray-50/80 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
            aria-label="Notifications"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
              />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifications(false)}
                aria-hidden="true"
              />
              <div className="absolute right-0 z-50 mt-2 w-80 rounded-2xl border border-gray-100 bg-white p-2 shadow-xl">
                <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Notifications
                </p>
                <ul className="max-h-64 overflow-y-auto">
                  {notifications.map((item) => (
                    <li
                      key={item.title}
                      className={`rounded-xl px-3 py-2.5 ${item.unread ? "bg-blue-50/50" : "hover:bg-gray-50"}`}
                    >
                      <p className="text-sm font-medium text-gray-900">{item.title}</p>
                      <p className="mt-0.5 text-xs text-gray-500">{item.time}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>

        <button
          type="button"
          className="flex h-9 items-center gap-2 rounded-xl border border-gray-200 bg-white pl-1 pr-3 transition-colors hover:bg-gray-50"
          aria-label="User menu"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 text-xs font-semibold text-white">
            SM
          </div>
          <span className="hidden text-sm font-medium text-gray-700 md:inline">Strategy Team</span>
        </button>
      </div>
    </header>
  );
}
