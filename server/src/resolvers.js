const resolvers = {
  Query: {
    getTodos: (_, __, { dataSources }) => {
      return dataSources.todoRepository.getTodos();
    }
  },
  Mutation: {
    changeComplete: async (_, { id, status }, { dataSources }) => {
      try {
        const changedResult = await dataSources.todoRepository.changeComplete(id, status);

        return {
          code: 204,
          success: true,
          message: `Successfully changed completed status of ${id}`,
          todo: changedResult
        }
      } catch (err) {
        return {
          code: err.extensions ? err.extensions.response.status : 400,
          success: false,
          message: err.extensions ? err.extensions.response.body : err.message,
          todo: null
        };
      }
    }
  }
};

module.exports = resolvers;