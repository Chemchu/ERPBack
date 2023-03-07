-- CreateTable
CREATE TABLE "Venta" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "clienteId" UUID NOT NULL,
    "tipo" TEXT NOT NULL,
    "valorTotalSinDto" DOUBLE PRECISION NOT NULL,
    "valorTotalPagado" DOUBLE PRECISION NOT NULL,
    "pagadoEnEfectivo" DOUBLE PRECISION NOT NULL,
    "pagadoEnTarjeta" DOUBLE PRECISION NOT NULL,
    "cambio" DOUBLE PRECISION NOT NULL,
    "dtoPorcentaje" DOUBLE PRECISION NOT NULL,
    "dtoDinero" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,
    "tpvId" UUID NOT NULL,

    CONSTRAINT "Venta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Producto" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombre" TEXT NOT NULL,
    "familia" TEXT NOT NULL,
    "proveedorId" UUID NOT NULL,
    "codigosEan" TEXT[],
    "precioCompra" DOUBLE PRECISION NOT NULL,
    "precioVenta" DOUBLE PRECISION NOT NULL,
    "iva" DOUBLE PRECISION NOT NULL,
    "cantidad" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "alta" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductoComprado" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombre" TEXT NOT NULL,
    "familia" TEXT NOT NULL,
    "proveedorId" UUID NOT NULL,
    "codigosEan" TEXT[],
    "precioCompra" DOUBLE PRECISION NOT NULL,
    "iva" DOUBLE PRECISION NOT NULL,
    "dto" DOUBLE PRECISION NOT NULL,
    "cantidadComprada" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "albaranId" UUID,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "ProductoComprado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductoVendido" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombre" TEXT NOT NULL,
    "familia" TEXT NOT NULL,
    "proveedorId" UUID NOT NULL,
    "codigosEan" TEXT[],
    "precioCompra" DOUBLE PRECISION NOT NULL,
    "precioVenta" DOUBLE PRECISION NOT NULL,
    "precioVentaFinal" DOUBLE PRECISION NOT NULL,
    "iva" DOUBLE PRECISION NOT NULL,
    "dto" DOUBLE PRECISION NOT NULL,
    "cantidadVendida" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "alta" BOOLEAN NOT NULL DEFAULT true,
    "ventaId" UUID,

    CONSTRAINT "ProductoVendido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tpv" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombre" TEXT NOT NULL,
    "libre" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,

    CONSTRAINT "Tpv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombreCompleto" TEXT NOT NULL,
    "nif" TEXT NOT NULL,
    "telefono" TEXT,
    "direccion" TEXT,
    "pais" TEXT,
    "codigoPostal" TEXT,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proveedor" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombre" TEXT NOT NULL,
    "cif" TEXT NOT NULL,
    "telefono" TEXT,
    "direccion" TEXT,
    "pais" TEXT,
    "codigoPostal" TEXT,

    CONSTRAINT "Proveedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contacto" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombre" TEXT NOT NULL,
    "dni" TEXT,
    "email" TEXT,
    "telefono" TEXT,
    "direccion" TEXT,
    "pais" TEXT,
    "codigoPostal" TEXT,
    "proveedorId" UUID,

    CONSTRAINT "Contacto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Albaran" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "numFactura" TEXT NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(0) NOT NULL,
    "proveedorId" UUID NOT NULL,

    CONSTRAINT "Albaran_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Producto_nombre_key" ON "Producto"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Producto_codigosEan_key" ON "Producto"("codigosEan");

-- CreateIndex
CREATE UNIQUE INDEX "ProductoComprado_nombre_key" ON "ProductoComprado"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "ProductoComprado_codigosEan_key" ON "ProductoComprado"("codigosEan");

-- CreateIndex
CREATE UNIQUE INDEX "ProductoVendido_nombre_key" ON "ProductoVendido"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "ProductoVendido_codigosEan_key" ON "ProductoVendido"("codigosEan");

-- CreateIndex
CREATE UNIQUE INDEX "Tpv_nombre_key" ON "Tpv"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_nombreCompleto_key" ON "Cliente"("nombreCompleto");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_nif_key" ON "Cliente"("nif");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_telefono_key" ON "Cliente"("telefono");

-- CreateIndex
CREATE UNIQUE INDEX "Proveedor_nombre_key" ON "Proveedor"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Proveedor_cif_key" ON "Proveedor"("cif");

-- CreateIndex
CREATE UNIQUE INDEX "Albaran_numFactura_key" ON "Albaran"("numFactura");

-- AddForeignKey
ALTER TABLE "Venta" ADD CONSTRAINT "Venta_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venta" ADD CONSTRAINT "Venta_tpvId_fkey" FOREIGN KEY ("tpvId") REFERENCES "Tpv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "Proveedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductoComprado" ADD CONSTRAINT "ProductoComprado_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "Proveedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductoComprado" ADD CONSTRAINT "ProductoComprado_albaranId_fkey" FOREIGN KEY ("albaranId") REFERENCES "Albaran"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductoVendido" ADD CONSTRAINT "ProductoVendido_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "Proveedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductoVendido" ADD CONSTRAINT "ProductoVendido_ventaId_fkey" FOREIGN KEY ("ventaId") REFERENCES "Venta"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contacto" ADD CONSTRAINT "Contacto_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "Proveedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Albaran" ADD CONSTRAINT "Albaran_proveedorId_fkey" FOREIGN KEY ("proveedorId") REFERENCES "Proveedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
