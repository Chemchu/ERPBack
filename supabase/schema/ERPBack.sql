CREATE TABLE "inventarios" (
  "id" uuid PRIMARY KEY,
  "producto_id" uuid NOT NULL,
  "tienda_id" uuid NOT NULL,
  "empleado_id" uuid,
  "cantidad" integer NOT NULL DEFAULT 0,
  "created_at" datetime NOT NULL DEFAULT (now())
);

CREATE TABLE "proveedores" (
  "id" uuid PRIMARY KEY NOT NULL,
  "nombre" text NOT NULL,
  "nif" text UNIQUE NOT NULL,
  "email_id" uuid,
  "telefono_id" uuid,
  "direccion_id" uuid
);

CREATE TABLE "pedidos" (
  "id" uuid PRIMARY KEY NOT NULL,
  "proveedor_id" uuid NOT NULL,
  "tienda_id" uuid NOT NULL,
  "numer_factura" text NOT NULL,
  "fecha_creacion" datetime NOT NULL,
  "fecha_recepcion" datetime NOT NULL,
  "created_at" datetime NOT NULL
);

CREATE TABLE "productos_pedidos" (
  "pedido_id" uuid NOT NULL,
  "producto_id" uuid NOT NULL,
  "precio_compra" numeric NOT NULL,
  "cantidad_pedida" numeric NOT NULL,
  "cantdad_recibida" numeric NOT NULL,
  PRIMARY KEY ("pedido_id", "producto_id")
);

CREATE TABLE "productos" (
  "id" uuid PRIMARY KEY NOT NULL,
  "nombre" text UNIQUE NOT NULL,
  "familia" text NOT NULL,
  "created_at" datetime NOT NULL DEFAULT (now()),
  "updated_at" datetime NOT NULL
);

CREATE TABLE "codigos_de_barra" (
  "codigo" text UNIQUE PRIMARY KEY NOT NULL,
  "producto_id" uuid NOT NULL,
  "created_at" datetime NOT NULL,
  "updated_at" datetime NOT NULL
);

CREATE TABLE "productos_tiendas" (
  "id" uuid PRIMARY KEY NOT NULL,
  "tienda_id" uuid NOT NULL,
  "iva" numeric NOT NULL,
  "precio_compra" numeric NOT NULL,
  "precio_venta" numeric NOT NULL,
  "cantidad" numeric NOT NULL,
  "alta" boolean NOT NULL DEFAULT true
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
  "created_at" datetime NOT NULL DEFAULT (now())
);

CREATE TABLE "productos_devueltos" (
  "producto_id" uuid NOT NULL,
  "venta_id" uuid NOT NULL,
  "cantidad_devuelta" integer NOT NULL,
  "iva" numeric NOT NULL,
  "precio_compra" numeric NOT NULL,
  "precio_venta" numeric NOT NULL,
  "descuento" numeric NOT NULL DEFAULT 0,
  PRIMARY KEY ("producto_id", "venta_id")
);

CREATE TABLE "ofertas" (
  "id" uuid PRIMARY KEY NOT NULL,
  "producto_id" uuid NOT NULL,
  "tienda_id" uuid NOT NULL,
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
  "antiguedad" date NOT NULL,
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
  "created_at" date NOT NULL DEFAULT (now())
);

CREATE TABLE "empleados" (
  "id" uuid PRIMARY KEY NOT NULL,
  "nombre" text NOT NULL,
  "apellidos" text NOT NULL,
  "username" text UNIQUE NOT NULL,
  "nif" text UNIQUE NOT NULL,
  "rol" text NOT NULL,
  "descripcion" text,
  "fecha_nacimiento" date,
  "fecha_alta" date,
  "fecha_baja" date,
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
  "producto_id" uuid NOT NULL,
  "venta_id" uuid NOT NULL,
  "cantidad_vendida" integer NOT NULL,
  "iva" numeric NOT NULL,
  "precio_compra" numeric NOT NULL,
  "precio_venta" numeric NOT NULL,
  "descuento" numeric NOT NULL DEFAULT 0,
  PRIMARY KEY ("producto_id", "venta_id")
);

CREATE TABLE "ofertas_aplicadas" (
  "id" uuid PRIMARY KEY NOT NULL,
  "producto_vendido_id" uuid NOT NULL,
  "venta_id" uuid NOT NULL,
  "nombre" text NOT NULL,
  "cantidad_para_ofertar" integer NOT NULL,
  "precio_oferta" numeric NOT NULL,
  "cantidad_ofertas_aplicadas" integer NOT NULL DEFAULT 1
);

CREATE TABLE "ofertas_devueltas" (
  "id" uuid PRIMARY KEY NOT NULL,
  "producto_devuelto_id" uuid NOT NULL,
  "venta_id" uuid NOT NULL,
  "nombre" text NOT NULL,
  "cantidad_para_ofertar" integer NOT NULL,
  "precio_oferta" numeric NOT NULL,
  "cantidad_ofertas_devueltas" integer NOT NULL DEFAULT 1
);

