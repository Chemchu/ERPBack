CREATE TABLE "ventas"(
    "id" UUID DEFAULT uuid_generate_v4() NOT NULL,
    "empleado_id" UUID NOT NULL,
    "cierre_id" UUID NOT NULL,
    "numero_factura" SERIAL NOT NULL,
    "efectivo_pagado" DECIMAL(8, 2) NOT NULL,
    "tarjeta_pagado" DECIMAL(8, 2) NOT NULL,
    "cambio" DECIMAL(8, 2) NOT NULL,
    "created_at" TIMESTAMP(0) WITH
        TIME zone NOT NULL,
        "tipo_venta" TEXT NOT NULL,

    ADD CONSTRAINT venta_efectivo_pagado_positive_value_check CHECK (efectivo_pagado >= 0);
    ADD CONSTRAINT venta_tarjeta_pagado_positive_value_check CHECK (tarjeta_pagado >= 0);
    ADD CONSTRAINT venta_cambio_positive_value_check CHECK (cambio >= 0);
);
CREATE INDEX "ventas_numero_factura_index" ON
    "ventas"("numero_factura");
ALTER TABLE
    "ventas" ADD PRIMARY KEY("id");
CREATE INDEX "ventas_empleado_id_index" ON
    "ventas"("empleado_id");
CREATE INDEX "ventas_cierre_id_index" ON
    "ventas"("cierre_id");
ALTER TABLE
    "ventas" ADD CONSTRAINT "ventas_numero_factura_unique" UNIQUE("numero_factura");
CREATE TABLE "productos_vendidos"(
    "producto_id" UUID NOT NULL,
    "venta_id" UUID NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "iva" DECIMAL(8, 2) NOT NULL,
    "precio_compra" DECIMAL(8, 2) NOT NULL,
    "precio_venta" DECIMAL(8, 2) NOT NULL,
    "descuento" DECIMAL(8, 2) NOT NULL,
    
    ADD CONSTRAINT producto_vendido_cantidad_positive_value_check CHECK (cantidad > 0);
    ADD CONSTRAINT producto_vendido_iva_positive_value_check CHECK (iva >= 0);
    ADD CONSTRAINT producto_vendido_precio_compra_positive_value_check CHECK (precio_compra >= 0);
    ADD CONSTRAINT producto_vendido_precio_venta_positive_value_check CHECK (precio_venta >= 0);
    ADD CONSTRAINT producto_vendido_descuento_positive_value_check CHECK (descuento >= 0);
);
ALTER TABLE
    "productos_vendidos" ADD PRIMARY KEY("producto_id", "venta_id");

CREATE TABLE "proveedores"(
    "id" UUID DEFAULT uuid_generate_v4() NOT NULL,
    "direccion_id" UUID NOT NULL,
    "nombre" TEXT NOT NULL,
    "nif" TEXT NOT NULL
);
ALTER TABLE
    "proveedores" ADD PRIMARY KEY("id");
CREATE INDEX "proveedores_direccion_id_index" ON
    "proveedores"("direccion_id");
ALTER TABLE
    "proveedores" ADD CONSTRAINT "proveedores_nombre_unique" UNIQUE("nombre");
ALTER TABLE
    "proveedores" ADD CONSTRAINT "proveedores_nif_unique" UNIQUE("nif");
CREATE TABLE "productos_devueltos"(
    "producto_id" UUID NOT NULL,
    "devolucion_id" UUID NOT NULL,
    "cantidad_devuelta" BIGINT NOT NULL,
    "precio_compra" DECIMAL(8, 2) NOT NULL,
    "precio_venta" DECIMAL(8, 2) NOT NULL,
    "iva" DECIMAL(8, 2) NOT NULL,
    "efectivo_devuelto" DECIMAL(8, 2) NOT NULL,
    "tarjeta_devuelto" DECIMAL(8, 2) NOT NULL,
    "created_at" TIMESTAMP(0) WITH
        TIME zone NOT NULL,
    "descuento" DECIMAL(8, 2) NOT NULL,

    ADD CONSTRAINT producto_devuelto_cantidad_devuelta_positive_value_check CHECK (cantidad_devuelta >= 0);
    ADD CONSTRAINT producto_devuelto_precio_compra_positive_value_check CHECK (precio_compra >= 0);
    ADD CONSTRAINT producto_devuelto_precio_venta_positive_value_check CHECK (precio_venta >= 0);
    ADD CONSTRAINT producto_devuelto_iva_positive_value_check CHECK (iva >= 0);
    ADD CONSTRAINT producto_devuelto_efectivo_devuelto_positive_value_check CHECK (efectivo_devuelto >= 0);
    ADD CONSTRAINT producto_devuelto_tarjeta_devuelto_positive_value_check CHECK (tarjeta_devuelto >= 0);
    ADD CONSTRAINT producto_devuelto_descuento_positive_value_check CHECK (descuento >= 0);
);
ALTER TABLE
    "productos_devueltos" ADD PRIMARY KEY("producto_id");
