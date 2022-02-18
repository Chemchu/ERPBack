import JwtValidatorDefs from "./schema/authentication/jwtValidatorDefs";
import LoginDefs from "./schema/authentication/loginDefs";
import ClienteDefs from "./schema/cliente/clienteDefs";
import EmpleadoDefs from "./schema/empleado/empleadoDefs";
import productoDefs from "./schema/producto/productoDefs";
import tpvDefs from "./schema/tpv/tpvDefs";
import VentaDefs from "./schema/venta/ventaDefs";

// Sin FileUpload, se hace mediante REST
const TypeDefs = [
    productoDefs,
    ClienteDefs,
    VentaDefs,
    EmpleadoDefs,
    tpvDefs,
    LoginDefs,
    JwtValidatorDefs,
];

export default TypeDefs