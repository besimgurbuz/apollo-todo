import styled from '@emotion/styled';
import React from 'react'
import { colors, unit } from '../styles';

interface Props {
  todo: {
    id: string;
    title: string;
    completed: boolean;
    dueDate: string;
  }
}

const TodoEntry = ({todo}: Props) => {
  const {id, completed, title, dueDate} = todo;

  return (
    <TodoEntryContainer completed={completed}>
      <input type="checkbox" />
      <div>
        <h2>{title}</h2>
        <p>{dueDate}</p>
      </div>
    </TodoEntryContainer>
  );
}

export default TodoEntry;

const TodoEntryContainer = styled.div((props: {completed: boolean}) => ({
  display: 'flex',
  flexDirection: 'row',
  border: `solid 1px ${props.completed ? colors.primary : colors.warn}`,
}));