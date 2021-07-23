const resolvers = {
  Query: {
    getTodos: (_, __, { dataSources }) => {
      return dataSources.todoRepository.getTodos();
    }
  }
};

module.exports = resolvers;