import Link from "next/link";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 md:px-8 py-12 flex flex-col md:flex-row gap-12 items-start">
      <aside className="w-full md:w-64 flex-shrink-0 md:sticky md:top-20">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Documentation</h3>
        <nav className="flex flex-col gap-1">
          <Link
            href="/docs"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Introduction
          </Link>
          <Link
            href="/docs/getting-started"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Getting Started
          </Link>
          <Link
            href="/docs/self-hosting"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Self Hosting
          </Link>
          <Link
            href="/docs/api"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            API Reference
          </Link>
        </nav>
      </aside>
      <article className="flex-1 min-w-0 prose prose-slate dark:prose-invert max-w-none">{children}</article>
    </div>
  );
}
