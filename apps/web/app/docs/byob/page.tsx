import { CodeBlock } from "../../components/CodeBlock";

export default function BYOBPage() {
  const supabaseSQL = `create table surveys (
  id uuid primary key default gen_random_uuid(),
  option_1 int4 default 0,
  option_2 int4 default 0,
  option_3 int4 default 0,
  option_4 int4 default 0,
  option_5 int4 default 0,
  last_activity timestamptz default now()
);

create or replace function submit_vote(
  survey_id uuid,
  option_index int
)
returns void 
language plpgsql 
security definer
as $$
begin
  update surveys 
  set 
    option_1 = case when option_index = 1 then option_1 + 1 else option_1 end,
    option_2 = case when option_index = 2 then option_2 + 1 else option_2 end,
    option_3 = case when option_index = 3 then option_3 + 1 else option_3 end,
    option_4 = case when option_index = 4 then option_4 + 1 else option_4 end,
    option_5 = case when option_index = 5 then option_5 + 1 else option_5 end,
    last_activity = now()
  where id = survey_id;
end;
$$;

grant execute on function submit_vote(uuid, int) to anon, authenticated;`;

  return (
    <>
      <h1>Bring Your Own Backend (BYOB)</h1>
      <p>
        Thumbly is designed to be backend-agnostic. While we provide a managed service, you can easily plug in your own
        infrastructure if you prefer to have full control over your data.
      </p>

      <h2>Option 1: Custom Supabase Project</h2>
      <p>
        If you want to use your own Supabase project, you just need to create the <code>surveys</code> table and the{" "}
        <code>submit_vote</code> RPC function.
      </p>

      <h3>1. SQL Setup</h3>
      <p>Run the following SQL in your Supabase SQL Editor:</p>
      <CodeBlock code={supabaseSQL} language="sql" />

      <h3>2. Client Configuration</h3>
      <p>Pass your project credentials to the Thumbly components:</p>
      <CodeBlock
        code={`
<ThumblyBinary
  surveyId="your-survey-uuid"
  supabase={{
    url: "https://your-project.supabase.co",
    key: "your-anon-key"
  }}
/>`}
        language="tsx"
      />

      <hr className="my-12" />

      <h2>Option 2: Custom API (Any Backend)</h2>
      <p>
        If you are not using Supabase, you can use the <code>FetchDriver</code> or implement a <code>CustomDriver</code>{" "}
        in <code>@thumbly/core</code>.
      </p>

      <h3>Using FetchDriver</h3>
      <p>
        The <code>FetchDriver</code> will send a <code>POST</code> request with a JSON body containing the{" "}
        <code>surveyId</code> and <code>optionIndex</code>.
      </p>
      <CodeBlock
        code={`
import { ThumblyBinary } from "@thumbly/react";
import { FetchDriver } from "@thumbly/core";

// Simple usage
const myDriver = new FetchDriver("https://api.myapp.com/v1/votes");

// Or with optional headers (e.g., Auth)
const secureDriver = new FetchDriver("https://api.myapp.com/v1/votes", {
  "X-Custom-Header": "foo"
});

function App() {
  return (
    <ThumblyBinary 
      surveyId="my-survey" 
      driver={myDriver} 
    />
  );
}`}
        language="tsx"
      />

      <h3 className="mt-12">Using CustomDriver</h3>
      <p>
        If you need complete control over how the vote is submitted (e.g., using an existing SDK or complex logic), use
        the <code>CustomDriver</code>.
      </p>
      <CodeBlock
        code={`
import { ThumblyBinary } from "@thumbly/react";
import { CustomDriver } from "@thumbly/core";

const myDriver = new CustomDriver({
  submitVote: async (payload) => {
    // Implement your own logic here
    console.log("Submitting vote:", payload);
    // await mySdk.track('vote', payload);
  },
  validate: (index) => {
    // Optional: add custom validation logic
    if (index < 1 || index > 2) throw new Error("Invalid index");
  }
});

function App() {
  return (
    <ThumblyBinary 
      surveyId="my-survey" 
      driver={myDriver} 
    />
  );
}`}
        language="tsx"
      />
    </>
  );
}
