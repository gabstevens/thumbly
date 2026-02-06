import "./globals.css";
import Link from "next/link";
import { ThemeProvider } from "./providers";
import { ThemeToggle } from "./components/ThemeToggle";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Github } from "lucide-react";
import { SiteConfig, FooterContent } from "@/lib/content";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: SiteConfig.metadata.title,
  description: SiteConfig.metadata.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background text-foreground font-sans antialiased flex flex-col items-center",
          inter.variable,
        )}
      >
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
          <div className="w-full max-w-[1200px] flex flex-col min-h-screen px-4 sm:px-6">
            <header className="flex h-20 items-center justify-between py-4">
              <div className="flex items-center gap-10">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-90 transition-opacity text-foreground"
                >
                  <img src="/logo.svg" alt="Thumbly Logo" className="w-8 h-8 rounded-lg" />
                  <span>{SiteConfig.name}</span>
                </Link>
                <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-muted-foreground">
                  {SiteConfig.navigation.map((item) => (
                    <Link key={item.href} href={item.href} className="hover:text-foreground transition-colors">
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <a
                  href={SiteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github size={22} />
                </a>
              </div>
            </header>
            <main className="flex-1 w-full pt-10 pb-20">{children}</main>

            <footer className="py-12 border-t border-border">
              <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                <div className="max-w-xs">
                  <div className="flex items-center gap-2 font-bold text-lg mb-4 text-foreground">
                    <img src="/logo.svg" alt="Thumbly Logo" className="w-6 h-6 rounded-md" />
                    {SiteConfig.name}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{FooterContent.description}</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
                  {FooterContent.sections.map((section) => (
                    <div key={section.title} className="flex flex-col gap-3">
                      <h4 className="font-bold text-sm text-foreground">{section.title}</h4>
                      {section.links.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-[12px] text-muted-foreground">
                <p>{FooterContent.legal.copyright}</p>
                <div className="flex gap-6">
                  {FooterContent.legal.links.map((link) => (
                    <Link key={link.label} href={link.href} className="hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
