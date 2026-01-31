export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container" style={{ padding: "4rem 0", display: "flex", gap: "3rem", alignItems: "flex-start" }}>
      <aside style={{ width: "250px", flexShrink: 0, position: "sticky", top: "2rem" }}>
        <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>Documentation</h3>
        <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <a href="/docs" className="docs-link">
            Introduction
          </a>
          <a href="/docs/getting-started" className="docs-link">
            Getting Started
          </a>
          <a href="/docs/self-hosting" className="docs-link">
            Self Hosting
          </a>
          <a href="/docs/api" className="docs-link">
            API Reference
          </a>
        </nav>
      </aside>
      <article style={{ flex: 1, minWidth: 0 }}>{children}</article>
    </div>
  );
}
