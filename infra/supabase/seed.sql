-- Seed data for Thumbly

-- 1. Create a Test User
-- Email: test@test.com
-- Password: 1234asdf
-- Note: Supabase local development requires pgcrypto for crypt()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO auth.users (
  id, 
  instance_id,
  aud,
  role,
  email, 
  encrypted_password, 
  email_confirmed_at, 
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data, 
  raw_user_meta_data, 
  created_at, 
  updated_at, 
  confirmation_token, 
  email_change, 
  email_change_token_new, 
  recovery_token
)
VALUES (
  'd7b3a2a1-1234-4321-abcd-000000000000', 
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'test@test.com', 
  crypt('1234asdf', gen_salt('bf')), 
  now(), 
  now(),
  now(),
  '{"provider":"email","providers":["email"]}', 
  '{}', 
  now(), 
  now(), 
  '', 
  '', 
  '', 
  ''
) ON CONFLICT (id) DO UPDATE SET 
  encrypted_password = EXCLUDED.encrypted_password,
  email_confirmed_at = EXCLUDED.email_confirmed_at,
  raw_app_meta_data = EXCLUDED.raw_app_meta_data,
  raw_user_meta_data = EXCLUDED.raw_user_meta_data,
  updated_at = now();

-- test user email identities
-- The unique constraint in auth.identities is typically (provider, provider_id)
INSERT INTO auth.identities (
  id,
  user_id,
  provider_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
)
VALUES (
  gen_random_uuid(), 
  'd7b3a2a1-1234-4321-abcd-000000000000', 
  'd7b3a2a1-1234-4321-abcd-000000000000',
  format('{"sub":"%s","email":"%s"}', 'd7b3a2a1-1234-4321-abcd-000000000000', 'test@test.com')::jsonb, 
  'email', 
  now(), 
  now(), 
  now()
) ON CONFLICT (provider, provider_id) DO UPDATE SET
  identity_data = EXCLUDED.identity_data,
  last_sign_in_at = EXCLUDED.last_sign_in_at,
  updated_at = EXCLUDED.updated_at;


-- 2. Dogfooding Survey for the Landing Page
-- UUID: 5468756d-626c-7930-0000-000000000000 (Hex-ish for Thumbly0)
-- Now associated with the test user
insert into public.surveys (id, option_1, option_2, option_3, option_4, option_5, owner_id)
values 
  ('5468756d-626c-7930-0000-000000000000', 0, 0, 0, 0, 0, 'd7b3a2a1-1234-4321-abcd-000000000000')
on conflict (id) DO UPDATE SET 
  owner_id = EXCLUDED.owner_id,
  option_1 = EXCLUDED.option_1,
  option_2 = EXCLUDED.option_2,
  option_3 = EXCLUDED.option_3,
  option_4 = EXCLUDED.option_4,
  option_5 = EXCLUDED.option_5;


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