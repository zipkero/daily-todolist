import React, {useEffect} from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import {useDispatch, useSelector} from 'react-redux';
import {todoThunkActions} from '../modules/todo';

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px 48px;
  overflow-y: auto;
`;

function TodoList() {
  const {dateKey, todos} = useSelector(state => state.todo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(todoThunkActions.loadTodos(dateKey));
  }, [dateKey]);

  const onToggle = (id) => {
    dispatch(todoThunkActions.toggleTodo(id));
  };

  const onRemove = (id) => {
    dispatch(todoThunkActions.removeTodo(id));
  };

  return (
      <TodoListBlock>
        {todos && todos.map(todo => (
            <TodoItem key={todo.id} onToggle={onToggle}
                      onRemove={onRemove} {...todo}/>
        ))}
      </TodoListBlock>
  );
}

export default TodoList;