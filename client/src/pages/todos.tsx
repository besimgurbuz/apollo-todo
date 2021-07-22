import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Layout } from '../components';

interface Props extends RouteComponentProps {}

const Todos = (_: Props) => {
  return (
  <Layout grid>
    <h1>Todos Application</h1>
  </Layout>
  );
}

export default Todos;