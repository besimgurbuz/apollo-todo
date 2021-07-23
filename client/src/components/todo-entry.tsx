import styled from '@emotion/styled';
import moment from 'moment';
import React from 'react';
import CloseIcon from '../icons/close-icon';
import { colors, unit } from '../styles';

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

  return (
    <TodoEntryContainer completed={completed}>
      <EntryCompletedSwitch type='checkbox' />
      <EntryBodyContainer>
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
  border: `solid 1px ${props.completed ? colors.primary : colors.secondary}`,
  borderRadius: unit,
  minWidth: 300,
  padding: `${unit}px ${unit * 4}px`,
  gap: `${unit}px`,
  position: 'relative',
}));

const EntryCompletedSwitch = styled.input({
  width: `${unit * 2}px`,
  height: `${unit * 2}px`,
  position: 'absolute',
  left: `${unit}px`,
  top: `${unit}px`,
});

const EntryBodyContainer = styled.div({
  flex: 2,
  display: 'flex',
  flexDirection: 'column',
  gap: `${unit}px`,
  h2: {
    margin: 0,
    fontWeight: 500,
    fontSize: `${unit * 2.5}px`,
  },
  p: {
    margin: 0,
    fontSize: `${unit * 1.5}px`,
  },
});

const RemoveIcon = styled(CloseIcon)({
  position: 'absolute',
  top: `${unit}px`,
  right: `${unit}px`,
});
