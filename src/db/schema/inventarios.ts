import { pgTable, uuid, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const inventarios = pgTable('inventarios', {
    id: uuid('id').primaryKey(),
    descripcion: text('descripcion').notNull(),
    inventarioCerrado: boolean('inventario_cerrado').notNull().default(false),
    fechaInicio: timestamp('fecha_inicio', { precision: 6, withTimezone: true }).notNull(),
    fechaFin: timestamp('fecha_fin', { precision: 6, withTimezone: true }),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { precision: 6, withTimezone: true }).notNull().defaultNow(),
});