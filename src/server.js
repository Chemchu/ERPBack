"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const router_1 = require("./router");
const apollo_server_express_1 = require("apollo-server-express");
const TypeDefs_1 = __importDefault(require("./apollo/TypeDefs"));
const Resolvers_1 = __importDefault(require("./apollo/Resolvers"));
dotenv_1.default.config();
let apiRouter = new router_1.Router();
const PORT = process.env.PORT || 5151;
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: TypeDefs_1.default,
    resolvers: Resolvers_1.default,
    context: ({ req }) => ({
        user: req.user
    })
});
function startApolloServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield server.start();
        server.applyMiddleware({
            app: apiRouter.App,
            bodyParserConfig: {
                limit: '10mb',
            }
        });
        yield apiRouter.SetRoutes();
    });
}
startApolloServer();
apiRouter.App.listen(PORT, () => {
    console.log(`Servidor en marcha: puerto ${PORT}.`);
});
