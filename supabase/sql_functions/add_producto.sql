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