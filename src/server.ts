import dotenv from 'dotenv';
import { Router } from './router';
import { ApolloServer } from 'apollo-server-express';
import TypeDefs from './apollo/TypeDefs';
import Resolvers from './apollo/Resolvers';

// Para leer en la variable .env
dotenv.config();

// Crea las rutas del API y las enruta
let apiRouter = new Router();

// set port, listen for requests
const PORT = process.env.PORT || 5151;

const server = new ApolloServer({
  typeDefs: TypeDefs,
  resolvers: Resolvers,
  context: ({ req }) => ({
    user: req.user
  })
});

async function startApolloServer() {
  // Inicia apollo server (hay un bug que obliga hacerlo de esta forma)
  await server.start();

  // Añadir serverRegistration a Apollo
  server.applyMiddleware({
    app: apiRouter.App,
    bodyParserConfig: {
      limit: '10mb',
    }
  });

  // Enruta los diferentes componentes del api
  await apiRouter.SetRoutes();
}

// Inicia el servidor
startApolloServer();

// Inicia el listener en los puertos
apiRouter.App.listen(PORT, () => {
  console.log(`Servidor en marcha: puerto ${PORT}.`);
});

