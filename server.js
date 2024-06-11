const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const app = express();
const port = 4000;

/**
 * loadFilesSync로, 현재폴더(__dirname)에 있는, 모든폴더(**) 속 ~.graphql로 끝나는 모든파일(*) 불러오기
 */
const loadedFiles = loadFilesSync('**/*', {
    extensions: ['graphql']
})

const schema = makeExecutableSchema({
    typeDefs: loadedFiles
})

const root = {
    posts: require('./posts/posts.model'),
    comments: require('./comments/comments.model')
}

app.listen(port, () => {
    console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);
})
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
