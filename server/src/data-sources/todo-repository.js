const { MongoDataSource } = require('apollo-datasource-mongodb');

class TodoRepository extends MongoDataSource {
  #collectionName = 'todos';

  getTodos() {
    return this.collection.find().toArray();
  }

  async changeComplete(id, status) {
    await this.collection.updateOne({ id }, { $set: { completed: status } });
    const updated = await this.collection.findOne({ id });

    if (updated) {
      return updated;
    }
    throw new Error('Todo not found');
  }

  async deleteTodo(id) {
    const deleted = await this.collection.findOneAndDelete({ id });

    if (deleted.value) {
      return deleted.value;
    }
    throw new Error('Todo not found');
  }

  addTodo(todo) {
    return this.collection.insertOne(todo);
  }
}

module.exports = TodoRepository;