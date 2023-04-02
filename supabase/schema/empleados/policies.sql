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
  insert into public.empleados (id, nombre, apellidos, email)
  values (new.id, new.email, new.email, new.email);
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after update on auth.users
  for each row 
  when (NEW.confirmed_at IS NOT NULL AND OLD.confirmed_at IS NULL) -- ---> Puede que de error esto
  execute procedure public.handle_nuevo_empleado();
