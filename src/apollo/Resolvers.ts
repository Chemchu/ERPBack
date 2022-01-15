import { jwtValidatorResolver } from "./schema/authentication/jwtValidatorResolver";
import { loginResolver } from "./schema/authentication/loginResolver";
import { clienteResolver, clientesResolver } from "./schema/cliente/clienteResolver";
import { empleadoResolver, empleadosResolver } from "./schema/empleado/empleadoResolver";
import { productoResolver, productosResolver } from "./schema/producto/productoResolver";
import { ventaResolver, ventasResolver } from "./schema/venta/ventaResolver";

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
        validateJwt: jwtValidatorResolver
    },
};

export default Resolvers