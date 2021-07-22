import React, { Fragment } from 'react'
import { Router } from '@reach/router'

/* Pages */
import Todos from './todos';

export default function Pages() {
  return (
    <Router primary={false} component={Fragment}>
      <Todos path="/"/>
    </Router>
  );
}