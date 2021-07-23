import { gql, useMutation } from '@apollo/client';
import styled from '@emotion/styled';
import React from 'react';
import { colors } from '../styles';
import TodoEntry from './todo-entry';

const DELETE_TODO = gql`
  mutation deleteTodoMutation($id: ID!) {
    deleteTodo(id: $id) {
      code
      success
      message
      todo {
        id
        dueDate
        title
        completed
      }
    }
  }
`;

interface Props {
  todos: { id: string; title: string; dueDate: string; completed: boolean }[];
}

const EntryList = ({ todos }: Props) => {
  const [deleteTodo] = useMutation(DELETE_TODO);

  return (
    <EntryListContainer>
      {todos.length > 0 ? (
        todos.map((todo, index) => (
          <TodoEntry
            key={index}
            todo={todo}
            onDeleteTodo={(id) => {
              deleteTodo({
                variables: { id },
                update(cache) {
                  cache.modify({
                    fields: {
                      todos(existingTodoRefs, { readField }) {
                        return existingTodoRefs.filter(
                          (todoRef: any) => id !== readField('id', todoRef)
                        );
                      },
                    },
                  });
                },
              });
            }}
          />
        ))
      ) : (
        <p>There is no any todo left!</p>
      )}
    </EntryListContainer>
  );
};

export default EntryList;

const EntryListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '1em',
  p: {
    fontWeight: 600,
    color: colors.accent,
  },
});
