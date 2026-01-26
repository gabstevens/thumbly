create table surveys (
  id uuid primary key default gen_random_uuid(),
  
  -- The 5 atomic counters
  option_1 int4 default 0,
  option_2 int4 default 0,
  option_3 int4 default 0,
  option_4 int4 default 0,
  option_5 int4 default 0,
  
  last_activity timestamptz default now(),
  owner_id uuid references auth.users(id)
);

-- Enable RLS
alter table surveys enable row level security;

-- Policy: Owner can view/delete
create policy "Developers can see own surveys" 
on surveys for select using (auth.uid() = owner_id);

create or replace function submit_vote(
  survey_id uuid,
  option_index int
)
returns void as $$
begin
  -- Validate Input
  if option_index < 1 or option_index > 5 then
    raise exception 'INVALID_OPTION: Must be 1-5';
  end if;

  -- Atomic Increment & Update Activity
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
$$ language plpgsql security definer;
-- Added security definer to allow public role to update counts without direct write access to table
-- Actually, the design doc says "Public Role: EXECUTE on submit_vote".
-- RLS handles table access. If we use security definer, it bypasses RLS for the function body.
-- If we don't use security definer, the user needs UPDATE privilege on the table, which we don't want.
-- So SECURITY DEFINER is the right way for this "RPC pattern".

grant execute on function submit_vote(uuid, int) to anon, authenticated, service_role;
