import { CodeBlock } from "../../components/CodeBlock";

export default function ApiReferencePage() {
  return (
    <div>
      <h1>API Reference</h1>

      <section className="mb-12">
        <h2>Components</h2>

        <div className="space-y-10">
          <div>
            <h3 className="flex items-center gap-2">
              <code className="text-primary bg-primary/10 px-2 py-1 rounded text-[0.9em]">&lt;ThumblyBinary /&gt;</code>
            </h3>
            <p className="text-muted-foreground mb-4">A simple Up/Down voting component.</p>
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-border bg-muted/30">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Props</h4>
              </div>
              <div className="p-6">
                <ul className="space-y-4 m-0 list-none p-0">
                  <li className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                    <code className="text-foreground font-bold font-mono text-sm min-w-[120px]">surveyId</code>
                    <span className="text-sm text-muted-foreground">
                      <span className="text-primary font-medium">(string, required)</span>: The UUID of the survey.
                    </span>
                  </li>
                  <li className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                    <code className="text-foreground font-bold font-mono text-sm min-w-[120px]">supabaseUrl</code>
                    <span className="text-sm text-muted-foreground">
                      <span className="text-muted-foreground/80 font-medium">(string, optional)</span>: Custom backend
                      URL.
                    </span>
                  </li>
                  <li className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                    <code className="text-foreground font-bold font-mono text-sm min-w-[120px]">supabaseKey</code>
                    <span className="text-sm text-muted-foreground">
                      <span className="text-muted-foreground/80 font-medium">(string, optional)</span>: Custom backend
                      Anon Key.
                    </span>
                  </li>
                  <li className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                    <code className="text-foreground font-bold font-mono text-sm min-w-[120px]">className</code>
                    <span className="text-sm text-muted-foreground">
                      <span className="text-muted-foreground/80 font-medium">(string, optional)</span>: CSS class for
                      the wrapper.
                    </span>
                  </li>
                  <li className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                    <code className="text-foreground font-bold font-mono text-sm min-w-[120px]">style</code>
                    <span className="text-sm text-muted-foreground">
                      <span className="text-muted-foreground/80 font-medium">(CSSProperties, optional)</span>: Inline
                      styles.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-2">
              <code className="text-primary bg-primary/10 px-2 py-1 rounded text-[0.9em]">
                &lt;ThumblyStarRating /&gt;
              </code>
            </h3>
            <p className="text-muted-foreground mb-4">A 5-star rating component.</p>
            <div className="p-4 rounded-xl bg-muted/30 border border-border italic text-sm text-muted-foreground">
              Props are identical to ThumblyBinary.
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-2">
              <code className="text-primary bg-primary/10 px-2 py-1 rounded text-[0.9em]">&lt;ThumblyNPS /&gt;</code>
            </h3>
            <p className="text-muted-foreground mb-4">A Net Promoter Score style component (3 options).</p>
            <div className="p-4 rounded-xl bg-muted/30 border border-border italic text-sm text-muted-foreground">
              Props are identical to ThumblyBinary.
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2>Hooks</h2>

        <div className="space-y-10">
          <div>
            <h3 className="flex items-center gap-2">
              <code className="text-primary bg-primary/10 px-2 py-1 rounded text-[0.9em]">useThumbly(config)</code>
            </h3>
            <p className="text-muted-foreground mb-6">The core hook for building custom UI.</p>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold mb-3 uppercase tracking-wider text-foreground">
                  Configuration Object
                </h4>
                <CodeBlock
                  code={`{
  surveyId: string;
  supabaseUrl?: string;
  supabaseKey?: string;
  driver?: ThumblyDriver; // Advanced: Custom driver
}`}
                  language="typescript"
                />
              </div>

              <div>
                <h4 className="text-sm font-bold mb-3 uppercase tracking-wider text-foreground">Return Object</h4>
                <div className="bg-card border border-border rounded-2xl p-6">
                  <ul className="space-y-4 m-0 list-none p-0">
                    <li className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                      <code className="text-foreground font-bold font-mono text-sm min-w-[150px]">vote(index)</code>
                      <span className="text-sm text-muted-foreground">Function to submit a vote (1-5).</span>
                    </li>
                    <li className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                      <code className="text-foreground font-bold font-mono text-sm min-w-[150px]">isLoading</code>
                      <span className="text-sm text-muted-foreground">Boolean indicating network state.</span>
                    </li>
                    <li className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                      <code className="text-foreground font-bold font-mono text-sm min-w-[150px]">error</code>
                      <span className="text-sm text-muted-foreground">Error object or null.</span>
                    </li>
                    <li className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                      <code className="text-foreground font-bold font-mono text-sm min-w-[150px]">hasVoted</code>
                      <span className="text-sm text-muted-foreground">
                        True if the user has already voted for this survey.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
