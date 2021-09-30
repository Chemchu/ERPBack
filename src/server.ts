const {Router} = require('./router.js');
import dotenv = require('dotenv');

// Para leer en la variable .env
dotenv.config();

// Crea las rutas del API y las enruta
let apiRouter = new Router();

// set port, listen for requests
const PORT = process.env.PORT || 5151;

apiRouter.App.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

