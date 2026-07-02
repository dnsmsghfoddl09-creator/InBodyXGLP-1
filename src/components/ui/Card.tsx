import { type ReactNode } from "react";

type CardProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Card({ title, subtitle, action, children, className = "" }: CardProps) {
  return (
    <section
      className={`rounded-2xl border border-gray-100/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] transition-shadow hover:shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.04)] lg:p-6 ${className}`}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[15px] font-semibold tracking-tight text-gray-900">{title}</h2>
          {subtitle && <p className="mt-0.5 text-sm text-gray-500">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
