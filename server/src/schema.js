const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    getTodos: [Todo!]!
  }

  type Mutation {
    completeTodo(id: ID!): CompleteTodoResponse!
    removeTodo(id: ID!): RemoveTodoResponse!
  }

  type CompleteTodoResponse {
    code: Int!
    success: Boolean!
    message: String
    todo: Todo
  }

  type RemoveTodoResponse {
    code: Int!
    success: Boolean!
    message: String
    todo: Todo
  }

  type Todo {
    id: ID!
    title: String!
    dueDate: String
    completed: Boolean!
  }
`;

module.exports = typeDefs;