ALTER TABLE
    "productos_devueltos" ADD PRIMARY KEY("devolucion_id");
CREATE TABLE "empresa"(
    "id" UUID DEFAULT uuid_generate_v4() NOT NULL,
    "empleado_id" UUID NOT NULL,
    "nombre" TEXT NOT NULL,
    "nif" TEXT NOT NULL,
    "razon_social" TEXT NOT NULL,
    "actividad" TEXT NOT NULL,
    
    ADD CONSTRAINT empresa_nombre_length CHECK (char_length(nombre) >= 3)
    ADD CONSTRAINT empresa_nif_length CHECK (char_length(nif) >= 3)
);
ALTER TABLE
    "empresa" ADD PRIMARY KEY("id");
CREATE INDEX "empresa_empleado_id_index" ON
    "empresa"("empleado_id");
ALTER TABLE
    "empresa" ADD CONSTRAINT "empresa_nombre_unique" UNIQUE("nombre");
ALTER TABLE
    "empresa" ADD CONSTRAINT "empresa_nif_unique" UNIQUE("nif");
CREATE TABLE "codigos_de_barra"(
    "ean" TEXT NOT NULL,
    "producto_id" UUID NOT NULL,
    "created_at" TIMESTAMP(0) WITH
        TIME zone NOT NULL
);
ALTER TABLE
    "codigos_de_barra" ADD PRIMARY KEY("ean");
CREATE INDEX "codigos_de_barra_producto_id_index" ON
    "codigos_de_barra"("producto_id");
CREATE TABLE "productos"(
    "id" UUID DEFAULT uuid_generate_v4() NOT NULL,
    "nombre" TEXT NOT NULL,
    "familia" TEXT NOT NULL,
    "iva" DECIMAL(8, 2) NOT NULL DEFAULT '10',
    "precio_compra" DECIMAL(8, 2) NOT NULL,
    "precio_venta" DECIMAL(8, 2) NOT NULL,
    "cantidad" BIGINT NOT NULL,
    "alta" BOOLEAN NOT NULL,
    
    ADD CONSTRAINT producto_iva_positive_value_check CHECK (iva >= 0);
    ADD CONSTRAINT producto_precio_compra_positive_value_check CHECK (precio_compra >= 0);
    ADD CONSTRAINT producto_precio_venta_positive_value_check CHECK (precio_venta >= 0);
    ADD CONSTRAINT producto_cantidad_positive_value_check CHECK (cantidad >= 1);
);
ALTER TABLE
    "productos" ADD PRIMARY KEY("id");
ALTER TABLE
    "productos" ADD CONSTRAINT "productos_nombre_unique" UNIQUE("nombre");
CREATE TABLE "ofertas"(
    "id" UUID NOT NULL,
    "producto_id" UUID NOT NULL,
    "nombre_oferta" TEXT NOT NULL,
    "cantidad_para_oferta" INTEGER NOT NULL,
    "precio_oferta" DECIMAL(8, 2) NOT NULL,
    
    ADD CONSTRAINT oferta_cantidad_para_oferta_length CHECK (cantidad_para_oferta >= 1);
    ADD CONSTRAINT oferta_precio_oferta_positive_value_check CHECK (precio_oferta >= 0);
);
ALTER TABLE
    "ofertas" ADD PRIMARY KEY("id");
ALTER TABLE
    "ofertas" ADD CONSTRAINT "ofertas_nombre_oferta_unique" UNIQUE("nombre_oferta");
