import { gql } from "apollo-server-express";

const fileDefs = gql`
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

export default fileDefs;