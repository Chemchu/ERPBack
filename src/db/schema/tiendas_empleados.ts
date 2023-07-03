import { pgTable, uuid } from "drizzle-orm/pg-core";
import { empleados } from "./empleados";
import { tiendas } from "./tiendas";

export const tiendasEmpleados = pgTable('tiendasEmpleados', {
    id: uuid('id').primaryKey(),
    tiendaId: uuid('tienda_id').notNull().references(() => tiendas.id),
    empleadoId: uuid('empleado_id').notNull().references(() => empleados.id),
});