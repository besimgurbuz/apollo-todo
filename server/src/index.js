require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const { MongoClient } = require('mongodb');

const TodoRepository = require('./data-sources/todo-repository');
const resolvers = require('./resolvers');
const typeDefs = require('./schema');

const { DB_USERNAME, DB_PASSWORD, DB_HOSTNAME } = process.env;

const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOSTNAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    todoRepository: new TodoRepository(client.db().collection('todos'))
  })
});

server.listen().then(() => {
  console.log('\nServer is running on port 4000\n')
})