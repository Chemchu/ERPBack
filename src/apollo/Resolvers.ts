import { jwtValidatorResolver } from "./schema/authentication/jwtValidatorResolver";
import { loginResolver } from "./schema/authentication/loginResolver";
import { addClienteResolver, clienteResolver, clientesResolver, deleteClienteResolver, updateClienteResolver, uploadClienteFileResolver } from "./schema/cliente/clienteResolver";
import { addEmpleadoResolver, deleteEmpleadoResolver, empleadoResolver, empleadosResolver, updateEmpleadoResolver } from "./schema/empleado/empleadoResolver";
import { addProductoResolver, deleteProductoResolver, productoResolver, productosResolver, updateProductoResolver, uploadProductoFileResolver } from "./schema/producto/productoResolver";
import { addTpvResolver, deleteTpvResolver, freeTpvResolver, ocupyTpvResolver, tpvResolver, tpvsResolver, updateTpvResolver } from "./schema/tpv/tpvResolver";
import { addVentaResolver, deleteVentaResolver, updateVentaResolver, ventaResolver, ventasResolver } from "./schema/venta/ventaResolver";

const Resolvers = {
    Query: {
        producto: productoResolver,
        productos: productosResolver,
        venta: ventaResolver,
        ventas: ventasResolver,
        cliente: clienteResolver,
        clientes: clientesResolver,
        empleado: empleadoResolver,
        empleados: empleadosResolver,
        login: loginResolver,
        tpv: tpvResolver,
        tpvs: tpvsResolver,
        validateJwt: jwtValidatorResolver
    },
    Mutation: {
        addProducto: addProductoResolver,
        deleteProducto: deleteProductoResolver,
        updateProducto: updateProductoResolver,

        addCliente: addClienteResolver,
        deleteCliente: deleteClienteResolver,
        updateCliente: updateClienteResolver,

        addVenta: addVentaResolver,
        deleteVenta: deleteVentaResolver,
        updateVenta: updateVentaResolver,

        addEmpleado: addEmpleadoResolver,
        deleteEmpleado: deleteEmpleadoResolver,
        updateEmpleado: updateEmpleadoResolver,

        addTPV: addTpvResolver,
        deleteTPV: deleteTpvResolver,
        updateTPV: updateTpvResolver,
        ocupyTPV: ocupyTpvResolver,
        freeTPV: freeTpvResolver
    }
};

export default Resolvers