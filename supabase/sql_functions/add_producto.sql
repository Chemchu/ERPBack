-- CREATE OR REPLACE FUNCTION crear_producto(nombre TEXT, 
--     familia TEXT,
--     precioCompra NUMERIC, 
--     precio NUMERIC, 
--     iva NUMERIC, 
--     margen NUMERIC, 
--     cantidad NUMERIC, 
--     proveedorId UUID := null,
--     codigos_de_barra TEXT[]) 
-- RETURNS UUID AS $$
-- DECLARE 
--     id UUID;
--     codigo TEXT;
-- BEGIN
--     id := uuid_generate_v4();
--     INSERT INTO public.productos (id, nombre, familia, precio_compra, precio_venta, iva, cantidad, proveedor_id, alta, created_at, margen) 
--     VALUES (id, nombre, familia, precioCompra, precio, iva, cantidad, proveedorId, true, current_timestamp, margen);
    
--     -- Insertar codigos de barra en la tabla de codigos de barra
--     FOREACH codigo IN ARRAY codigos_de_barra
--     LOOP
--         INSERT INTO public.codigos_de_barra (ean_id, producto_id, ean, created_at) 
--         VALUES (uuid_generate_v4(), id, codigo, current_timestamp);
--     END LOOP;
-- END;
-- $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION crear_producto(
    nombre TEXT, 
    familia TEXT,
    precioCompra NUMERIC, 
    precio NUMERIC, 
    iva NUMERIC, 
    margen NUMERIC, 
    cantidad NUMERIC, 
    codigos_de_barra TEXT[],
    proveedorId UUID DEFAULT NULL
) RETURNS UUID AS $$
DECLARE 
    id UUID;
    codigo TEXT;
BEGIN
    id := uuid_generate_v4();
    INSERT INTO public.productos (
        id, 
        nombre, 
        familia, 
        precio_compra, 
        precio_venta, 
        iva, 
        cantidad, 
        proveedor_id, 
        alta, 
        created_at, 
        margen
    ) VALUES (
        id, 
        nombre, 
        familia, 
        precioCompra, 
        precio, 
        iva, 
        cantidad, 
        proveedorId, 
        true, 
        current_timestamp, 
        margen
    );
    
    FOREACH codigo IN ARRAY codigos_de_barra
    LOOP
        INSERT INTO public.codigos_de_barra (
            ean_id, 
            producto_id, 
            ean, 
            created_at
        ) VALUES (
            uuid_generate_v4(), 
            id, 
            codigo, 
            current_timestamp
        );
    END LOOP;
    RETURN id;
END;
$$ LANGUAGE plpgsql;
