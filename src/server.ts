import dotenv from 'dotenv';
import { Router } from './router';
import { ApolloServer, gql } from 'apollo-server-express';

// Para leer en la variable .env
dotenv.config();

// Crea las rutas del API y las enruta
let apiRouter = new Router();

// set port, listen for requests
const PORT = process.env.PORT || 5151;

const server = new ApolloServer({
  typeDefs: gql`
    type Query {
      hello: String
    }
  `,
  resolvers: {
    Query: {
      hello: () => 'Hello world!',
    },
  }
});

async function startApolloServer() {
  // Inicia apollo server (hay un bug que obliga hacerlo de esta forma)
  await server.start();

  // Añadir serverRegistration a Apollo
  server.applyMiddleware({ app: apiRouter.App });
}

// Inicia el servidor
startApolloServer();

// Enruta los diferentes componentes del api
apiRouter.SetRoutes();

// Inicia el listener en los puertos
apiRouter.App.listen(PORT, () => {
  console.log(`Servidor en marcha: puerto ${PORT}.`);
});