CREATE TABLE "ventas" (
  "id" uuid PRIMARY KEY NOT NULL,
  "cierre_id" uuid NOT NULL,
  "empleado_id" uuid NOT NULL,
  "pagado_efectivo" numeric NOT NULL,
  "pagado_tarjeta" numeric NOT NULL,
  "created_at" datetime NOT NULL DEFAULT (now())
);

CREATE TABLE "cierres" (
  "id" uuid PRIMARY KEY NOT NULL,
  "terminal_id" uuid NOT NULL,
  "empleado_id" uuid NOT NULL,
  "dinero_inicial" numeric NOT NULL,
  "dinero_final" numeric NOT NULL,
  "dinero_retirado" numeric NOT NULL,
  "dinero_dejado" numeric NOT NULL,
  "fecha_apertura" datetime NOT NULL DEFAULT (now()),
  "fecha_cierre" datetime,
  "en_uso" boolean NOT NULL
);

ALTER TABLE "pedidos" ADD FOREIGN KEY ("proveedor_id") REFERENCES "proveedores" ("id");

ALTER TABLE "productos_pedidos" ADD FOREIGN KEY ("pedido_id") REFERENCES "pedidos" ("id");

ALTER TABLE "productos_pedidos" ADD FOREIGN KEY ("producto_id") REFERENCES "productos_tiendas" ("id");

ALTER TABLE "codigos_de_barra" ADD FOREIGN KEY ("producto_id") REFERENCES "productos" ("id");

ALTER TABLE "productos_tiendas" ADD FOREIGN KEY ("id") REFERENCES "ofertas" ("producto_id");

ALTER TABLE "productos_tiendas" ADD FOREIGN KEY ("tienda_id") REFERENCES "ofertas" ("tienda_id");

ALTER TABLE "productos_tiendas" ADD FOREIGN KEY ("id") REFERENCES "productos" ("id");

ALTER TABLE "productos_tiendas" ADD FOREIGN KEY ("tienda_id") REFERENCES "tiendas" ("id");

ALTER TABLE "terminales_de_ventas" ADD FOREIGN KEY ("tienda_id") REFERENCES "tiendas" ("id");

ALTER TABLE "empleados" ADD FOREIGN KEY ("pais_id") REFERENCES "paises" ("id");

ALTER TABLE "telefonos" ADD FOREIGN KEY ("entidad_id") REFERENCES "tiendas" ("id");

ALTER TABLE "emails" ADD FOREIGN KEY ("entidad_id") REFERENCES "tiendas" ("id");

ALTER TABLE "ofertas_devueltas" ADD FOREIGN KEY ("producto_devuelto_id") REFERENCES "productos_devueltos" ("producto_id");

ALTER TABLE "ofertas_devueltas" ADD FOREIGN KEY ("venta_id") REFERENCES "productos_devueltos" ("venta_id");

ALTER TABLE "ofertas_aplicadas" ADD FOREIGN KEY ("producto_vendido_id") REFERENCES "productos_vendidos" ("producto_id");

ALTER TABLE "ofertas_aplicadas" ADD FOREIGN KEY ("venta_id") REFERENCES "productos_vendidos" ("venta_id");

ALTER TABLE "cierres" ADD FOREIGN KEY ("terminal_id") REFERENCES "terminales_de_ventas" ("id");

ALTER TABLE "ventas" ADD FOREIGN KEY ("cierre_id") REFERENCES "cierres" ("id");

ALTER TABLE "productos_vendidos" ADD FOREIGN KEY ("venta_id") REFERENCES "ventas" ("id");

ALTER TABLE "productos_vendidos" ADD FOREIGN KEY ("producto_id") REFERENCES "productos_tiendas" ("id");

ALTER TABLE "emails" ADD FOREIGN KEY ("id") REFERENCES "empleados" ("email_id");

ALTER TABLE "telefonos" ADD FOREIGN KEY ("id") REFERENCES "empleados" ("telefono_id");

ALTER TABLE "empleados_tiendas" ADD FOREIGN KEY ("empleado_id") REFERENCES "empleados" ("id");

ALTER TABLE "empleados_tiendas" ADD FOREIGN KEY ("tienda_id") REFERENCES "tiendas" ("id");

ALTER TABLE "productos_mermados" ADD FOREIGN KEY ("producto_id") REFERENCES "productos_tiendas" ("id");

ALTER TABLE "emails" ADD FOREIGN KEY ("id") REFERENCES "proveedores" ("email_id");

ALTER TABLE "telefonos" ADD FOREIGN KEY ("id") REFERENCES "proveedores" ("telefono_id");

ALTER TABLE "productos_devueltos" ADD FOREIGN KEY ("producto_id") REFERENCES "productos_vendidos" ("producto_id");

ALTER TABLE "productos_devueltos" ADD FOREIGN KEY ("venta_id") REFERENCES "ventas" ("id");

ALTER TABLE "tiendas" ADD FOREIGN KEY ("empresa_id") REFERENCES "empresas" ("id");

ALTER TABLE "inventarios" ADD FOREIGN KEY ("producto_id") REFERENCES "productos" ("id");

ALTER TABLE "inventarios" ADD FOREIGN KEY ("tienda_id") REFERENCES "tiendas" ("id");

ALTER TABLE "pedidos" ADD FOREIGN KEY ("tienda_id") REFERENCES "tiendas" ("id");
