import "./globals.css";
import Link from "next/link";
import { ThemeProvider } from "./providers";
import { ThemeToggle } from "./components/ThemeToggle";

export const metadata = {
  title: "Thumbly - Modular Sentiment Feedback Toolkit",
  description: "A comprehensive, batteries-included sentiment feedback system.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <header>
            <div className="container">
              <div className="header-content">
                <Link href="/" className="logo">
                  Thumbly
                </Link>
                <nav style={{ display: "flex", alignItems: "center" }}>
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
                  <div style={{ marginLeft: "1rem" }}>
                    <ThemeToggle />
                  </div>
                </nav>
              </div>
            </div>
          </header>
          <main>{children}</main>
          <footer>
            <p>&copy; 2026 Thumbly Project</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