CREATE TABLE "ofertas_aplicadas"(
    "producto_id" UUID NOT NULL,
    "venta_id" UUID NOT NULL,
    "nombre_oferta" TEXT NOT NULL,
    "cantidad_para_oferta" INTEGER NOT NULL,
    "precio_oferta" DECIMAL(8, 2) NOT NULL,
    "cantidad_ofertas_aplicadas" INTEGER NOT NULL,
    
    ADD CONSTRAINT oferta_aplicada_cantidad_para_oferta_length CHECK (cantidad_para_oferta >= 1);
    ADD CONSTRAINT oferta_aplicada_precio_oferta_positive_value_check CHECK (precio_oferta >= 0);
    ADD CONSTRAINT oferta_aplicada_cantidad_aplicada_positive_value_check CHECK (cantidad_ofertas_aplicadas >= 0);
);
ALTER TABLE
    "ofertas_aplicadas" ADD PRIMARY KEY("producto_id");
ALTER TABLE
    "ofertas_aplicadas" ADD PRIMARY KEY("venta_id");
COMMENT
ON COLUMN
    "ofertas_aplicadas"."cantidad_ofertas_aplicadas" IS 'Indica cuantas veces se ha aplicado una oferta';
CREATE TABLE "contactos"(
    "contacto_id" UUID NOT NULL,
    "agente_id" UUID NOT NULL,
    "telefono" TEXT NULL,
    "email" TEXT NOT NULL
    CONSTRAINT proper_email CHECK (email ~* '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$')
);
ALTER TABLE
    "contactos" ADD PRIMARY KEY("contacto_id");
ALTER TABLE
    "contactos" ADD PRIMARY KEY("agente_id");
ALTER TABLE
    "contactos" ADD CONSTRAINT "contactos_telefono_unique" UNIQUE("telefono");
ALTER TABLE
    "contactos" ADD CONSTRAINT "contactos_email_unique" UNIQUE("email");
CREATE TABLE "tiendas"(
    "id" DEFAULT uuid_generate_v4() UUID NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion_id" UUID NOT NULL,
    "empresa_id" UUID NOT NULL,

    ADD CONSTRAINT tiendas_nombre_length CHECK (char_length(nombre) >= 3)
);
ALTER TABLE
    "tiendas" ADD PRIMARY KEY("id");
CREATE INDEX "tiendas_direccion_id_index" ON
    "tiendas"("direccion_id");
CREATE INDEX "tiendas_empresa_id_index" ON
    "tiendas"("empresa_id");
CREATE TABLE "cierres"(
    "id" UUID DEFAULT uuid_generate_v4() NOT NULL,
    "terminal_id" UUID NOT NULL,
    "empleado_id" UUID NOT NULL,
    "en_uso" BOOLEAN NOT NULL,
    "dinero_inicial" DECIMAL(8, 2) NOT NULL,
    "dinero_final" DECIMAL(8, 2) NOT NULL,
    "dinero_retirado" DECIMAL(8, 2) NOT NULL,
    "dinero_dejado_en_caja" DECIMAL(8, 2) NOT NULL,
    "fecha_apertura" TIMESTAMP(0) WITH
        TIME zone NOT NULL,
        "fecha_cierre" TIMESTAMP(0)
    WITH
        TIME zone NULL,

    ADD CONSTRAINT cierres_dinero_inicial_positive_value_check CHECK (dinero_inicial > 0);
    ADD CONSTRAINT cierres_dinero_final_positive_value_check CHECK (dinero_final > 0);
    ADD CONSTRAINT cierres_dinero_retirado_positive_value_check CHECK (dinero_retirado > 0);
    ADD CONSTRAINT cierres_dinero_dejado_positive_value_check CHECK (dinero_dejado_en_caja > 0);
);
ALTER TABLE
    "cierres" ADD PRIMARY KEY("id");
CREATE TABLE "terminales_de_venta"(
    "id" UUID DEFAULT uuid_generate_v4() NOT NULL,
    "tienda_id" UUID NOT NULL,
    "nombre" TEXT NOT NULL,
    "created_at" TIMESTAMP(0) WITH
        TIME zone NOT NULL,

    ADD CONSTRAINT terminales_nombre_length CHECK (char_length(nombre) >= 3)
);
ALTER TABLE
    "terminales_de_venta" ADD PRIMARY KEY("id");
ALTER TABLE
    "terminales_de_venta" ADD CONSTRAINT "terminales_de_venta_nombre_unique" UNIQUE("nombre");
