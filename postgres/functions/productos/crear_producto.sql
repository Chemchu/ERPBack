CREATE OR REPLACE FUNCTION crear_producto(
    p_nombre text,
    p_familia text,
    p_iva numeric,
    p_precio_compra numeric,
    p_precio_venta numeric,
    p_cantidad int,
    p_codigo text,
    p_tienda_id uuid
) RETURNS void AS $$
DECLARE
    v_producto_id uuid;
BEGIN
    -- Check if the product already exists
    SELECT id INTO v_producto_id FROM productos WHERE nombre = p_nombre LIMIT 1;
    
    IF v_producto_id IS NULL THEN
        -- Insert into "productos" table
        INSERT INTO productos (id, nombre, familia, iva)
        VALUES (uuid_generate_v4(), p_nombre, p_familia, p_iva)
        RETURNING id INTO v_producto_id;
    END IF;
    
    -- Insert into "productos_en_tienda" table
    INSERT INTO productos_en_tienda (id, precio_compra, precio_venta, cantidad, alta, producto_id, tienda_id)
    VALUES (uuid_generate_v4(), p_precio_compra, p_precio_venta, p_cantidad, true, v_producto_id, p_tienda_id);
    
    -- Insert into "codigos_barras" table
    INSERT INTO codigos_barras (codigo, producto_id, cantidad)
    VALUES (p_codigo, v_producto_id, p_cantidad);
    
    COMMIT;
END;
$$ LANGUAGE plpgsql;
