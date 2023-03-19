alter table empleados
  enable row level security;

create policy "Los empleados son visibles por todos." on empleados
  for select using (true);

create policy "Los empleados pueden insertar en sus propios perfiles." on empleados
  for insert with check (auth.uid() = id);

create policy "Los usuarios pueden actualizar sus propios perfiles." on empleados
  for update using (auth.uid() = id);

create function public.handle_nuevo_empleado()
returns trigger as $$
begin
  insert into public.empleados (id, nombre, apellidos)
  values (new.id, new.raw_user_meta_data->>'nombre', new.raw_user_meta_data->>'apellidos');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_nuevo_empleado();
