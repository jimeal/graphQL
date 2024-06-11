const express = require('express');
const { bulidSchema } = require('graphql');

const app = express();
const port = 4000;

app.listen(port, () => {
    console.log(`Running a GraphQL API server http://localhost:${port}/graphql`);
})