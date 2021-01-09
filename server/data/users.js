const { gql } = require('apollo-server-express');
const typeDefs = require('../schema');

const users = [
    {
        id: "0",
        username: "admin",
        password: "admin",
        access: 1,
    },
];
module.exports = users;