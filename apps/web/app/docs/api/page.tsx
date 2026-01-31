export default function ApiReferencePage() {
  return (
    <div className="prose">
      <h1>API Reference</h1>

      <h2>Components</h2>

      <h3>
        <code>&lt;ThumblyBinary /&gt;</code>
      </h3>
      <p>A simple Up/Down voting component.</p>
      <ul>
        <li>
          <code>surveyId</code> (string, required): The UUID of the survey.
        </li>
        <li>
          <code>supabaseUrl</code> (string, optional): Custom backend URL.
        </li>
        <li>
          <code>supabaseKey</code> (string, optional): Custom backend Anon Key.
        </li>
        <li>
          <code>className</code> (string, optional): CSS class for the wrapper.
        </li>
        <li>
          <code>style</code> (CSSProperties, optional): Inline styles.
        </li>
      </ul>

      <h3>
        <code>&lt;ThumblyStarRating /&gt;</code>
      </h3>
      <p>A 5-star rating component.</p>
      <p>
        <em>Props are identical to ThumblyBinary.</em>
      </p>

      <h3>
        <code>&lt;ThumblyNPS /&gt;</code>
      </h3>
      <p>
        A Net Promoter Score (1-10) style component (simplified to 3 options: Detractor, Passive, Promoter for this
        version).
      </p>
      <p>
        <em>Props are identical to ThumblyBinary.</em>
      </p>

      <h2>Hooks</h2>

      <h3>
        <code>useThumbly(config)</code>
      </h3>
      <p>The core hook for building custom UI.</p>

      <h4>Configuration Object</h4>
      <pre>
        <code>
          {`{
  surveyId: string;
  supabaseUrl?: string;
  supabaseKey?: string;
  driver?: ThumblyDriver; // Advanced: Custom driver
}`}
        </code>
      </pre>

      <h4>Return Object</h4>
      <ul>
        <li>
          <code>vote(optionIndex: number)</code>: Function to submit a vote (1-5).
        </li>
        <li>
          <code>isLoading</code>: boolean.
        </li>
        <li>
          <code>error</code>: Error | null.
        </li>
        <li>
          <code>hasVoted</code>: boolean. Returns true if the user has already voted.
        </li>
      </ul>
    </div>
  );
}
