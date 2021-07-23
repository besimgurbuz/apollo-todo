const { MongoDataSource } = require('apollo-datasource-mongodb');

class TodoRepository extends MongoDataSource {
  #collectionName = 'todos';

  getTodos() {
    return this.collection.find().toArray();
  }

  async completeTodo(id) {
    const updated = await this.collection.findOneAndUpdate({ id }, { $set: { completed: true } });

    if (updated.value) {
      return updated.value;
    }
    throw new Error('Todo not found');
  }
}

module.exports = TodoRepository;