"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Book, Server, Rocket, Code2 } from "lucide-react";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: "/docs", label: "Introduction", icon: Book },
    { href: "/docs/getting-started", label: "Getting Started", icon: Rocket },
    { href: "/docs/self-hosting", label: "Self Hosting", icon: Server },
    { href: "/docs/api", label: "API Reference", icon: Code2 },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-16 items-start max-w-[1200px] mx-auto w-full">
      <aside className="w-full lg:w-64 flex-shrink-0 lg:sticky lg:top-32">
        <div className="space-y-6">
          <div className="px-4">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-6 px-1">
              Documentation
            </h3>
            <nav className="flex flex-col gap-1.5">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-2.5 text-[14px] font-bold transition-all duration-200",
                      isActive
                        ? "bg-primary/10 text-primary shadow-[inset_0_0_0_1px_rgba(16,185,129,0.2)]"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <Icon
                      size={16}
                      strokeWidth={isActive ? 2.5 : 2}
                      className={cn(isActive ? "text-primary" : "text-muted-foreground")}
                    />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border mx-4 hidden lg:block shadow-sm">
            <h4 className="text-xs font-bold text-foreground mb-2">Need help?</h4>
            <p className="text-[12px] text-muted-foreground leading-relaxed mb-4 font-medium">
              Join our community discord to get help from other developers.
            </p>
            <a href="#" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
              Join Discord <ArrowRightIcon />
            </a>
          </div>
        </div>
      </aside>

      <article className="flex-1 min-w-0 prose-custom max-w-none">{children}</article>
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