CREATE TABLE "productos_mermados"(
    "producto_id" UUID NOT NULL,
    "merma_id" UUID NOT NULL,
    "cantidad" BIGINT NOT NULL,
    "precio_compra" DECIMAL(8, 2) NOT NULL,
    "precio_venta" DECIMAL(8, 2) NOT NULL,
    "iva" DECIMAL(8, 2) NOT NULL,
    "motivo" TEXT NOT NULL,
    "created_at" TIMESTAMP(0) WITH
        TIME zone NOT NULL

    ADD CONSTRAINT producto_mermado_cantidad_positive_value_check CHECK (cantidad >= 1);
    ADD CONSTRAINT producto_mermado_precio_compra_positive_value_check CHECK (precio_compra >= 0);
    ADD CONSTRAINT producto_mermado_precio_venta_positive_value_check CHECK (precio_venta >= 0);
    ADD CONSTRAINT producto_mermado_iva_positive_value_check CHECK (iva >= 0);
);
ALTER TABLE
    "productos_mermados" ADD PRIMARY KEY("producto_id");
ALTER TABLE
    "productos_mermados" ADD PRIMARY KEY("merma_id");
CREATE TABLE "empleados"(
    "id" UUID NOT NULL,
    "contacto_id" UUID NOT NULL,
    "username" TEXT NOT NULL,
    "nif" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "rol" TEXT NOT NULL

    CONSTRAINT empleado_nombre_length CHECK (char_length(nombre) >= 3)
    CONSTRAINT empleado_apellidos_length CHECK (char_length(apellidos) >= 3)
    CONSTRAINT empleado_username_length CHECK (char_length(username) >= 3)
    CONSTRAINT empleado_nif_length CHECK (char_length(nif) >= 3)
);
ALTER TABLE
    "empleados" ADD PRIMARY KEY("id");
ALTER TABLE
    "empleados" ADD CONSTRAINT "empleados_contacto_id_unique" UNIQUE("contacto_id");
ALTER TABLE
    "empleados" ADD CONSTRAINT "empleados_username_unique" UNIQUE("username");
ALTER TABLE
    "empleados" ADD CONSTRAINT "empleados_nif_unique" UNIQUE("nif");
CREATE TABLE "pedidos"(
    "id" UUID DEFAULT uuid_generate_v4() NOT NULL,
    "empleado_id" UUID NOT NULL,
    "proveedor_id" UUID NOT NULL,
    "codigo" TEXT NOT NULL,
    "tipo_pago" TEXT NOT NULL,
    "fecha_pedido" TIMESTAMP(0) WITH
        TIME zone NOT NULL,
        "fecha_recepcion" TIMESTAMP(0)
    WITH
        TIME zone NOT NULL,
        
    CONSTRAINT pedido_codigo_length CHECK (char_length(codigo) >= 3)
    CONSTRAINT pedido_tipo_pago_length CHECK (char_length(tipo_pago) >= 3)
);
ALTER TABLE
    "pedidos" ADD PRIMARY KEY("id");
CREATE INDEX "pedidos_empleado_id_index" ON
    "pedidos"("empleado_id");
CREATE INDEX "pedidos_proveedor_id_index" ON
    "pedidos"("proveedor_id");
ALTER TABLE
    "pedidos" ADD CONSTRAINT "pedidos_codigo_unique" UNIQUE("codigo");
CREATE TABLE "producto_pedidos"(
    "pedido_id" UUID NOT NULL,
    "producto_id" UUID NOT NULL,
    "producto_recibido" BOOLEAN NOT NULL DEFAULT '1',
    "iva" DECIMAL(8, 2) NOT NULL,
    "precio_compra" DECIMAL(8, 2) NOT NULL,
    "cantidad_pedida" BIGINT NOT NULL,
    "descuento" DECIMAL(8, 2) NOT NULL, 

    ADD CONSTRAINT producto_pedido_cantidad_positive_value_check CHECK (cantidad_pedida >= 1);
    ADD CONSTRAINT producto_pedido_precio_compra_positive_value_check CHECK (precio_compra >= 0);
    ADD CONSTRAINT producto_pedido_descuento_positive_value_check CHECK (descuento >= 0);
    ADD CONSTRAINT producto_pedido_iva_positive_value_check CHECK (iva >= 0);
);
ALTER TABLE
    "producto_pedidos" ADD PRIMARY KEY("pedido_id", "producto_id");
