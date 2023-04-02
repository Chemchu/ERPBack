create schema if not exists public;

create table public.empleados (
  id uuid references auth.users on delete cascade not null primary key default uuid_generate_v4(),
  nombre text not null,
  apellidos text not null,
  email text unique not null,
  dni text unique,
  rol text,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,

  constraint nombre_length check (char_length(nombre) >= 3),
  CONSTRAINT proper_email CHECK (email ~* '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$')
);

create table public.tpvs (
  id uuid default uuid_generate_v4() primary key,
  nombre text not null,
  libre boolean not null,
  created_at timestamp default now() not null,
  usado_por_id uuid references public.empleados (id),
  abierto_por_id uuid references public.empleados (id),
  caja_inicial real not null
);

create table public.direcciones (
  id uuid default uuid_generate_v4() primary key,
  calle text not null,
  codigo_postal text not null,
  telefono text,
  created_at timestamp default now() not null
);

create table public.mermas (
  id uuid default uuid_generate_v4() primary key,
  empleado_id uuid references public.empleados (id) not null,
  coste_productos real not null,
  ventas_perdidas real not null,
  beneficio_perdido real not null,
  created_at timestamp default now() not null
);

create table public.cierres (
  tpv_id uuid references public.tpvs (id) not null,
  caja_inicial real not null,
  caja_final real not null,
  ventas_efectivo real not null,
  ventas_tarjeta real not null,
  dinero_esperado_en_caja real not null,
  dinero_real_en_caja real not null,
  dinero_retirado_de_caja real not null,
  dinero_dejado_en_caja real not null,
  fecha_apertura timestamp default now() not null,
  fecha_cierre timestamp default now() not null,
  id uuid default uuid_generate_v4() primary key
);

create table public.clientes (
  id uuid default uuid_generate_v4() primary key,
  nombre text not null,
  nif text not null,
  created_at timestamp default now() not null,
  direccion_id uuid references public.direcciones (id) not null
);

create table public.proveedores (
  id uuid default uuid_generate_v4() primary key,
  nombre text not null,
  cif text not null,
  direccion uuid references public.direcciones (id) not null,
  created_at timestamp default now() not null
);

create table public.ventas_devueltas (
  id uuid default uuid_generate_v4() primary key,
  numero_factura bigint not null,
  dinero_efectivo real not null,
  dinero_tarjeta real not null,
  precio_venta_total real not null,
  precio_venta_pagado real not null,
  cambio real not null,
  cliente_id uuid references public.clientes (id) not null,
  vendedor_id uuid references public.empleados (id) not null,
  tipo_pago text not null,
  descuento_valor real not null,
  descuento_porcentaje real not null,
  tpv_id uuid references public.tpvs (id) not null,
  created_at timestamp default now() not null
);

create table public.productos (
  nombre text not null,
  familia text,
  alta boolean not null,
  cantidad smallint not null,
  created_at timestamp default now() not null,
  id uuid default uuid_generate_v4() primary key,
  precio_compra real not null,
  precio_venta real not null,
  iva real not null,
  margen real not null,
  proveedor_id uuid references public.proveedores (id)
);

create table public.devoluciones (
  id uuid default uuid_generate_v4() primary key,
  venta_original_id uuid references public.ventas_devueltas (id) not null,
  dinero_devuelto real not null,
  tpv_id uuid references public.tpvs (id) not null,
  cliente_id uuid references public.clientes (id),
  empleado_id uuid references public.empleados (id) not null,
  created_at timestamp default now() not null
);

create table public.codigos_de_barra (
  ean_id uuid default uuid_generate_v4() primary key,
  producto_id uuid references public.productos (id) not null,
  ean text not null,
  created_at timestamp default now() not null
);

create table public.productos_devueltos (
  precio_compra real not null,
  precio_venta real not null,
  iva real not null,
  margen real not null,
  cantidad_devuelta smallint not null,
  created_at timestamp default now() not null,
  producto_id uuid references public.productos (id),
  precio_final real not null,
  codigo_de_barras uuid references public.codigos_de_barra (ean_id),
  proveedor_id uuid references public.proveedores (id),
  devolucion_id uuid references public.devoluciones (id),
  descuento real not null,
  primary key (devolucion_id, producto_id)
);

create table public.productos_mermados (
  precio_compra real not null,
  precio_venta real not null,
  iva real not null,
  margen real not null,
  cantidad_mermada smallint not null,
  created_at timestamp default now() not null,
  producto_id uuid references public.productos (id),
  codigo_de_barras_id uuid references public.codigos_de_barra (ean_id),
  proveedor_id uuid references public.proveedores (id),
  merma_id uuid references public.devoluciones (id),
  motivo_merma text not null,
  primary key (merma_id, producto_id)
);

create table public.ventas (
  id uuid default uuid_generate_v4() primary key,
  numero_factura bigint not null,
  dinero_efectivo real not null,
  dinero_tarjeta real not null,
  precio_venta_total real not null,
  precio_venta_pagado real not null,
  cambio real not null,
  cliente_id uuid references public.clientes (id),
  empleado_id uuid references public.empleados (id) not null,
  tipo_pago text not null,
  descuento_sobre_total real not null,
  descuento_porcentaje real not null,
  tpv_id uuid references public.tpvs (id) not null,
  created_at timestamp default now() not null
);

create table public.productos_vendidos (
  producto_id uuid references public.productos (id),
  venta_id uuid references public.ventas (id),
  precio_compra real not null,
  precio_venta real not null,
  precio_final real not null,
  cantidad_vendida integer not null,
  descuento real not null,
  iva real not null,
  margen real not null,
  created_at timestamp default now() not null,
  codigo_barras_id uuid references public.codigos_de_barra (ean_id),
  proveedor_id uuid references public.proveedores (id),
  beneficio real not null,
  primary key (producto_id, venta_id)
);
