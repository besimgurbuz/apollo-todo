const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    getTodos: [Todo!]!
  }

  type Todo {
    id: ID!
    title: String!
    dueDate: String
    completed: Boolean!
  }
`;

module.exports = typeDefs;