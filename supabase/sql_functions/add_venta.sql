CREATE TYPE producto_vendido as (
  id UUID, 
  precio_final NUMERIC(10, 2), 
  cantidad_vendida INT, 
  descuento NUMERIC(10, 2), 
  ean_id UUID
);
CREATE TYPE venta_a_procesar as (
  tpv_id UUID, 
  cliente_id UUID, 
  empleado_id UUID, 
  productos_vendidos producto_vendido[], 
  precio_venta_total NUMERIC(10, 2), 
  precio_venta_pagado NUMERIC(10, 2), 
  dinero_efectivo NUMERIC(10, 2), 
  dinero_tarjeta NUMERIC(10, 2), 
  cambio NUMERIC(10, 2), 
  tipo_pago VARCHAR(30), 
  descuento_sobre_total NUMERIC(10, 2), 
  descuento_porcentaje NUMERIC(10, 2)
);
CREATE 
OR REPLACE FUNCTION public.crear_venta(venta venta_a_procesar) RETURNS UUID AS $$ DECLARE nueva_venta_id UUID;
producto_nombre VARCHAR(20);
producto_familia VARCHAR(20);
producto_precio_compra NUMERIC(10, 2);
producto_precio_venta NUMERIC(10, 2);
producto_iva NUMERIC(10, 2);
producto_margen NUMERIC(10, 2);
producto_proveedor_id UUID;
precio_con_iva_calculado NUMERIC(10, 2);
beneficio_calculado NUMERIC(10, 2);
i INT;
BEGIN INSERT INTO ventas (
  dinero_efectivo, dinero_tarjeta, 
  precio_venta_total, precio_venta_pagado, 
  cambio, cliente_id, empleado_id, 
  tipo_pago, descuento_sobre_total, 
  descuento_porcentaje, tpv_id
) 
VALUES 
  (
    venta.dinero_efectivo, venta.dinero_tarjeta, 
    venta.precio_venta_total, venta.precio_venta_pagado, 
    venta.cambio, venta.cliente_id, 
    venta.empleado_id, venta.tipo_pago, 
    venta.descuento_sobre_total, venta.descuento_porcentaje, 
    venta.tpv_id
  ) RETURNING id INTO nueva_venta_id;
FOR i IN 1..array_length(venta.productos_vendidos, 1) LOOP 
SELECT 
  nombre, familia, precio_compra, precio_venta, 
  iva, margen, proveedor_id
INTO 
  producto_nombre, producto_familia, 
  producto_precio_compra, producto_precio_venta, 
  producto_iva, producto_margen, producto_proveedor_id
FROM 
  public.productos 
WHERE 
  id = venta.productos_vendidos[i].id;
precio_con_iva_calculado := producto_precio_compra + (
  (producto_iva / 100) * producto_precio_compra
);
beneficio_calculado := venta.productos_vendidos[i].cantidad_vendida * (
  venta.productos_vendidos[i].precio_final - precio_con_iva_calculado
);
INSERT INTO productos_vendidos (
  producto_id, venta_id, precio_compra, 
  precio_venta, precio_final, cantidad_vendida, 
  descuento, iva, margen, codigo_barras_id, 
  proveedor_id, beneficio
) 
VALUES 
  (
    venta.productos_vendidos[i].id, 
    nueva_venta_id, producto_precio_compra, 
    producto_precio_venta, venta.productos_vendidos[i].precio_final, 
    venta.productos_vendidos[i].cantidad_vendida, 
    venta.productos_vendidos[i].descuento, 
    producto_iva, producto_margen, venta.productos_vendidos[i].ean_id, 
    producto_proveedor_id, beneficio_calculado
  );
END LOOP;
RETURN nueva_venta_id;
END $$ LANGUAGE plpgsql;
