export default function GettingStartedPage() {
  return (
    <div className="prose">
      <h1>Getting Started</h1>
      <p>
        Thumbly is designed to be the fastest way to add sentiment feedback to your React application.
        Follow these steps to get up and running in minutes.
      </p>

      <h2>1. Installation</h2>
      <p>Install the React package using your preferred package manager:</p>
      <pre>
        <code>
npm install @thumbly/react
# or
pnpm add @thumbly/react
        </code>
      </pre>

      <h2>2. Create a Survey</h2>
      <p>
        Go to the <a href="/app">Dashboard</a> to create your first survey. You will get a unique
        <code>surveyId</code> (UUID) which links your frontend component to the database.
      </p>

      <h2>3. Add the Component</h2>
      <p>
        Import a preset component like <code>ThumblyBinary</code> and drop it into your JSX.
      </p>
      <pre>
        <code>
import {"{ ThumblyBinary }"} from "@thumbly/react";

function App() {"{"}
  return (
    &lt;ThumblyBinary
      surveyId="YOUR_SURVEY_ID_HERE"
    /&gt;
  );
{"}"}
        </code>
      </pre>

      <h2>4. Customization (Optional)</h2>
      <p>
        You can customize the styling by passing a <code>className</code> or <code>style</code> prop,
        or build your own UI using the <code>useThumbly</code> hook.
      </p>
    </div>
  );
}
