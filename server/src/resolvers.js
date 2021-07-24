const uuid = require('uuid').v4;

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
          code: 200,
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
    },
    deleteTodo: async (_, { id }, { dataSources }) => {
      try {
        const deleted = await dataSources.todoRepository.deleteTodo(id);

        return {
          code: 204,
          success: true,
          message: `Successfully deleted ${id}`,
          todo: deleted
        };
      } catch (err) {
        return {
          code: err.extensions ? err.extensions.response.status : 400,
          success: false,
          message: err.extensions ? err.extensions.response.body : err.message,
          todo: null
        };
      }
    },
    addTodo: async (_, { body, dueDate }, { dataSources }) => {
      try {
        const newTodo = { id: uuid(), title: body, dueDate: new Date(dueDate).toISOString(), completed: false };
        const insertResult = await dataSources.todoRepository.addTodo(newTodo);

        return {
          code: 201,
          success: true,
          message: 'New todo created',
          todo: newTodo
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