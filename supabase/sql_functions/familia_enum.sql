CREATE TYPE familia AS ENUM 
    ('Bebida', 'Drogueria', 'Alimentacion', 'Servicio', 'Snack', 'Vino', 'Otro',
    'Bolleria dulce', 'Bolleria salada', 'Alcohol', 'Panaderia', 'Nevera', 'Congelado', 'Helado');

CREATE FUNCTION get_familia_enum_values()
  RETURNS SETOF familia
AS $$
BEGIN
  RETURN QUERY SELECT unnest(enum_range(NULL::familia));
END;
$$ LANGUAGE plpgsql;