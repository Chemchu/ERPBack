"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const fileDefs = (0, apollo_server_express_1.gql) `
    type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Mutation {
    uploadProductos(file: Upload!): File!
    uploadClientes(file: Upload!): File!
  }
`;
exports.default = fileDefs;
