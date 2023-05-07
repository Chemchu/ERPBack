-- Enable RLS on productos table
alter table public.productos enable row level security;
-- Create a policy that grants only authenticated access to the productos table
create policy "Only authenticated users can access productos table." on public.productos for all to authenticated using (true);

-- Enable RLS on codigos_de_barra table
alter table public.codigos_de_barra enable row level security;
-- Create a policy that grants only authenticated access to the codigos_de_barra table
create policy "Only authenticated users can access codigos_de_barra table." on public.codigos_de_barra for all to authenticated using (true);

-- Enable RLS on devoluciones table
alter table public.devoluciones enable row level security;
-- Create a policy that grants only authenticated access to the devoluciones table
create policy "Only authenticated users can access devoluciones table." on public.devoluciones for all to authenticated using (true);

-- Enable RLS on mermas table
alter table public.mermas enable row level security;
-- Create a policy that grants only authenticated access to the mermas table
create policy "Only authenticated users can access mermas table." on public.mermas for all to authenticated using (true);

-- Enable RLS on productos_devueltos table
alter table public.productos_devueltos enable row level security;
-- Create a policy that grants only authenticated access to the productos_devueltos table
create policy "Only authenticated users can access productos_devueltos table." on public.productos_devueltos for all to authenticated using (true);

-- Enable RLS on productos_mermados table
alter table public.productos_mermados enable row level security;
-- Create a policy that grants only authenticated access to the productos_mermados table
create policy "Only authenticated users can access productos_mermados table." on public.productos_mermados for all to authenticated using (true);

-- Enable RLS on productos_vendidos table
alter table public.productos_vendidos enable row level security;
-- Create a policy that grants only authenticated access to the productos_vendidos table
create policy "Only authenticated users can access productos_vendidos table." on public.productos_vendidos for all to authenticated using (true);