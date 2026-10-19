alter table public.payments
  add column email text check (email is null or char_length(email) <= 255),
  add column city text check (city is null or char_length(city) <= 100),
  add column learn_goal text check (learn_goal is null or char_length(learn_goal) <= 1000);