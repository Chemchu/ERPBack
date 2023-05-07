-- Enable RLS on productos table
alter table public.productos enable row level security;

-- Create a policy that grants only authenticated access to the productos table
create policy "Only authenticated users can access productos table." on public.productos for all to authenticated using (true);