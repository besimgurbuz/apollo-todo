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
}

module.exports = TodoRepository;