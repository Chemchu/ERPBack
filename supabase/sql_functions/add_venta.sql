BEGIN
  NEW.precio_venta_total := (SELECT SUM(pv.cantidad_vendida * pv.precio_venta) FROM productos_vendidos pv WHERE pv.venta_id = NEW.id);
  RETURN NEW;
END;
