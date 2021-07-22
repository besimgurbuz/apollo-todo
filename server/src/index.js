const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');

const mocks = {
  Query: () => ({
    getTodos: () => [...new Array(9)],
  }),
  Todo: () => ({
    id: () => 'todo_01',
    title: () => 'Todo title',
    dueDate: () => '2021-07-22T17:42:09.721Z',
    completed: () => false
  }),
};

const server = new ApolloServer({
  typeDefs,
  mocks,
});

server.listen().then(() => {
  console.log(`
    Server is running on port 4000
  `)
})