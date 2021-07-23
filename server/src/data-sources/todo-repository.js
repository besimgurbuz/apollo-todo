const { MongoDataSource } = require('apollo-datasource-mongodb');

class TodoRepository extends MongoDataSource {
  #collectionName = 'todos';

  getTodos() {
    return this.collection.find().toArray();
  }
}

module.exports = TodoRepository;