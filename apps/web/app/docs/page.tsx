import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="prose">
      <h1>Documentation</h1>
      <p>
        Welcome to the Thumbly documentation. Here you will find everything you need to know about integrating and
        customizing Thumbly for your projects.
      </p>

      <h2>Core Concepts</h2>
      <ul>
        <li>
          <strong>Modular:</strong> Use only what you need (UI, Logic, or Backend).
        </li>
        <li>
          <strong>Privacy-First:</strong> No PII collected, just aggregate counts.
        </li>
        <li>
          <strong>Batteries Included:</strong> Comes with a free backend, but allows you to bring your own.
        </li>
      </ul>

      <h2>Next Steps</h2>
      <p>
        Check out the <Link href="/docs/getting-started">Getting Started</Link> guide to integrate Thumbly in under 5
        minutes.
      </p>
    </div>
  );
}
