import JwtValidatorDefs from "./schema/authentication/jwtValidatorDefs";
import LoginDefs from "./schema/authentication/loginDefs";
import ClienteDefs from "./schema/cliente/clienteDefs";
import EmpleadoDefs from "./schema/empleado/empleadoDefs";
import productoDefs from "./schema/producto/productoDefs";
import VentaDefs from "./schema/venta/ventaDefs";

// Sin FileUpload, se hace mediante REST
const TypeDefs = [
    productoDefs,
    ClienteDefs,
    VentaDefs,
    EmpleadoDefs,
    LoginDefs,
    JwtValidatorDefs,
];

export default TypeDefs