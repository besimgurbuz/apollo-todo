import { ApolloError } from '@apollo/client';
import React from 'react';
import { colors } from '../styles';
import Spinner from './spinner';

interface Props {
  loading: boolean;
  error?: ApolloError,
  data?: Record<string, unknown>,
  children?: any
}

const QueryResult = ({loading, error, data, children}: Props) => {
  if (error) {
    return <p style={{color: `${colors.warn}`, fontWeight: 700, fontSize: '1.5em'}}>ERROR: { error.message }</p>
  }

  if (loading) {
    return <Spinner width={100} height={100}/>
  }

  if (!data) {
    return <p>Nothing to show...</p>
  }

  if (data) {
    return children;
  }
};

export default QueryResult;