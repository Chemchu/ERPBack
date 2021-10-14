"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require('./router.js');
const dotenv = require("dotenv");
dotenv.config();
let apiRouter = new Router();
const PORT = process.env.PORT || 5151;
apiRouter.App.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
