const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();
const port = 4000;

const schema = buildSchema(`
    type Query {
        posts: [Post]
        comments: [Comment]
    }
    type Post {
        id: ID!
        title: String!
        description: String!
        comments: [Comment]
    }
    type Comment {
        id: ID!
        text: String!
        likes: Int
    }
`)

const root = {
    posts: [
        {
            id: 'post1',
            title: 'Ii is a first post',
            description: 'It is a first post descrition',
            comments: [{
                id: 'comment1',
                text: 'It is a first comment',
                likes: 1
            }]
        },
        {
            id: 'post2',
            title: 'Ii is a second post',
            description: 'It is a second post descrition',
            comments: []
        },
        {
            id: 'post3',
            title: 'Ii is a third post',
            description: 'It is a third post descrition',
            comments: [{
                id: 'comment3',
                text: 'It is a third comment',
                likes: 5
            }]
        }
    ],
    comments: [
        {
            id: 'comment1',
            text: 'It is a first comment',
            likes: 1
        },
        {
            id: 'comment2',
            text: 'It is a second comment',
            likes: 0
        },
        {
            id: 'comment3',
            text: 'It is a third comment',
            likes: 5
        }
    ]
}

app.listen(port, () => {
    console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);
})
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
