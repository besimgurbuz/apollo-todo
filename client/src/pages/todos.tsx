import { gql, useMutation, useQuery } from '@apollo/client';
import styled from '@emotion/styled';
import { RouteComponentProps } from '@reach/router';
import React from 'react';
import { Layout, QueryResult } from '../components';
import AddEntry from '../components/add-entry';
import TodoEntry from '../components/todo-entry';
import { colors, unit } from '../styles';

const GET_TODOS = gql`
  query getTodos {
    getTodos {
      id
      title
      completed
      dueDate
    }
  }
`;

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

interface Props extends RouteComponentProps {}

const Todos = (_: Props) => {
  const { loading, error, data } = useQuery(GET_TODOS);
  const [deleteTodo] = useMutation(DELETE_TODO);
  return (
    <Layout grid>
      <QueryResult loading={loading} error={error} data={data}>
        <TodosContainer>
          <EntryListContainer>
            {data?.getTodos?.length > 0 ? (
              data?.getTodos?.map((todo: any) => (
                <TodoEntry
                  key={todo?.id}
                  todo={todo}
                  onDeleteTodo={(id) => {
                    deleteTodo({
                      variables: { id },
                      update(cache) {
                        cache.modify({
                          fields: {
                            getTodos(existingTodoRefs, { readField }) {
                              return existingTodoRefs.filter(
                                (todoRef: any) =>
                                  id !== readField('id', todoRef)
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
          <AddEntry />
        </TodosContainer>
      </QueryResult>
    </Layout>
  );
};

export default Todos;

const TodosContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: `${unit * 3}px`,
});

const EntryListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '1em',
  p: {
    fontWeight: 600,
    color: colors.accent,
  },
});
