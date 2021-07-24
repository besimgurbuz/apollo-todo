import styled from '@emotion/styled';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import { unit } from '../styles';
import moment from 'moment';
import { gql, useMutation } from '@apollo/client';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from './alert';
import { Color } from '@material-ui/lab/Alert';

const ADD_TODO = gql`
  mutation AddTodoMutation($body: String!, $dueDate: String!) {
    addTodo(body: $body, dueDate: $dueDate) {
      code
      message
      success
      todo {
        id
        dueDate
        title
        completed
      }
    }
  }
`;

const AddEntry = () => {
  const [opened, toggleForm] = useState(false);
  const [entryBody, setEntryBody] = useState('');
  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD')
  );
  const [toastOpen, setOpen] = useState(false);
  const [toastType, setToastType] = useState<Color>('error');
  const [addTodo, { loading, error, data }] = useMutation(ADD_TODO);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    addTodo({
      variables: { body: entryBody, dueDate: selectedDate },
      update(cache, { data: { addTodo } }) {
        cache.modify({
          fields: {
            getTodos(existingTodos = []) {
              const newTodoRef = cache.writeFragment({
                data: addTodo.todo,
                fragment: gql`
                  fragment NewTodo on Todo {
                    id
                    type
                  }
                `,
              });
              return [...existingTodos, newTodoRef];
            },
          },
        });
      },
    });

    setToastType(error || data?.addTodo?.success ? 'error' : 'success');
    setOpen(true);
  };

  const handleClose = (_: any, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  if (!opened) {
    return (
      <Button
        style={{ textTransform: 'capitalize' }}
        variant='contained'
        disableElevation
        onClick={() => toggleForm(true)}
      >
        Add todo
      </Button>
    );
  }
  return (
    <>
      <AddTodoForm onSubmit={(e) => handleSubmit(e)}>
        <TextField
          name='todo-body'
          label='Todo body'
          value={entryBody}
          onChange={(e: any) => setEntryBody(e.target.value)}
          multiline
          rows={4}
          variant='outlined'
        />
        <TextField
          name='date'
          label='Due date'
          value={selectedDate}
          onChange={(e: any) => setSelectedDate(e.target.value)}
          type='date'
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          style={{ textTransform: 'capitalize' }}
          type='submit'
          variant='outlined'
          color='primary'
        >
          Save
        </Button>
      </AddTodoForm>
      <Button
        style={{ textTransform: 'capitalize' }}
        variant='contained'
        disableElevation
        onClick={() => toggleForm(false)}
      >
        Close add todo form
      </Button>
      <Snackbar open={toastOpen} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={toastType}>
          {data?.addTodo?.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddEntry;

const AddTodoForm = styled.form({
  display: 'flex',
  flexDirection: 'column',
  gap: `${unit}px`,
});
