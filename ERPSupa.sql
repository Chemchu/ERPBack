CREATE TABLE "productos" (
  "id" uuid PRIMARY KEY NOT NULL,
  "nombre" text UNIQUE NOT NULL,
  "familia" text NOT NULL,
  "iva" numeric NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "productos_en_tienda" (
  "id" uuid PRIMARY KEY NOT NULL,
  "precio_compra" numeric NOT NULL,
  "precio_venta" numeric NOT NULL,
  "cantidad" int4 NOT NULL,
  "alta" bool NOT NULL DEFAULT true,
  "producto_id" uuid NOT NULL,
  "tienda_id" uuid NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "codigos_barras" (
  "codigo" text NOT NULL,
  "producto_id" uuid NOT NULL,
  "cantidad" int4 NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now()),
  PRIMARY KEY ("codigo", "producto_id")
);

CREATE TABLE "ofertas" (
  "id" uuid PRIMARY KEY NOT NULL,
  "nombre" text NOT NULL,
  "descripcion" text,
  "cantidad_para_oferta" int4 NOT NULL,
  "precio_oferta" numeric NOT NULL,
  "fecha_inicio" date NOT NULL,
  "fecha_fin" date,
  "producto_tienda_id" uuid NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "tiendas" (
  "id" uuid PRIMARY KEY NOT NULL,
  "nombre" text UNIQUE NOT NULL,
  "empresa_id" uuid NOT NULL,
  "direccion_id" uuid UNIQUE,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "productos_ventas" (
  "id" uuid PRIMARY KEY NOT NULL,
  "producto_tienda_id" uuid NOT NULL,
  "venta_id" uuid NOT NULL,
  "cantidad_vendida" int4 NOT NULL,
  "iva" numeric NOT NULL,
  "precio_compra" numeric NOT NULL,
  "precio_venta" numeric NOT NULL,
  "descuento" numeric NOT NULL DEFAULT 0
);

CREATE TABLE "productos_devoluciones" (
  "id" uuid PRIMARY KEY NOT NULL,
  "producto_venta_id" uuid NOT NULL,
  "devolucion_id" uuid NOT NULL,
  "cantidad_producto_devuelto" int4 NOT NULL,
  "motivo" text NOT NULL DEFAULT 'No especificado'
);

CREATE TABLE "devoluciones" (
  "id" uuid PRIMARY KEY NOT NULL,
  "empleados_id" uuid NOT NULL,
  "clientes_id" uuid NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "ofertas_devueltas" (
  "id" uuid PRIMARY KEY NOT NULL,
  "oferta_venta_id" uuid NOT NULL,
  "devolucion_id" uuid NOT NULL,
  "cantidad_ofertas_devueltas" int4 NOT NULL,
  "motivo" text NOT NULL DEFAULT 'No especificado'
);

CREATE TABLE "ofertas_ventas" (
  "id" uuid PRIMARY KEY NOT NULL,
  "producto_en_tienda_id" uuid NOT NULL,
  "venta_id" uuid NOT NULL,
  "oferta_id" uuid NOT NULL,
  "cantidad_de_ofertas_aplicadas" int4 NOT NULL,
  "cantidad_producto_por_oferta" int4 NOT NULL,
  "precio_por_oferta" numeric NOT NULL,
  "iva" numeric NOT NULL,
  "precio_compra" numeric NOT NULL,
  "precio_venta" numeric NOT NULL,
  "fecha_inicio" date NOT NULL,
  "fecha_fin" date
);

CREATE TABLE "ventas" (
  "id" uuid PRIMARY KEY NOT NULL,
  "numero_factura" text UNIQUE NOT NULL,
  "empleados_id" uuid NOT NULL,
  "clientes_id" uuid NOT NULL,
  "pagado_efectivo" numeric NOT NULL,
  "pagado_tarjeta" numeric NOT NULL,
  "cierre_id" uuid NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "productos_mermas" (
  "merma_id" uuid NOT NULL,
  "producto_tienda_id" uuid NOT NULL,
  "iva" numeric NOT NULL,
  "precio_compra" numeric NOT NULL,
  "precio_venta" numeric NOT NULL,
  "cantidad" int4 NOT NULL,
  "motivo" text NOT NULL,
  PRIMARY KEY ("merma_id", "producto_tienda_id")
);

CREATE TABLE "mermas" (
  "id" uuid PRIMARY KEY NOT NULL,
  "empleados_id" uuid NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "proveedores" (
  "id" uuid PRIMARY KEY NOT NULL,
  "nombre" text NOT NULL,
  "nif" text UNIQUE NOT NULL,
  "email_id" uuid UNIQUE,
  "telefono_id" uuid UNIQUE,
  "direccion_id" uuid,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "productos_pedidos" (
  "producto_id" uuid NOT NULL,
  "pedido_id" uuid NOT NULL,
  "precio_compra" numeric NOT NULL,
  "cantidad_pedida" int4 NOT NULL,
  "cantidad_recibida" int4 NOT NULL,
  PRIMARY KEY ("producto_id", "pedido_id")
);

CREATE TABLE "pedidos" (
  "id" uuid PRIMARY KEY NOT NULL,
  "numero_factura" text UNIQUE NOT NULL,
  "fecha_pedido" date NOT NULL,
  "fecha_entrega" date NOT NULL,
  "estado" text NOT NULL,
  "observaciones" text,
  "proveedor_id" uuid NOT NULL,
  "tienda_id" uuid NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "clientes" (
  "id" uuid PRIMARY KEY NOT NULL,
  "nombre" text NOT NULL,
  "apellidos" text NOT NULL,
  "nif" text UNIQUE NOT NULL,
  "direccion_id" uuid UNIQUE,
  "email_id" uuid UNIQUE,
  "telefono_id" uuid UNIQUE,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "direcciones" (
  "id" uuid PRIMARY KEY NOT NULL,
  "calle" text NOT NULL,
  "numero" text NOT NULL,
  "piso" text,
  "puerta" text,
  "codigo_postal" text NOT NULL,
  "ciudad" text NOT NULL,
  "provincia" text NOT NULL,
  "pais" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "emails" (
  "id" uuid PRIMARY KEY NOT NULL,
  "email" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "telefonos" (
  "id" uuid PRIMARY KEY NOT NULL,
  "prefijo" text NOT NULL,
  "telefono" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "empleados" (
  "id" uuid PRIMARY KEY NOT NULL,
  "username" text UNIQUE NOT NULL,
  "nombre" text NOT NULL,
  "apellidos" text NOT NULL,
  "nif" text UNIQUE NOT NULL,
  "rol" text NOT NULL,
  "descripcion" text,
  "fecha_nacimiento" date NOT NULL,
  "fecha_contratacion" date NOT NULL,
  "fecha_baja" date,
  "email_id" uuid UNIQUE NOT NULL,
  "telefono_id" uuid UNIQUE,
  "direccion_id" uuid,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "cierres" (
  "id" uuid PRIMARY KEY NOT NULL,
  "dinero_inicial" numeric NOT NULL,
  "dinero_real" numeric NOT NULL,
  "dinero_retirado" numeric NOT NULL,
  "dinero_dejado_en_caja" numeric NOT NULL,
  "fecha_apertura" date NOT NULL,
  "fecha_cierre" date NOT NULL,
  "en_uso" bool NOT NULL,
  "caja_id" uuid NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "cajas" (
  "id" uuid PRIMARY KEY NOT NULL,
  "nombre" text UNIQUE NOT NULL,
  "tienda_id" uuid NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "productos_inventarios" (
  "producto_tienda_id" uuid NOT NULL,
  "inventario_id" uuid NOT NULL,
  "cantidad_teorica" int4 NOT NULL,
  "cantidad_real" int4 NOT NULL,
  "empleado_id" uuid NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now()),
  PRIMARY KEY ("producto_tienda_id", "inventario_id")
);

CREATE TABLE "inventario" (
  "id" uuid PRIMARY KEY NOT NULL,
  "descripcion" text NOT NULL,
  "inventario_cerrado" bool NOT NULL DEFAULT false,
  "fecha_inicio" date NOT NULL,
  "fecha_fin" date,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "empresas" (
  "id" uuid PRIMARY KEY NOT NULL,
  "nombre" text UNIQUE NOT NULL,
  "nif" text UNIQUE NOT NULL,
  "ceo_id" uuid NOT NULL,
  "fecha_creacion" date NOT NULL,
  "razon_social" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (now()),
  "updated_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "tiendas_empleados" (
  "tienda_id" uuid NOT NULL,
  "empleado_id" uuid NOT NULL
);

CREATE UNIQUE INDEX ON "productos_en_tienda" ("producto_id", "tienda_id");

CREATE UNIQUE INDEX ON "productos_ventas" ("producto_tienda_id", "venta_id");

CREATE UNIQUE INDEX ON "productos_devoluciones" ("producto_venta_id", "devolucion_id");

CREATE UNIQUE INDEX ON "ofertas_devueltas" ("oferta_venta_id", "devolucion_id");

CREATE UNIQUE INDEX ON "ofertas_ventas" ("producto_en_tienda_id", "venta_id", "oferta_id");

CREATE UNIQUE INDEX ON "tiendas_empleados" ("tienda_id", "empleado_id");

COMMENT ON COLUMN "productos_devoluciones"."cantidad_producto_devuelto" IS 'Indica la cantidad de veces que se ha devuelto el producto para esa venta';

COMMENT ON COLUMN "productos_devoluciones"."motivo" IS 'Indica el motivo de la devolución';

COMMENT ON COLUMN "ofertas_devueltas"."cantidad_ofertas_devueltas" IS 'Indica la cantidad de veces que se ha devuelto la oferta para esa venta';

COMMENT ON COLUMN "ofertas_devueltas"."motivo" IS 'Indica el motivo de la devolución';

COMMENT ON COLUMN "ofertas_ventas"."cantidad_de_ofertas_aplicadas" IS 'Indica la cantidad de veces que se ha aplicado la oferta';

COMMENT ON COLUMN "ofertas_ventas"."cantidad_producto_por_oferta" IS 'Indica la cantidad de productos que se deben comprar para aplicar la oferta';

COMMENT ON COLUMN "ofertas_ventas"."precio_por_oferta" IS 'Indica el precio de una oferta aplicada';

COMMENT ON COLUMN "ofertas_ventas"."iva" IS 'IVA del producto en el momento de la venta';

COMMENT ON COLUMN "ofertas_ventas"."precio_compra" IS 'Precio de compra del producto en el momento de la venta';

COMMENT ON COLUMN "ofertas_ventas"."precio_venta" IS 'Precio de venta del producto en el momento de la venta';

ALTER TABLE "productos_en_tienda" ADD FOREIGN KEY ("producto_id") REFERENCES "productos" ("id");

ALTER TABLE "productos_en_tienda" ADD FOREIGN KEY ("tienda_id") REFERENCES "tiendas" ("id");

ALTER TABLE "codigos_barras" ADD FOREIGN KEY ("producto_id") REFERENCES "productos" ("id");

ALTER TABLE "ofertas" ADD FOREIGN KEY ("producto_tienda_id") REFERENCES "productos_en_tienda" ("id");

ALTER TABLE "tiendas" ADD FOREIGN KEY ("empresa_id") REFERENCES "empresas" ("id");

ALTER TABLE "tiendas" ADD FOREIGN KEY ("direccion_id") REFERENCES "direcciones" ("id");

ALTER TABLE "productos_ventas" ADD FOREIGN KEY ("producto_tienda_id") REFERENCES "productos_en_tienda" ("id");

ALTER TABLE "productos_ventas" ADD FOREIGN KEY ("venta_id") REFERENCES "ventas" ("id");

ALTER TABLE "productos_devoluciones" ADD FOREIGN KEY ("producto_venta_id") REFERENCES "productos_ventas" ("id");

ALTER TABLE "productos_devoluciones" ADD FOREIGN KEY ("devolucion_id") REFERENCES "devoluciones" ("id");

ALTER TABLE "devoluciones" ADD FOREIGN KEY ("empleados_id") REFERENCES "empleados" ("id");

ALTER TABLE "devoluciones" ADD FOREIGN KEY ("clientes_id") REFERENCES "clientes" ("id");

ALTER TABLE "ofertas_devueltas" ADD FOREIGN KEY ("oferta_venta_id") REFERENCES "ofertas_ventas" ("id");

ALTER TABLE "ofertas_devueltas" ADD FOREIGN KEY ("devolucion_id") REFERENCES "devoluciones" ("id");

ALTER TABLE "ofertas_ventas" ADD FOREIGN KEY ("producto_en_tienda_id") REFERENCES "productos_en_tienda" ("id");

ALTER TABLE "ofertas_ventas" ADD FOREIGN KEY ("venta_id") REFERENCES "ventas" ("id");

ALTER TABLE "ofertas_ventas" ADD FOREIGN KEY ("oferta_id") REFERENCES "ofertas" ("id");

ALTER TABLE "ventas" ADD FOREIGN KEY ("empleados_id") REFERENCES "empleados" ("id");

ALTER TABLE "ventas" ADD FOREIGN KEY ("clientes_id") REFERENCES "clientes" ("id");

ALTER TABLE "ventas" ADD FOREIGN KEY ("cierre_id") REFERENCES "cierres" ("id");

ALTER TABLE "productos_mermas" ADD FOREIGN KEY ("merma_id") REFERENCES "mermas" ("id");

ALTER TABLE "productos_mermas" ADD FOREIGN KEY ("producto_tienda_id") REFERENCES "productos_en_tienda" ("id");

ALTER TABLE "mermas" ADD FOREIGN KEY ("empleados_id") REFERENCES "empleados" ("id");

ALTER TABLE "cierres" ADD FOREIGN KEY ("caja_id") REFERENCES "cajas" ("id");

ALTER TABLE "productos_inventarios" ADD FOREIGN KEY ("producto_tienda_id") REFERENCES "productos_en_tienda" ("id");

ALTER TABLE "productos_inventarios" ADD FOREIGN KEY ("inventario_id") REFERENCES "inventario" ("id");

ALTER TABLE "productos_inventarios" ADD FOREIGN KEY ("empleado_id") REFERENCES "empleados" ("id");

ALTER TABLE "empresas" ADD FOREIGN KEY ("ceo_id") REFERENCES "empleados" ("id");

ALTER TABLE "tiendas_empleados" ADD FOREIGN KEY ("tienda_id") REFERENCES "tiendas" ("id");

ALTER TABLE "tiendas_empleados" ADD FOREIGN KEY ("empleado_id") REFERENCES "empleados" ("id");

-- Enable RLS for "productos" table
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;

-- Enable RLS for "productos_en_tienda" table
ALTER TABLE productos_en_tienda ENABLE ROW LEVEL SECURITY;

-- Enable RLS for "codigos_barras" table
ALTER TABLE codigos_barras ENABLE ROW LEVEL SECURITY;

-- Enable RLS for "ofertas" table
ALTER TABLE ofertas ENABLE ROW LEVEL SECURITY;

-- Enable RLS for "tiendas" table
ALTER TABLE tiendas ENABLE ROW LEVEL SECURITY;

-- Enable RLS for "productos_ventas" table
ALTER TABLE productos_ventas ENABLE ROW LEVEL SECURITY;

-- Enable RLS for "productos_devoluciones" table
ALTER TABLE productos_devoluciones ENABLE ROW LEVEL SECURITY;

-- Enable RLS for "devoluciones" table
ALTER TABLE devoluciones ENABLE ROW LEVEL SECURITY;

-- Enable RLS for "ofertas_devueltas" table
ALTER TABLE ofertas_devueltas ENABLE ROW LEVEL SECURITY;

-- Enable RLS for "ofertas_ventas" table
ALTER TABLE ofertas_ventas ENABLE ROW LEVEL SECURITY;

-- Enable RLS for "ventas" table
ALTER TABLE ventas ENABLE ROW LEVEL SECURITY;

-- Enable RLS for "productos_mermas" table
ALTER TABLE productos_mermas ENABLE ROW LEVEL SECURITY;

-- Enable RLS for "mermas" table
ALTER TABLE mermas ENABLE ROW LEVEL SECURITY;

-- Enable RLS for "proveedores" table
ALTER TABLE proveedores ENABLE ROW LEVEL SECURITY;

-- Enable RLS for "productos_pedidos" table
ALTER TABLE productos_pedidos ENABLE ROW LEVEL SECURITY;

-- Enable RLS for "pedidos" table
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;

-- Enable RLS for "clientes" table
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;

-- Enable RLS for "direcciones" table
ALTER TABLE direcciones ENABLE ROW LEVEL SECURITY;

-- Enable RLS for "emails" table
ALTER TABLE emails ENABLE ROW LEVEL SECURITY;

-- Enable RLS for "telefonos" table
ALTER TABLE telefonos ENABLE ROW LEVEL SECURITY;

-- Enable RLS for "empleados" table
ALTER TABLE empleados ENABLE ROW LEVEL SECURITY;

-- Enable RLS for "cierres" table
ALTER TABLE cierres ENABLE ROW LEVEL SECURITY;

-- Enable RLS for "cajas" table
ALTER TABLE cajas ENABLE ROW LEVEL SECURITY;

-- Enable RLS for "productos_inventarios" table
ALTER TABLE productos_inventarios ENABLE ROW LEVEL SECURITY;

-- Enable RLS for "inventario" table
ALTER TABLE inventario ENABLE ROW LEVEL SECURITY;

-- Enable RLS for "empresas" table
ALTER TABLE empresas ENABLE ROW LEVEL SECURITY;

-- Enable RLS for "tiendas_empleados" table
ALTER TABLE tiendas_empleados ENABLE ROW LEVEL SECURITY;
