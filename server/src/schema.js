const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    getTodos: [Todo!]!
  }

  type Mutation {
    changeComplete(id: ID!, status: Boolean!): ChangeCompleteResponse!
    deleteTodo(id: ID!): DeleteTodoResponse!
    addTodo(body: String!, dueDate: String!): AddTodoResponse!
  }

  type ChangeCompleteResponse {
    code: Int!
    success: Boolean!
    message: String
    todo: Todo
  }

  type DeleteTodoResponse {
    code: Int!
    success: Boolean!
    message: String
    todo: Todo
  }

  type AddTodoResponse {
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