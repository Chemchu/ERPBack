-- Enable RLS on the ventas table
alter table public.ventas enable row level security;

-- Create a policy that grants only authenticated access to the ventas table
create policy "Only authenticated users can access ventas" on public.ventas for all -- all means all operations (select, insert, update, delete)
to authenticated -- only authenticated users can access the ventas table
using (true);

-- always true, so authenticated users can access the table