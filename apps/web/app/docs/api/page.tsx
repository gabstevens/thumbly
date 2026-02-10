import { CodeBlock } from "../../components/CodeBlock";

export default function ApiReferencePage() {
  return (
    <div>
      <h1>API Reference</h1>
      <p className="lead">
        Detailed technical documentation for <code>@thumbly/core</code> and <code>@thumbly/react</code>.
      </p>

      {/* --- CORE SECTION --- */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-border" />
          <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground m-0">@thumbly/core</h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        <h2 id="core-client" className="mt-0">
          Client
        </h2>
        <p className="text-muted-foreground mb-6">
          The <code>ThumblyClient</code> class is the primary engine for vote submission, state management, and
          persistence.
        </p>

        <div className="space-y-10">
          <div>
            <h3 className="font-mono text-xl">ThumblyClient</h3>
            <div className="bg-card border border-border rounded-2xl overflow-hidden mt-4">
              <div className="px-6 py-4 border-b border-border bg-muted/30">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Methods</h4>
              </div>
              <div className="divide-y divide-border/50">
                <div className="p-6">
                  <code className="text-foreground font-bold">constructor(config: ThumblyConfig)</code>
                  <p className="text-sm text-muted-foreground mt-2">
                    Initializes a new client instance. See{" "}
                    <a href="#types" className="text-primary hover:underline">
                      ThumblyConfig
                    </a>{" "}
                    for details.
                  </p>
                </div>
                <div className="p-6">
                  <code className="text-foreground font-bold">
                    vote&lt;T&gt;(optionIndex: number, metadata?: T): Promise&lt;void&gt;
                  </code>
                  <p className="text-sm text-muted-foreground mt-2">
                    Submits a vote for the specified option. Handles validation, retries, and persistence updates.
                  </p>
                </div>
                <div className="p-6">
                  <code className="text-foreground font-bold">hasVoted(): boolean</code>
                  <p className="text-sm text-muted-foreground mt-2">
                    Checks if the user has already voted (via <code>localStorage</code>).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 id="core-drivers" className="mt-16">
          Drivers
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="font-mono text-lg">SupabaseDriver</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Driver for the default Thumbly backend (Supabase). Enforces 1-5 option index.
            </p>
            <CodeBlock
              code={`new SupabaseDriver(url: string, anonKey: string)`}
              language="typescript"
              className="text-xs"
            />
          </div>

          <div>
            <h3 className="font-mono text-lg">FetchDriver</h3>
            <p className="text-sm text-muted-foreground mb-3">Generic driver for any HTTP POST endpoint.</p>
            <CodeBlock
              code={`new FetchDriver(url: string, headers?: Record<string, string>)`}
              language="typescript"
              className="text-xs"
            />
          </div>

          <div>
            <h3 className="font-mono text-lg">CustomDriver</h3>
            <p className="text-sm text-muted-foreground mb-3">Adapter for functional voting logic or SDK wrapping.</p>
            <CodeBlock
              code={`new CustomDriver({
  submitVote: (payload) => Promise<void>,
  validate?: (index) => void
})`}
              language="typescript"
              className="text-xs"
            />
          </div>
        </div>

        <h2 id="core-errors" className="mt-16">
          Errors
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              name: "TransientError",
              desc: "Recoverable errors (e.g., 503, 429). The client will automatically retry these.",
            },
            {
              name: "PermanentError",
              desc: "Non-recoverable errors (e.g., 400, 401). Retries are aborted immediately.",
            },
            {
              name: "ValidationError",
              desc: "Thrown when inputs (like option index) are invalid.",
            },
          ].map((err) => (
            <div key={err.name} className="p-4 border border-border rounded-xl bg-card">
              <code className="text-sm font-bold text-rose-500">{err.name}</code>
              <p className="text-xs text-muted-foreground mt-2">{err.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- REACT SECTION --- */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px flex-1 bg-border" />
          <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground m-0">@thumbly/react</h2>
          <div className="h-px flex-1 bg-border" />
        </div>

        <h2 id="react-hooks" className="mt-0">
          Hooks
        </h2>
        <div className="space-y-10">
          <div>
            <h3 className="font-mono text-xl">useThumbly(config | client)</h3>
            <div className="bg-card border border-border rounded-2xl overflow-hidden mt-4">
              <div className="px-6 py-4 border-b border-border bg-muted/30">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Return Value</h4>
              </div>
              <div className="p-6">
                <ul className="space-y-4 m-0 list-none p-0">
                  <li className="flex flex-col gap-1">
                    <code className="text-foreground font-bold">vote: (index: number) =&gt; Promise&lt;void&gt;</code>
                    <span className="text-sm text-muted-foreground">Function to trigger a vote.</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <code className="text-foreground font-bold">isLoading: boolean</code>
                    <span className="text-sm text-muted-foreground">True while the request is in flight.</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <code className="text-foreground font-bold">hasVoted: boolean</code>
                    <span className="text-sm text-muted-foreground">True if the user has already voted.</span>
                  </li>
                  <li className="flex flex-col gap-1">
                    <code className="text-foreground font-bold">error: Error | null</code>
                    <span className="text-sm text-muted-foreground">The error object if the last request failed.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h2 id="react-components" className="mt-16">
          Components
        </h2>

        <div className="space-y-12">
          {/* Headless Components */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              Headless Building Blocks
              <span className="text-[10px] uppercase tracking-wider bg-muted text-muted-foreground px-2 py-0.5 rounded-full border border-border">
                Advanced
              </span>
            </h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Use these to build completely custom UI while keeping the context wiring.
            </p>
            <div className="space-y-4">
              <div className="p-4 border border-border rounded-xl bg-card">
                <code className="text-sm font-bold text-primary">&lt;Thumbly.Root&gt;</code>
                <p className="text-xs text-muted-foreground mt-2">
                  Provider component. Accepts all properties of <code>ThumblyConfig</code>.
                </p>
              </div>
              <div className="p-4 border border-border rounded-xl bg-card">
                <code className="text-sm font-bold text-primary">&lt;Thumbly.Option&gt;</code>
                <p className="text-xs text-muted-foreground mt-2">
                  A wrapper around <code>&lt;button&gt;</code>. Automatically handles clicks and disabled states.
                  <br />
                  <strong>Prop:</strong> <code>index: number</code> (Required).
                </p>
              </div>
            </div>
          </div>

          {/* Preset Components */}
          <div>
            <h3 className="text-lg font-bold mb-4">Presets</h3>
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-border bg-muted/30">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  ThumblyBinary / ThumblyStarRating / ThumblyNPS
                </h4>
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-4 font-medium italic">
                  Extends <code>ThumblyConfig</code> plus:
                </p>
                <ul className="space-y-4 m-0 list-none p-0">
                  <li className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                    <code className="text-foreground font-bold font-mono text-sm min-w-[140px]">labels</code>
                    <span className="text-sm text-muted-foreground">
                      <span className="text-muted-foreground/80 font-medium">([ReactNode, ReactNode])</span>: Custom
                      labels for Up/Down options (Binary only).
                    </span>
                  </li>
                  <li className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                    <code className="text-foreground font-bold font-mono text-sm min-w-[140px]">successMessage</code>
                    <span className="text-sm text-muted-foreground">
                      <span className="text-muted-foreground/80 font-medium">(ReactNode)</span>: Message shown after
                      voting.
                    </span>
                  </li>
                  <li className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                    <code className="text-foreground font-bold font-mono text-sm min-w-[140px]">theme</code>
                    <span className="text-sm text-muted-foreground">
                      <span className="text-muted-foreground/80 font-medium">
                        (&apos;base&apos; | &apos;minimal&apos; | &apos;modern&apos;)
                      </span>
                      : Visual preset.
                    </span>
                  </li>
                  <li className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                    <code className="text-foreground font-bold font-mono text-sm min-w-[140px]">className</code>
                    <span className="text-sm text-muted-foreground">
                      <span className="text-muted-foreground/80 font-medium">(string)</span>: Outer wrapper CSS class.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TYPES SECTION --- */}
      <section className="mb-16">
        <h2 id="types">Shared Types</h2>
        <div className="space-y-10">
          <div>
            <h3 className="font-mono text-lg">ThumblyConfig</h3>
            <p className="text-sm text-muted-foreground mt-2 mb-4">
              Configuration used by both <code>ThumblyClient</code> and React components.
            </p>
            <CodeBlock
              code={`type ThumblyConfig = {
  surveyId: string;           // UUID of the survey
  disablePersistence?: boolean; // Skip localStorage check
  onSuccess?: () => void;      // Success callback
  onError?: (e: Error) => void; // Error callback
} & (
  | { driver: ThumblyDriver } // Custom driver instance
  | { supabase: { url: string; key: string } } // Or Supabase credentials
);`}
              language="typescript"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
