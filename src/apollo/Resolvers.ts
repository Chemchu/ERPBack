import { productoResolver, productosResolver } from "./schema/producto/productoResolver";
import { ventaResolver, ventasResolver } from "./schema/venta/ventaResolver";

const Resolvers = {
    Query: {
        producto: productoResolver,
        productos: productosResolver,
        venta: ventaResolver,
        ventas: ventasResolver
    },
};

export default Resolvers