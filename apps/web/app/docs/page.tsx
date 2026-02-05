import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function DocsPage() {
  return (
    <>
      <h1>Introduction</h1>
      <p className="lead text-xl font-medium text-foreground mb-12">
        Thumbly is a comprehensive, modular sentiment feedback toolkit designed for the modern web.
      </p>

      <p>
        Building feedback widgets usually involves two bad choices: installing a heavy, ugly iframe widget, or building
        the entire backend, state management, and UI from scratch.
      </p>

      <p>
        Thumbly offers the middle ground:{" "}
        <strong className="text-foreground">Headless logic + Presetted UI + Free Backend</strong>.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose my-16">
        <div className="p-10 rounded-3xl border border-border bg-card hover:border-primary/20 transition-all group shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 border border-primary/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m18 16 4-4-4-4" />
              <path d="m6 8-4 4 4 4" />
              <path d="m14.5 4-5 16" />
            </svg>
          </div>
          <h3 className="font-black text-xl mb-3 text-foreground">For Frontend Devs</h3>
          <p className="text-muted-foreground font-medium text-[15px] leading-relaxed">
            Import <code>@thumbly/react</code> and drop in a component. It handles the API calls, loading states, and
            optimism for you.
          </p>
        </div>
        <div className="p-10 rounded-3xl border border-border bg-card hover:border-primary/20 transition-all group shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 border border-primary/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M3 5V19A9 3 0 0 0 21 19V5" />
              <path d="M3 12A9 3 0 0 0 21 12" />
            </svg>
          </div>
          <h3 className="font-black text-xl mb-3 text-foreground">For Backend Devs</h3>
          <p className="text-muted-foreground font-medium text-[15px] leading-relaxed">
            Use our core library to send data anywhere. We provide a default Supabase driver, but writing a custom
            driver takes 5 lines of code.
          </p>
        </div>
      </div>

      <h2>Core Concepts</h2>
      <ul className="list-none pl-0 space-y-4">
        <li className="flex gap-4">
          <div className="mt-1.5 flex-none w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-primary" />
          </div>
          <div>
            <strong className="text-foreground">Modular Architecture</strong>
            <p className="text-muted-foreground mt-1 text-[16px]">
              The architecture is split into <code>core</code> (logic) and <code>react</code> (UI). You can use one
              without the other.
            </p>
          </div>
        </li>
        <li className="flex gap-4">
          <div className="mt-1.5 flex-none w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-primary" />
          </div>
          <div>
            <strong className="text-foreground">Privacy-Native</strong>
            <p className="text-muted-foreground mt-1 text-[16px]">
              We only store aggregate counts. No IP addresses, User IDs, or timestamps are stored by default.
            </p>
          </div>
        </li>
        <li className="flex gap-4">
          <div className="mt-1.5 flex-none w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-primary" />
          </div>
          <div>
            <strong className="text-foreground">Batteries Included</strong>
            <p className="text-muted-foreground mt-1 text-[16px]">
              We provide a hosted Supabase instance for free. You don&apos;t need to set up a database to start.
            </p>
          </div>
        </li>
      </ul>

      <h2 className="mt-20">Next Steps</h2>
      <p>Ready to dive in? The setup takes less than 60 seconds.</p>

      <div className="not-prose mt-10">
        <Link
          href="/docs/getting-started"
          className="inline-flex items-center justify-center rounded-2xl bg-primary text-primary-foreground text-[15px] font-black h-12 px-8 shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
        >
          Get Started <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
