import { pgTable, uuid, timestamp } from "drizzle-orm/pg-core";
import { empleados } from "./empleados";

export const mermas = pgTable('mermas', {
    id: uuid('id').primaryKey(),
    empleadosId: uuid('empleados_id').notNull().references(() => empleados.id),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
});