import { ApolloServer } from "apollo-server";
import { schema } from "./schema";
import { context } from "./context";
export const server = new ApolloServer({
  schema,
  context,
});

const port = process.env.PORT || 4500;
server.listen({ port }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

// import { ApolloServer } from "apollo-server";
// import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

// import { schema } from "./schema";
// export const server = new ApolloServer({
//     schema,
//     plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],

// });

// const port = 3000;
// server.listen({port}).then(({ url }) => {
//     console.log(`🚀  Server ready at ${url}`);
// });
