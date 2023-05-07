-- Enable RLS on the ventas table
alter table public.ventas enable row level security;

-- Create a policy that grants only authenticated access to the ventas table
create policy "Only authenticated users can access ventas" on public.ventas for all -- all means all operations (select, insert, update, delete)
to authenticated -- only authenticated users can access the ventas table
using (true);

-- Enable RLS on ventas_devueltas table
alter table public.ventas_devueltas enable row level security;
-- Create a policy that grants only authenticated access to the ventas_devueltas table
create policy "Only authenticated users can access ventas_devueltas table." on public.ventas_devueltas for all to authenticated using (true);

-- Enable RLS on the cierres table
alter table public.cierres enable row level security;

-- Create a policy that grants only authenticated access to the cierres table
create policy "Only authenticated users can access cierres" on public.cierres for all -- all means all operations (select, insert, update, delete)
to authenticated -- only authenticated users can access the cierres table
using (true);

-- Enable RLS on tpvs table
alter table public.tpvs enable row level security;
-- Create a policy that grants only authenticated access to the tpvs table
create policy "Only authenticated users can access tpvs table." on public.tpvs for all to authenticated using (true);