const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
/**
 * loadFilesSync로, 현재폴더(__dirname)에 있는, 모든폴더(**) 속 ~.graphql로 끝나는 모든파일(*) 불러오기
 */
const loadedFiles = loadFilesSync('**/*', { extensions: ['graphql'] })
const loadedResolvers = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"), {})
const port = 4000;  

async function startApolloServer() {
  const app = express();

  const schema = makeExecutableSchema({
    typeDefs: loadedFiles,
    resolvers: loadedResolvers
  })

  const server = new ApolloServer({
    schema
  })

  await server.start();

  server.applyMiddleware({ app, path: '/graphql' });

  
  app.listen(port, () => {
    console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);
  })
}

startApolloServer();
