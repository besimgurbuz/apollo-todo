const resolvers = {
  Query: {
    getTodos: (_, __, { dataSources }) => {
      return dataSources.todoRepository.getTodos();
    }
  },
  Mutation: {
    completeTodo: async (_, { id }, { dataSources }) => {
      try {
        const completedResult = await dataSources.todoRepository.completeTodo(id);

        return {
          code: 204,
          success: true,
          message: `Successfully updated todo ${id}`,
          todo: completedResult
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