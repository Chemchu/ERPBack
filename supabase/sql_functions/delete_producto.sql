CREATE OR REPLACE FUNCTION eliminar_producto(
    productoId UUID
) RETURNS VOID AS $$
BEGIN
    DELETE FROM public.codigos_de_barra WHERE producto_id = productoId;
    DELETE FROM public.productos WHERE id = productoId;
END;
$$ LANGUAGE plpgsql;