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
    typeDefs: loadedFiles,
    resolvers: {
        Query: {
            /* posts: (parent, args, context, info) => {
                //해당 필드의 부모(즉, resolver 체인의 이전 resolver)에 대한 resolver의 반환 값
                console.log('parent', parent)
                //해당 필드의 제공된 모든 graphQL 인수를 포함하는 객체
                console.log('args', args)
                //특정 작업에 대해 실행 중인 모든 resolver 간에 공유되는 object이다 인증정보, 데이터 로더 인스턴스  및 리졸버에서 추적할  기타 항목을 포함하여 작업별 상태를 공유하는데 사용
                console.log('context', context)
                //필드이름, 루트에서 필드까지의 경로 등을 포함하여 작업의 실행 상태에 대한 정보를 포함
                console.log('info', info)
                return parent.posts;
            }, */
            posts: async (parent, args, context, info) => {
                const product = await Promise.resolve(parent.posts);
                return product
            },
            comments: async (parent) => {
                const comment = await Promise.resolve(parent.comments)
                return comment
            }
        }
    }
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
