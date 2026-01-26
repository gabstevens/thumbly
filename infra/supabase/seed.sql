-- Seed data for Thumbly

-- 1. Dogfooding Survey for the Landing Page
-- UUID: 5468756d-626c-7930-0000-000000000000 (Hex-ish for Thumbly0)
insert into public.surveys (id, option_1, option_2, option_3, option_4, option_5, owner_id)
values 
  ('5468756d-626c-7930-0000-000000000000', 0, 0, 0, 0, 0, null)
on conflict (id) do nothing;
