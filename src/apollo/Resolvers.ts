import { gql } from "apollo-server-express"
import { Database } from "../databases/database";
import { productoResolver, productosResolver } from "./schema/producto/productoResolver";

const Resolvers = {
    Query: {
        producto: productoResolver,
        productos: productosResolver,
    },
};

export default Resolvers