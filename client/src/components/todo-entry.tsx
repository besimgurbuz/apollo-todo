import styled from '@emotion/styled';
import moment from 'moment';
import React, { ChangeEvent } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

import CloseIcon from '../icons/close-icon';
import { colors, unit } from '../styles';
import { gql, useMutation } from '@apollo/client';

const DISPATCH_COMPLETE = gql`
  mutation dispatchCompleteTodo($id: ID!) {
    completeTodo(id: $id) {
      code
      message
      success
      todo {
        completed
        id
        title
        dueDate
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
}

const TodoEntry = ({ todo }: Props) => {
  const { id, completed, title, dueDate } = todo;
  const [completeQuery, { loading, error, data }] = useMutation(
    DISPATCH_COMPLETE,
    { variables: { id } }
  );

  const dispatchCompleteTodo = (event: ChangeEvent) => {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      completeQuery();
      console.log(loading, error, data);
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
          color: completed ? colors.grey : colors.primary,
        }}
      />
      <EntryBodyContainer checked={completed}>
        <h2>{title}</h2>
        <p>{moment(dueDate).fromNow()}</p>
      </EntryBodyContainer>
      <RemoveIcon />
    </TodoEntryContainer>
  );
};

export default TodoEntry;

const TodoEntryContainer = styled.div((props: { completed: boolean }) => ({
  display: 'flex',
  flexDirection: 'row',
  border: `solid 1px ${props.completed ? colors.grey : colors.secondary}`,
  color: props.completed ? colors.grey : 'black',
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
  },
}));

const RemoveIcon = styled(CloseIcon)({
  position: 'absolute',
  top: `${unit}px`,
  right: `${unit}px`,
});
