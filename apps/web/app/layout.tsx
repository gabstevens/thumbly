import "./globals.css";
import Link from "next/link";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Github } from "lucide-react";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "Thumbly - Modular Sentiment Feedback Toolkit",
  description: "A comprehensive, batteries-included sentiment feedback system.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body
        className={cn(
          "min-h-screen bg-background text-foreground font-sans antialiased flex flex-col items-center",
          inter.variable,
        )}
      >
        <div className="w-full max-w-[1200px] flex flex-col min-h-screen px-4 sm:px-6">
          <header className="flex h-20 items-center justify-between py-4">
            <div className="flex items-center gap-10">
              <Link
                href="/"
                className="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-90 transition-opacity"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M7 11V19A2 2 0 009 21H16.8A2 2 0 0018.8 19.1L20 12.7A2 2 0 0018 10H14V5A2 2 0 0011.8 3.2C11.4 3.3 11 3.6 11 4V11H7Z" />
                    <path d="M7 11H4A2 2 0 002 13V19A2 2 0 004 21H7" />
                  </svg>
                </div>
                <span>Thumbly</span>
              </Link>
              <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-muted-foreground">
                <Link href="/docs" className="hover:text-foreground transition-colors">
                  Docs
                </Link>
                <Link href="/app" className="hover:text-foreground transition-colors">
                  Dashboard
                </Link>
                <Link href="/docs/api" className="hover:text-foreground transition-colors">
                  API
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/gabstevens/thumbly"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github size={22} />
              </a>
              <Link
                href="/app"
                className="hidden sm:inline-flex items-center justify-center rounded-xl bg-white text-black px-5 py-2 text-sm font-bold hover:bg-white/90 transition-all"
              >
                Get Started
              </Link>
            </div>
          </header>

          <main className="flex-1 w-full pt-10 pb-20">{children}</main>

          <footer className="py-12 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12">
              <div className="max-w-xs">
                <div className="flex items-center gap-2 font-bold text-lg mb-4">Thumbly</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A lightweight, modular sentiment feedback toolkit. Open source, private, and free.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-sm text-white">Product</h4>
                  <Link href="/docs" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Docs
                  </Link>
                  <Link href="/app" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Dashboard
                  </Link>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-sm text-white">Resources</h4>
                  <Link
                    href="/docs/getting-started"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Guide
                  </Link>
                  <Link href="/docs/api" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    API
                  </Link>
                </div>
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-sm text-white">Social</h4>
                  <a
                    href="https://github.com/gabstevens/thumbly"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    GitHub
                  </a>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Twitter
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[12px] text-muted-foreground">
              <p>&copy; 2026 Thumbly Project. MIT Licensed.</p>
              <div className="flex gap-6">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
