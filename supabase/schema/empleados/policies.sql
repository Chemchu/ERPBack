alter table empleados
  enable row level security;

create policy "Los empleados son visibles por todos." on empleados
  for select using (true);

create policy "Los empleados pueden insertar en sus propios perfiles." on empleados
  for insert with check (auth.uid() = id);

create policy "Los usuarios pueden actualizar sus propios perfiles." on empleados
  for update using (auth.uid() = id);

create function public.handle_new_user()
returns trigger as $$
begin
  IF NOT EXISTS (SELECT 1 FROM public.empleados) THEN
    INSERT INTO public.empleados (id, nombre, apellidos, email, rol)
    VALUES (NEW.id, 'Admin', 'Admin', NEW.email, 'Administrador');
  ELSE
    insert into public.empleados (id, nombre, apellidos, email, rol, dni)
    values (new.id, new.raw_user_meta_data->>'nombre'::TEXT, new.raw_user_meta_data->>'apellidos'::TEXT, new.email, new.raw_user_meta_data->>'rol'::TEXT, new.raw_user_meta_data->>'dni'::TEXT);
  END if;
  return new;
end;
$$ language plpgsql security definer;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT
    ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();
-- create trigger on_auth_user_created
--   after update on auth.users
--   for each row 
--   when (NEW.confirmed_at IS NOT NULL AND OLD.confirmed_at IS NULL) -- ---> Puede que de error esto
--   execute procedure public.handle_nuevo_empleado();