ALTER TABLE
    "ventas" ADD CONSTRAINT "ventas_empleado_id_foreign" FOREIGN KEY("empleado_id") REFERENCES "empleados"("id");
ALTER TABLE
    "terminales_de_venta" ADD CONSTRAINT "terminales_de_venta_tienda_id_foreign" FOREIGN KEY("tienda_id") REFERENCES "tiendas"("id");
ALTER TABLE
    "ventas" ADD CONSTRAINT "ventas_cierre_id_foreign" FOREIGN KEY("cierre_id") REFERENCES "cierres"("id");
ALTER TABLE
    "productos_mermados" ADD CONSTRAINT "productos_mermados_producto_id_foreign" FOREIGN KEY("producto_id") REFERENCES "productos"("id");
ALTER TABLE
    "cierres" ADD CONSTRAINT "cierres_empleado_id_foreign" FOREIGN KEY("empleado_id") REFERENCES "empleados"("id");
ALTER TABLE
    "productos_vendidos" ADD CONSTRAINT "productos_vendidos_producto_id_foreign" FOREIGN KEY("producto_id") REFERENCES "productos"("id");
ALTER TABLE
    "codigos_de_barra" ADD CONSTRAINT "codigos_de_barra_producto_id_foreign" FOREIGN KEY("producto_id") REFERENCES "productos"("id");
ALTER TABLE
    "proveedores" ADD CONSTRAINT "proveedores_id_foreign" FOREIGN KEY("id") REFERENCES "contactos"("agente_id");
ALTER TABLE
    "pedidos" ADD CONSTRAINT "pedidos_empleado_id_foreign" FOREIGN KEY("empleado_id") REFERENCES "empleados"("id");
ALTER TABLE
    "contactos" ADD CONSTRAINT "contactos_agente_id_foreign" FOREIGN KEY("agente_id") REFERENCES "empleados"("id");
ALTER TABLE
    "producto_pedidos" ADD CONSTRAINT "producto_pedidos_producto_id_foreign" FOREIGN KEY("producto_id") REFERENCES "productos"("id");
ALTER TABLE
    "productos" ADD CONSTRAINT "productos_id_foreign" FOREIGN KEY("id") REFERENCES "productos_devueltos"("producto_id");
ALTER TABLE
    "productos" ADD CONSTRAINT "productos_id_foreign" FOREIGN KEY("id") REFERENCES "promociones"("producto_id");
ALTER TABLE
    "empresa" ADD CONSTRAINT "empresa_empleado_id_foreign" FOREIGN KEY("empleado_id") REFERENCES "empleados"("id");
ALTER TABLE
    "producto_pedidos" ADD CONSTRAINT "producto_pedidos_pedido_id_foreign" FOREIGN KEY("pedido_id") REFERENCES "pedidos"("id");
ALTER TABLE
    "tiendas" ADD CONSTRAINT "tiendas_empresa_id_foreign" FOREIGN KEY("empresa_id") REFERENCES "empresa"("id");
ALTER TABLE
    "contactos" ADD CONSTRAINT "contactos_agente_id_foreign" FOREIGN KEY("agente_id") REFERENCES "tiendas"("id");
ALTER TABLE
    "pedidos" ADD CONSTRAINT "pedidos_proveedor_id_foreign" FOREIGN KEY("proveedor_id") REFERENCES "proveedores"("id");
ALTER TABLE
    "productos_vendidos" ADD CONSTRAINT "productos_vendidos_venta_id_foreign" FOREIGN KEY("venta_id") REFERENCES "ventas"("id");
ALTER TABLE
    "cierres" ADD CONSTRAINT "cierres_terminal_id_foreign" FOREIGN KEY("terminal_id") REFERENCES "terminales_de_venta"("id");
ALTER TABLE
    "productos" ADD CONSTRAINT "productos_id_foreign" FOREIGN KEY("id") REFERENCES "ofertas"("producto_id");
ALTER TABLE
    "productos_vendidos" ADD CONSTRAINT "productos_vendidos_producto_id_foreign" FOREIGN KEY("producto_id") REFERENCES "ofertas_aplicadas"("producto_id");
ALTER TABLE
    "productos_vendidos" ADD CONSTRAINT "productos_vendidos_venta_id_foreign" FOREIGN KEY("venta_id") REFERENCES "ofertas_aplicadas"("venta_id");