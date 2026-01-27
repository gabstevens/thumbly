import "./globals.css";

export const metadata = {
  title: "Thumbly - Modular Sentiment Feedback Toolkit",
  description: "A comprehensive, batteries-included sentiment feedback system.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <strong>Thumbly</strong>
          <nav>
            <a href="https://github.com/gabstevens/thumbly" style={{ marginLeft: "1rem" }}>
              GitHub
            </a>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>&copy; 2026 Thumbly Project</p>
        </footer>
      </body>
    </html>
  );
}
