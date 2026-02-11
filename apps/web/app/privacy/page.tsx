export default function PrivacyPage() {
  return (
    <div className="container py-12 max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-black tracking-tight mb-4 text-foreground">Privacy Policy</h1>
      <p className="mb-12 text-muted-foreground font-medium">Last updated: February 10, 2026</p>

      <div className="prose-custom max-w-none space-y-8">
        <section>
          <p className="lead">
            Thumbly is designed with a &quot;Privacy First&quot; philosophy. We believe that collecting feedback
            shouldn&apos;t require compromising the privacy of your users or yourself.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">1. For Survey Participants (End Users)</h2>
          <p>When you interact with a Thumbly widget on a third-party website, we prioritize your anonymity:</p>
          <ul className="list-disc pl-5 mt-4 space-y-2 marker:text-muted-foreground">
            <li>
              <strong>No PII:</strong> We do not collect Personally Identifiable Information (names, emails, etc.).
            </li>
            <li>
              <strong>No Tracking:</strong> We do not store IP addresses, User Agents, or browser fingerprints.
            </li>
            <li>
              <strong>Aggregate Only:</strong> We only store the total count of votes for each option. Individual vote
              timestamps are not recorded in our default managed service.
            </li>
            <li>
              <strong>Local Persistence:</strong> We may use <code>localStorage</code> in your browser to remember that
              you have already voted for a specific survey, preventing duplicate submissions. This data remains on your
              device and is not sent to our servers.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">2. For Developers (Account Holders)</h2>
          <p>To provide our managed dashboard service, we collect limited information from developers:</p>
          <ul className="list-disc pl-5 mt-4 space-y-2 marker:text-muted-foreground">
            <li>
              <strong>Account Information:</strong> When you sign up for the Thumbly dashboard, we store your email
              address or your GitHub username (depending on the provider used).
            </li>
            <li>
              <strong>Service Data:</strong> We store the configuration and aggregate results of the surveys you create.
            </li>
            <li>
              <strong>Authentication:</strong> We use Supabase Auth to manage secure access to your account.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">3. Data Storage & Infrastructure</h2>
          <p>
            Our default managed service is powered by <strong>Supabase</strong>. Your survey data and account
            information are stored in a PostgreSQL database hosted on Supabase infrastructure.
          </p>
          <p className="mt-4">
            If you choose to <strong>Bring Your Own Backend (BYOB)</strong>, Thumbly does not store or process any of
            your data; all interactions occur directly between your application and your chosen infrastructure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">4. Cookies</h2>
          <p>The Thumbly marketing site and documentation do not use tracking or advertising cookies.</p>
          <p className="mt-4">
            The Thumbly Dashboard (<code>/app</code>) uses essential session cookies provided by Supabase Auth to keep
            you logged in and secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">5. Data Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to others. We do not share data with third-party
            analytics or advertising networks.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">6. Your Rights</h2>
          <p>
            Depending on your location (such as the EU under GDPR), you may have rights regarding your personal data,
            including the right to access, correct, or delete the information we hold about you. Developers can delete
            their surveys and account data directly through the dashboard.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">7. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please reach out via our GitHub repository.</p>
        </section>
      </div>
    </div>
  );
}
