-- Seed data for Thumbly

-- 1. Create a Test User
-- Email: test@test.com
-- Password: 1234asdf
-- Note: Supabase local development requires pgcrypto for crypt()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO auth.users (
  id, 
  instance_id,
  email, 
  encrypted_password, 
  email_confirmed_at, 
  raw_app_meta_data, 
  raw_user_meta_data, 
  created_at, 
  updated_at, 
  role, 
  confirmation_token, 
  email_change, 
  email_change_token_new, 
  recovery_token
)
VALUES (
  'd7b3a2a1-1234-4321-abcd-000000000000', 
  '00000000-0000-0000-0000-000000000000',
  'test@test.com', 
  crypt('1234asdf', gen_salt('bf')), 
  now(), 
  '{"provider":"email","providers":["email"]}', 
  '{}', 
  now(), 
  now(), 
  'authenticated', 
  '', 
  '', 
  '', 
  ''
) ON CONFLICT (id) DO NOTHING;

-- Also need to insert into auth.identities if we want them to be able to log in normally
INSERT INTO auth.identities (
  id, 
  user_id, 
  identity_data, 
  provider, 
  provider_id,
  last_sign_in_at, 
  created_at, 
  updated_at
)
VALUES (
  gen_random_uuid(), 
  'd7b3a2a1-1234-4321-abcd-000000000000', 
  format('{"sub":"%s","email":"%s"}', 'd7b3a2a1-1234-4321-abcd-000000000000', 'test@test.com')::jsonb, 
  'email', 
  'd7b3a2a1-1234-4321-abcd-000000000000',
  now(), 
  now(), 
  now()
) ON CONFLICT (id) DO NOTHING;


-- 2. Dogfooding Survey for the Landing Page
-- UUID: 5468756d-626c-7930-0000-000000000000 (Hex-ish for Thumbly0)
-- Now associated with the test user
insert into public.surveys (id, option_1, option_2, option_3, option_4, option_5, owner_id)
values 
  ('5468756d-626c-7930-0000-000000000000', 0, 0, 0, 0, 0, 'd7b3a2a1-1234-4321-abcd-000000000000')
on conflict (id) do update set owner_id = EXCLUDED.owner_id;


-- 3. Binary Survey Demo
insert into public.surveys (id, option_1, option_2, owner_id)
values 
  (gen_random_uuid(), 42, 7, 'd7b3a2a1-1234-4321-abcd-000000000000');


-- 4. Star Rating Survey Demo
insert into public.surveys (id, option_1, option_2, option_3, option_4, option_5, owner_id)
values 
  (gen_random_uuid(), 5, 12, 34, 89, 156, 'd7b3a2a1-1234-4321-abcd-000000000000');


-- 5. NPS Survey Demo
insert into public.surveys (id, option_1, option_2, option_3, owner_id)
values 
  (gen_random_uuid(), 15, 25, 140, 'd7b3a2a1-1234-4321-abcd-000000000000');