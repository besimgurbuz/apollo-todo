import styled from '@emotion/styled';
import moment from 'moment';
import React, { ChangeEvent } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

import CloseIcon from '../icons/close-icon';
import { colors, unit } from '../styles';
import { gql, useMutation } from '@apollo/client';

const DISPATCH_COMPLETE = gql`
  mutation dispatchCompleteTodo($id: ID!, $status: Boolean!) {
    changeComplete(id: $id, status: $status) {
      code
      success
      message
      todo {
        completed
        dueDate
        title
        id
      }
    }
  }
`;
interface Props {
  todo: {
    id: string;
    title: string;
    completed: boolean;
    dueDate: string;
  };
  onDeleteTodo: (id: string) => void;
}

const TodoEntry = ({ todo, onDeleteTodo }: Props) => {
  const { id, completed, title, dueDate } = todo;
  const [completeTodo] = useMutation(DISPATCH_COMPLETE, {
    variables: { id, status: true },
  });
  const [uncompleteTodo] = useMutation(DISPATCH_COMPLETE, {
    variables: { id, status: false },
  });

  const dispatchCompleteTodo = (event: ChangeEvent) => {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      completeTodo();
    } else {
      uncompleteTodo();
    }
  };

  return (
    <TodoEntryContainer completed={completed}>
      <Checkbox
        defaultChecked={completed}
        onChange={dispatchCompleteTodo}
        style={{
          position: 'absolute',
          margin: 0,
          padding: 0,
          top: unit,
          left: unit,
          color: completed ? colors.grey : colors.secondary,
        }}
      />
      <EntryBodyContainer checked={completed}>
        <h2>{title}</h2>
        <p>{moment(dueDate).fromNow()}</p>
      </EntryBodyContainer>
      <DeleteButton onClick={() => onDeleteTodo(id)}>
        <DeleteIcon />
      </DeleteButton>
    </TodoEntryContainer>
  );
};

export default TodoEntry;

const TodoEntryContainer = styled.div((props: { completed: boolean }) => ({
  display: 'flex',
  flexDirection: 'row',
  border: `solid 1px ${props.completed ? colors.grey : colors.secondary}`,
  color: props.completed ? colors.grey : colors.secondary,
  borderRadius: unit,
  minWidth: 300,
  padding: `${unit}px ${unit * 4}px`,
  gap: `${unit}px`,
  position: 'relative',
}));

const EntryBodyContainer = styled.div((props: { checked: boolean }) => ({
  flex: 2,
  display: 'flex',
  flexDirection: 'column',
  gap: `${unit}px`,
  h2: {
    margin: 0,
    textDecoration: props.checked ? 'line-through' : 'none',
    fontWeight: 500,
    fontSize: `${unit * 2.5}px`,
  },
  p: {
    margin: 0,
    fontSize: `${unit * 1.5}px`,
    color: props.checked ? colors.grey : colors.accent,
  },
}));

const DeleteButton = styled.button({
  cursor: 'pointer',
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  padding: 0,
  margin: 0,
});

const DeleteIcon = styled(CloseIcon)({
  position: 'absolute',
  top: `${unit}px`,
  right: `${unit}px`,
});
