const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const path = require('path');

const app = express();
const port = 4000;

/**
 * loadFilesSync로, 현재폴더(__dirname)에 있는, 모든폴더(**) 속 ~.graphql로 끝나는 모든파일(*) 불러오기
 */
const loadedFiles = loadFilesSync('**/*', {
    extensions: ['graphql']
})

const loadedResolvers = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"), {

})

const schema = makeExecutableSchema({
    typeDefs: loadedFiles,
    resolvers: loadedResolvers
})

app.listen(port, () => {
    console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);
})
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));
