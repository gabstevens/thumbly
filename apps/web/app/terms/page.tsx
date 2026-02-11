export default function TermsPage() {
  return (
    <div className="container py-12 max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-black tracking-tight mb-4 text-foreground">Terms of Service</h1>
      <p className="mb-12 text-muted-foreground font-medium">Last updated: February 10, 2026</p>

      <div className="prose-custom max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">1. Acceptance of Terms</h2>
          <p>
            By accessing and using Thumbly (&quot;Service&quot;), you accept and agree to be bound by the terms and
            provision of this agreement. If you do not agree to abide by these terms, please do not use this Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">2. Description of Service</h2>
          <p>
            Thumbly provides a toolkit for collecting user feedback, including software libraries (`@thumbly/core`,
            `@thumbly/react`) and a managed backend service.
          </p>
          <p className="mt-4">
            The Service is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We reserve the right to
            modify, suspend, or discontinue the Service at any time without notice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">3. User Accounts</h2>
          <ul className="list-disc pl-5 space-y-2 marker:text-muted-foreground">
            <li>
              You must be a human. Accounts registered by &quot;bots&quot; or automated methods are not permitted.
            </li>
            <li>
              You are responsible for maintaining the security of your account and password. Thumbly cannot and will not
              be liable for any loss or damage from your failure to comply with this security obligation.
            </li>
            <li>
              You are responsible for all Content posted and activity that occurs under your account (even when Content
              is posted by others who have accounts under your account).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">4. Acceptable Use</h2>
          <p>You agree not to misuse the Service. For example, you must not:</p>
          <ul className="list-disc pl-5 mt-4 space-y-2 marker:text-muted-foreground">
            <li>
              Use the Service for any illegal purpose or in violation of any local, state, national, or international
              law.
            </li>
            <li>
              Violate or encourage others to violate any right of or obligation to a third party, including by
              infringing or misappropriating intellectual property, confidentiality, or privacy rights.
            </li>
            <li>Upload or disseminate any virus, adware, spyware, worm, or other malicious code.</li>
            <li>Interfere with or disrupt the security, integrity, or performance of the Service.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">5. Intellectual Property</h2>
          <p>
            <strong>Our IP:</strong> The Service and its original content (excluding Content provided by users),
            features, and functionality are and will remain the exclusive property of Thumbly and its licensors. The
            Service is protected by copyright, trademark, and other laws.
          </p>
          <p className="mt-4">
            <strong>Open Source:</strong> Certain components of the Service (e.g., the npm packages) are released under
            the MIT License. In the event of a conflict between these Terms and the MIT License, the MIT License shall
            prevail with respect to those specific components.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">6. Termination</h2>
          <p>
            We may terminate or suspend access to our Service immediately, without prior notice or liability, for any
            reason whatsoever, including without limitation if you breach the Terms.
          </p>
          <p className="mt-4">
            All provisions of the Terms which by their nature should survive termination shall survive termination,
            including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of
            liability.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">7. Limitation of Liability</h2>
          <p>
            In no event shall Thumbly, nor its directors, employees, partners, agents, suppliers, or affiliates, be
            liable for any indirect, incidental, special, consequential or punitive damages, including without
            limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access
            to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on
            the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of
            your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other
            legal theory, whether or not we have been informed of the possibility of such damage.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">8. Changes</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
            material we will try to provide at least 30 days notice prior to any new terms taking effect. What
            constitutes a material change will be determined at our sole discretion.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-foreground">9. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us via our GitHub repository.</p>
        </section>
      </div>
    </div>
  );
}
