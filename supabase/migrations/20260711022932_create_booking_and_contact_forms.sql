create table public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  email text not null,
  care_for text,
  frequency text,
  hospice_status text,
  notes text
);

alter table public.booking_requests enable row level security;

create policy "Anyone can submit a booking request"
  on public.booking_requests
  for insert
  to anon
  with check (true);

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  message text not null
);

alter table public.contact_messages enable row level security;

create policy "Anyone can submit a contact message"
  on public.contact_messages
  for insert
  to anon
  with check (true);
