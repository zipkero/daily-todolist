import React, {useEffect} from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import {useDispatch, useSelector} from 'react-redux';
import {todoActionCreators} from '../modules/todo';

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px 48px;
  overflow-y: auto;
`;

function TodoList() {
  const dispatch = useDispatch();
  const {dateKey, todos} = useSelector(state => state.todo);
  useEffect(() => {
    dispatch(todoActionCreators.loadTodos(dateKey));
  }, [dispatch, dateKey]);

  return (
      <TodoListBlock>
        {todos && todos.map(todo => <TodoItem key={todo.id} {...todo}/>)}
      </TodoListBlock>
  );
}

export default TodoList;