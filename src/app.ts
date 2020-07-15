import Koa from "koa";
import koaBody from "koa-body";
import cors from "@koa/cors";
import helmet from "koa-helmet";
import { ApolloServer } from "apollo-server-koa";

import { router } from "./utils/router";
import { resolvers, typeDefs } from "./utils/graphqlSchema";
import { endpointURL, isDevelopment } from "./utils/config";
import getUser from "./utils/is-auth";
import getAgent from "./utils/getAgent";

const app = new Koa();

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: ({ ctx }) => {
    const isMobileApp = getAgent(ctx.req.headers.app);
    const token = ctx.req.headers.authorization || "";
    const user = getUser(token);
    return { user, isMobileApp };
  },
  //context:{},
  debug: isDevelopment,
});

app.use(helmet());
app.use(cors());
app.use(router.routes());
app.use(koaBody({ multipart: true }));
app.use(router.allowedMethods());

server.applyMiddleware({ app, path: endpointURL });

export default app;
