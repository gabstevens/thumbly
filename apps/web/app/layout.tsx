import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Thumbly - Modular Sentiment Feedback Toolkit",
  description: "A comprehensive, batteries-included sentiment feedback system.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <div className="container">
            <div className="header-content">
              <Link href="/" className="logo">
                Thumbly
              </Link>
              <nav>
                <Link href="/app" className="nav-link">
                  Dashboard
                </Link>
                <Link href="/docs" className="nav-link">
                  Documentation
                </Link>
                <a
                  href="https://github.com/gabstevens/thumbly"
                  className="nav-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </nav>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer>
          <p>&copy; 2026 Thumbly Project</p>
        </footer>
      </body>
    </html>
  );
}
