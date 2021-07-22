import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Layout, QueryResult } from '../components';
import {gql, useQuery} from '@apollo/client';
import TodoEntry from '../components/todo-entry';
import EntryList from '../components/entry-list';

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

interface Props extends RouteComponentProps {}

const Todos = (_: Props) => {
  const {loading, error, data} = useQuery(GET_TODOS);

  return (
  <Layout grid>
    <QueryResult loading={loading} error={error} data={data}>
      <EntryList todos={data?.getTodos}/>
    </QueryResult>
  </Layout>
  );
}

export default Todos;