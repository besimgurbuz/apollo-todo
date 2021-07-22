import styled from '@emotion/styled';
import React from 'react';
import TodoEntry from './todo-entry';

interface Props {
  todos: {id: string, title: string, dueDate: string, completed: boolean}[];
}

const EntryList = ({todos}: Props) => {
  return (
    <EntryListContainer>
      {todos.map((todo, index) => <TodoEntry key={index} todo={todo}/>)}
    </EntryListContainer>
  );
};

export default EntryList;

const EntryListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '1em'
});