CREATE OR REPLACE FUNCTION modify_productos_en_tiendas(
    p_producto_en_tienda_id UUID,
    p_precio_compra NUMERIC,
    p_precio_venta NUMERIC,
    p_cantidad INT,
    p_codigos_barras JSONB,
    p_nombre TEXT,
    p_familia TEXT,
    p_iva NUMERIC
) RETURNS VOID AS $$
BEGIN
    -- Update productos_en_tienda table
    UPDATE productos_en_tienda
    SET
        precio_compra = p_precio_compra,
        precio_venta = p_precio_venta,
        cantidad = p_cantidad,
        updated_at = NOW()
    WHERE
        id = p_producto_en_tienda_id;

    -- Update codigos_barras table
    DELETE FROM codigos_barras
    WHERE producto_id = p_producto_en_tienda_id;

    -- Insert new codigos_barras rows
    IF p_codigos_barras IS NOT NULL THEN
        FOR i IN 0..jsonb_array_length(p_codigos_barras) - 1 LOOP
            INSERT INTO codigos_barras (codigo, producto_id, cantidad, created_at, updated_at)
            VALUES (
                p_codigos_barras->>i->>'codigo',
                p_producto_en_tienda_id,
                p_codigos_barras->>i->>'cantidad'::INT,
                NOW(),
                NOW()
            );
        END LOOP;
    END IF;

    -- Update productos table
    UPDATE productos
    SET
        nombre = p_nombre,
        familia = p_familia,
        iva = p_iva,
        updated_at = NOW()
    WHERE
        id = (
            SELECT producto_id
            FROM productos_en_tienda
            WHERE id = p_producto_en_tienda_id
        );
END;
$$ LANGUAGE plpgsql;
