export default function SelfHostingPage() {
  return (
    <div className="prose">
      <h1>Self-Hosting Guide</h1>
      <p>
        Thumbly&apos;s backend is 100% open-source and built on Supabase. You can host your own instance to have full
        control over your data.
      </p>

      <h2>Prerequisites</h2>
      <ul>
        <li>
          <a href="https://supabase.com" target="_blank">
            Supabase Account
          </a>{" "}
          (Free Tier works great)
        </li>
        <li>Node.js & npm/pnpm</li>
        <li>Supabase CLI</li>
      </ul>

      <h2>1. Initialize Supabase</h2>
      <p>If you haven&apos;t already, clone the Thumbly repository and navigate to the infrastructure folder.</p>
      <pre>
        <code>git clone https://github.com/gabstevens/thumbly.git cd thumbly</code>
      </pre>

      <h2>2. Link your Project</h2>
      <p>Create a new project in your Supabase dashboard, then link it using the CLI:</p>
      <pre>
        <code>npx supabase link --project-ref your-project-ref --workdir infra</code>
      </pre>

      <h2>3. Push the Schema</h2>
      <p>Deploy the database tables, RPC functions, and RLS policies to your remote project.</p>
      <pre>
        <code>npx supabase db push --workdir infra</code>
      </pre>

      <h2>4. Connect the Client</h2>
      <p>Update your frontend application to point to your new self-hosted backend.</p>
      <pre>
        <code>
          &lt;ThumblyBinary surveyId=&quot;...&quot; supabaseUrl=&quot;https://your-project.supabase.co&quot;
          supabaseKey=&quot;your-anon-key&quot; /&gt;
        </code>
      </pre>
    </div>
  );
}
