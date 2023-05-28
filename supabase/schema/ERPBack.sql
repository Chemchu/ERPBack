CREATE TABLE "inventarios" (
  "id" uuid PRIMARY KEY,
  "producto_id" uuid NOT NULL,
  "tienda_id" uuid NOT NULL,
  "empleado_id" uuid,
  "cantidad" integer NOT NULL DEFAULT 0,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "proveedores" (
  "id" uuid PRIMARY KEY NOT NULL,
  "nombre" text NOT NULL,
  "nif" text UNIQUE NOT NULL,
  "email_id" uuid UNIQUE,
  "telefono_id" uuid UNIQUE,
  "direccion_id" uuid
);

CREATE TABLE "pedidos" (
  "id" uuid PRIMARY KEY NOT NULL,
  "proveedor_id" uuid NOT NULL,
  "tienda_id" uuid NOT NULL,
  "numer_factura" text NOT NULL,
  "fecha_creacion" timestamptz NOT NULL,
  "fecha_recepcion" timestamptz NOT NULL,
  "created_at" timestamptz NOT NULL
);

CREATE TABLE "productos_pedidos" (
  "id" uuid PRIMARY KEY NOT NULL,
  "pedido_id" uuid NOT NULL,
  "producto_id" uuid NOT NULL,
  "precio_compra" numeric NOT NULL,
  "cantidad_pedida" numeric NOT NULL,
  "cantdad_recibida" numeric NOT NULL
);

CREATE TABLE "productos" (
  "id" uuid PRIMARY KEY NOT NULL,
  "tienda_id" uuid NOT NULL,
  "nombre" text UNIQUE NOT NULL,
  "familia" text NOT NULL,
  "iva" numeric NOT NULL,
  "precio_compra" numeric NOT NULL,
  "precio_venta" numeric NOT NULL,
  "cantidad" numeric NOT NULL,
  "alta" boolean NOT NULL DEFAULT true,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL
);

CREATE TABLE "codigos_de_barra" (
  "codigo" text UNIQUE PRIMARY KEY NOT NULL,
  "producto_id" uuid NOT NULL,
  "created_at" timestamptz NOT NULL,
  "updated_at" timestamptz NOT NULL
);

CREATE TABLE "productos_mermados" (
  "id" uuid PRIMARY KEY NOT NULL,
  "producto_id" uuid NOT NULL,
  "empleado_id" uuid NOT NULL,
  "iva" numeric NOT NULL,
  "precio_compra" numeric NOT NULL,
  "precio_venta" numeric NOT NULL,
  "cantidad_mermada" integer NOT NULL DEFAULT 1,
  "motivo" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "productos_devueltos" (
  "id" uuid PRIMARY KEY NOT NULL,
  "cantidad_devuelta" integer NOT NULL DEFAULT 0,
  "iva" numeric NOT NULL,
  "precio_compra" numeric NOT NULL,
  "precio_venta" numeric NOT NULL,
  "descuento" numeric NOT NULL DEFAULT 0
);

CREATE TABLE "ofertas" (
  "id" uuid PRIMARY KEY NOT NULL,
  "producto_id" uuid NOT NULL,
  "nombre" text NOT NULL,
  "cantidad_para_ofertar" integer NOT NULL,
  "precio_oferta" numeric NOT NULL
);

CREATE TABLE "tiendas" (
  "id" uuid PRIMARY KEY NOT NULL,
  "empresa_id" uuid NOT NULL,
  "direccion_id" uuid NOT NULL,
  "nombre" text UNIQUE NOT NULL
);

CREATE TABLE "empresas" (
  "id" uuid PRIMARY KEY NOT NULL,
  "nombre" text NOT NULL,
  "nif" text UNIQUE NOT NULL,
  "ceo_id" uuid NOT NULL,
  "antiguedad" timestamptz NOT NULL,
  "razon_social" text
);

CREATE TABLE "empleados_tiendas" (
  "tienda_id" uuid,
  "empleado_id" uuid,
  PRIMARY KEY ("tienda_id", "empleado_id")
);

CREATE TABLE "terminales_de_ventas" (
  "id" uuid PRIMARY KEY NOT NULL,
  "tienda_id" uuid NOT NULL,
  "nombre" text UNIQUE NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "empleados" (
  "id" uuid PRIMARY KEY NOT NULL,
  "nombre" text NOT NULL,
  "apellidos" text NOT NULL,
  "username" text UNIQUE NOT NULL,
  "nif" text UNIQUE NOT NULL,
  "rol" text NOT NULL,
  "descripcion" text,
  "fecha_nacimiento" timestamptz,
  "fecha_alta" timestamptz,
  "fecha_baja" timestamptz,
  "email_id" uuid UNIQUE NOT NULL,
  "telefono_id" uuid UNIQUE,
  "pais_id" uuid
);

CREATE TABLE "paises" (
  "id" uuid PRIMARY KEY NOT NULL,
  "nombre" text UNIQUE NOT NULL,
  "nacionalidad" text NOT NULL,
  "codigo2" text UNIQUE NOT NULL,
  "codigo3" text UNIQUE NOT NULL
);

CREATE TABLE "telefonos" (
  "id" uuid PRIMARY KEY NOT NULL,
  "entidad_id" uuid NOT NULL,
  "valor" text NOT NULL
);

CREATE TABLE "emails" (
  "id" uuid PRIMARY KEY NOT NULL,
  "entidad_id" uuid NOT NULL,
  "valor" text NOT NULL
);

CREATE TABLE "productos_vendidos" (
  "id" uuid PRIMARY KEY NOT NULL,
  "producto_id" uuid NOT NULL,
  "venta_id" uuid NOT NULL,
  "cantidad_vendida" integer NOT NULL,
  "iva" numeric NOT NULL,
  "precio_compra" numeric NOT NULL,
  "precio_venta" numeric NOT NULL,
  "descuento" numeric NOT NULL DEFAULT 0
);

CREATE TABLE "ofertas_aplicadas" (
  "oferta_aplicada_id" uuid PRIMARY KEY NOT NULL,
  "producto_vendido_id" uuid NOT NULL,
  "nombre" text NOT NULL,
  "cantidad_para_ofertar" integer NOT NULL,
  "precio_oferta" numeric NOT NULL,
  "cantidad_ofertas_aplicadas" integer NOT NULL DEFAULT 1
);

CREATE TABLE "ofertas_devueltas" (
  "oferta_devuelta_id" uuid PRIMARY KEY NOT NULL,
  "producto_devuelto_id" uuid NOT NULL,
  "nombre" text NOT NULL,
  "cantidad_para_ofertar" integer NOT NULL,
  "precio_oferta" numeric NOT NULL,
  "cantidad_ofertas_devueltas" integer NOT NULL DEFAULT 0
);

CREATE TABLE "ventas" (
  "id" uuid PRIMARY KEY NOT NULL,
  "cierre_id" uuid NOT NULL,
  "empleado_id" uuid NOT NULL,
  "cliente_id" uuid NOT NULL,
  "pagado_efectivo" numeric NOT NULL,
  "pagado_tarjeta" numeric NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "clientes" (
  "id" uuid PRIMARY KEY NOT NULL,
  "nombre" text NOT NULL,
  "apellidos" text NOT NULL,
  "nif" text UNIQUE NOT NULL,
  "direccion" text NOT NULL,
  "codigo_postal" text NOT NULL,
  "email_id" uuid,
  "telefono_id" uuid 
);

CREATE TABLE "cierres" (
  "id" uuid PRIMARY KEY NOT NULL,
  "terminal_id" uuid NOT NULL,
  "empleado_id" uuid NOT NULL,
  "dinero_inicial" numeric NOT NULL,
  "dinero_final" numeric NOT NULL,
  "dinero_retirado" numeric NOT NULL,
  "dinero_dejado" numeric NOT NULL,
  "fecha_apertura" timestamptz NOT NULL DEFAULT (now()),
  "fecha_cierre" timestamptz,
  "en_uso" boolean NOT NULL
);

CREATE UNIQUE INDEX ON "ventas" ("id", "empleado_id", "cierre_id");

CREATE UNIQUE INDEX ON "cierres" ("id", "empleado_id", "terminal_id");

ALTER TABLE "pedidos" ADD FOREIGN KEY ("proveedor_id") REFERENCES "proveedores" ("id");

ALTER TABLE "productos_pedidos" ADD FOREIGN KEY ("pedido_id") REFERENCES "pedidos" ("id");

ALTER TABLE "codigos_de_barra" ADD FOREIGN KEY ("producto_id") REFERENCES "productos" ("id");

ALTER TABLE "terminales_de_ventas" ADD FOREIGN KEY ("tienda_id") REFERENCES "tiendas" ("id");

ALTER TABLE "empleados" ADD FOREIGN KEY ("pais_id") REFERENCES "paises" ("id");

ALTER TABLE "telefonos" ADD FOREIGN KEY ("entidad_id") REFERENCES "tiendas" ("id");

ALTER TABLE "emails" ADD FOREIGN KEY ("entidad_id") REFERENCES "tiendas" ("id");

ALTER TABLE "cierres" ADD FOREIGN KEY ("terminal_id") REFERENCES "terminales_de_ventas" ("id");

ALTER TABLE "ventas" ADD FOREIGN KEY ("cierre_id") REFERENCES "cierres" ("id");

ALTER TABLE "productos_vendidos" ADD FOREIGN KEY ("venta_id") REFERENCES "ventas" ("id");

ALTER TABLE "emails" ADD FOREIGN KEY ("id") REFERENCES "empleados" ("email_id");

ALTER TABLE "telefonos" ADD FOREIGN KEY ("id") REFERENCES "empleados" ("telefono_id");

ALTER TABLE "empleados_tiendas" ADD FOREIGN KEY ("empleado_id") REFERENCES "empleados" ("id");

ALTER TABLE "empleados_tiendas" ADD FOREIGN KEY ("tienda_id") REFERENCES "tiendas" ("id");

ALTER TABLE "tiendas" ADD FOREIGN KEY ("empresa_id") REFERENCES "empresas" ("id");

ALTER TABLE "inventarios" ADD FOREIGN KEY ("producto_id") REFERENCES "productos" ("id");

ALTER TABLE "inventarios" ADD FOREIGN KEY ("tienda_id") REFERENCES "tiendas" ("id");

ALTER TABLE "pedidos" ADD FOREIGN KEY ("tienda_id") REFERENCES "tiendas" ("id");

ALTER TABLE "productos_devueltos" ADD FOREIGN KEY ("id") REFERENCES "productos_vendidos" ("id");

ALTER TABLE "ofertas_devueltas" ADD FOREIGN KEY ("producto_devuelto_id") REFERENCES "productos_devueltos" ("id");

ALTER TABLE "ofertas_aplicadas" ADD FOREIGN KEY ("producto_vendido_id") REFERENCES "productos_vendidos" ("id");

ALTER TABLE "productos" ADD FOREIGN KEY ("tienda_id") REFERENCES "tiendas" ("id");

ALTER TABLE "productos_pedidos" ADD FOREIGN KEY ("producto_id") REFERENCES "productos" ("id");

ALTER TABLE "ofertas" ADD FOREIGN KEY ("producto_id") REFERENCES "productos" ("id");

ALTER TABLE "productos_mermados" ADD FOREIGN KEY ("producto_id") REFERENCES "productos" ("id");

ALTER TABLE "productos_vendidos" ADD FOREIGN KEY ("producto_id") REFERENCES "productos" ("id");

ALTER TABLE "emails" ADD FOREIGN KEY ("id") REFERENCES "proveedores" ("email_id");

ALTER TABLE "telefonos" ADD FOREIGN KEY ("id") REFERENCES "proveedores" ("telefono_id");

ALTER TABLE "ventas" ADD FOREIGN KEY ("cliente_id") REFERENCES "clientes" ("id");

-- Enable RLS on clientes table
alter table public.clientes enable row level security;
-- Create a policy that grants only authenticated access to the clientes table
create policy "Only authenticated users can access clientes table." on public.clientes for all to authenticated using (true);

-- Enable RLS on productos table
alter table public.productos enable row level security;
-- Create a policy that grants only authenticated access to the productos table
create policy "Only authenticated users can access productos table." on public.productos for all to authenticated using (true);

-- Enable RLS on codigos_de_barra table
alter table public.codigos_de_barra enable row level security;
-- Create a policy that grants only authenticated access to the codigos_de_barra table
create policy "Only authenticated users can access codigos_de_barra table." on public.codigos_de_barra for all to authenticated using (true);

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

-- Enable RLS on the ventas table
alter table public.ventas enable row level security;
-- Create a policy that grants only authenticated access to the ventas table
create policy "Only authenticated users can access ventas" on public.ventas for all -- all means all operations (select, insert, update, delete)
to authenticated -- only authenticated users can access the ventas table
using (true);

-- Enable RLS on the cierres table
alter table public.cierres enable row level security;
-- Create a policy that grants only authenticated access to the cierres table
create policy "Only authenticated users can access cierres" on public.cierres for all -- all means all operations (select, insert, update, delete)
to authenticated -- only authenticated users can access the cierres table
using (true);

-- Enable RLS on terminales_de_ventas table
alter table public.terminales_de_ventas enable row level security;
-- Create a policy that grants only authenticated access to the terminales_de_ventas table
create policy "Only authenticated users can access terminales_de_ventas table." on public.terminales_de_ventas for all to authenticated using (true);

-- Bucket policies
insert into storage.buckets
  (id, name)
values
  ('avatars', 'avatars');
(bucket_id = 'avatars'::text)


alter table public.empleados
  enable row level security;

create policy "Los empleados son visibles por todos." on empleados
  for select using (true);

create policy "Los empleados pueden insertar en sus propios perfiles." on empleados
  for insert with check (auth.uid() = id);

create policy "Los usuarios pueden actualizar sus propios perfiles." on empleados
  for update using (auth.uid() = id);

-- Enable RLS on proveedores table
alter table public.proveedores enable row level security;
-- Create a policy that grants only authenticated access to the proveedores table
create policy "Only authenticated users can access proveedores table." on public.proveedores for all to authenticated using (true);

-- Enable RLS on the clientes table
alter table public.clientes enable row level security;
-- Create a policy that grants only authenticated access to the clientes table
create policy "Only authenticated users can access clientes" on public.clientes for all -- all means all operations (select, insert, update, delete)
to authenticated -- only authenticated users can access the clientes table
using (true);

-- Enable RLS on inventarios table
alter table public.inventarios enable row level security;
-- Create a policy that grants only authenticated access to the inventarios table
create policy "Only authenticated users can access inventarios table." on public.inventarios for all to authenticated using (true);

-- Enable RLS on pedidos table
alter table public.pedidos enable row level security;
-- Create a policy that grants only authenticated access to the pedidos table
create policy "Only authenticated users can access pedidos table." on public.pedidos for all to authenticated using (true);

-- Enable RLS on productos_pedidos table
alter table public.productos_pedidos enable row level security;
-- Create a policy that grants only authenticated access to the productos_pedidos table
create policy "Only authenticated users can access productos_pedidos table." on public.productos_pedidos for all to authenticated using (true);

-- Enable RLS on ofertas table
alter table public.ofertas enable row level security;
-- Create a policy that grants only authenticated access to the ofertas table
create policy "Only authenticated users can access ofertas table." on public.ofertas for all to authenticated using (true);

-- Enable RLS on tiendas table
alter table public.tiendas enable row level security;
-- Create a policy that grants only authenticated access to the tiendas table
create policy "Only authenticated users can access tiendas table." on public.tiendas for all to authenticated using (true);

-- Enable RLS on empresas table
alter table public.empresas enable row level security;
-- Create a policy that grants only authenticated access to the empresas table
create policy "Only authenticated users can access empresas table." on public.empresas for all to authenticated using (true);

-- Enable RLS on empleados_tiendas table
alter table public.empleados_tiendas enable row level security;
-- Create a policy that grants only authenticated access to the empleados_tiendas table
create policy "Only authenticated users can access empleados_tiendas table." on public.empleados_tiendas for all to authenticated using (true);

-- Enable RLS on paises table
alter table public.paises enable row level security;
-- Create a policy that grants only authenticated access to the paises table
create policy "Only authenticated users can access paises table." on public.paises for all to authenticated using (true);

-- Enable RLS on telefonos table
alter table public.telefonos enable row level security;
-- Create a policy that grants only authenticated access to the telefonos table
create policy "Only authenticated users can access telefonos table." on public.telefonos for all to authenticated using (true);

-- Enable RLS on emails table
alter table public.emails enable row level security;
-- Create a policy that grants only authenticated access to the emails table
create policy "Only authenticated users can access emails table." on public.emails for all to authenticated using (true);

-- Enable RLS on ofertas_aplicadas table
alter table public.ofertas_aplicadas enable row level security;
-- Create a policy that grants only authenticated access to the ofertas_aplicadas table
create policy "Only authenticated users can access ofertas_aplicadas table." on public.ofertas_aplicadas for all to authenticated using (true);

-- Enable RLS on ofertas_devueltas table
alter table public.ofertas_devueltas enable row level security;
-- Create a policy that grants only authenticated access to the ofertas_devueltas table
create policy "Only authenticated users can access ofertas_devueltas table." on public.ofertas_devueltas for all to authenticated using (true);

create function public.handle_new_user()
returns trigger as $$
declare 
  email_id uuid;
  new_id uuid;
begin
  new_id := uuid_generate_v4();

  insert into emails (id, entidad_id, valor) values (new_id, NEW.id, NEW.email)
  returning id into email_id
  IF NOT EXISTS (SELECT 1 FROM public.empleados) THEN
    INSERT INTO public.empleados (id, nombre, apellidos, email_id, rol, username, nif)
    VALUES (NEW.id, 'Admin', 'Admin', email_id, 'Administrador', 'Administrador', 'Administrador');
  ELSE
    insert into public.empleados (id, nombre, apellidos, email_id, rol, username, nif)
    values (new.id, new.raw_user_meta_data->>'nombre'::TEXT, new.raw_user_meta_data->>'apellidos'::TEXT, email_id, new.raw_user_meta_data->>'rol'::TEXT,
    new.raw_user_meta_data->>'username'::TEXT, new.raw_user_meta_data->>'dni'::TEXT);
  END if;
  return new;
end;
$$ language plpgsql security definer;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT
    ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();