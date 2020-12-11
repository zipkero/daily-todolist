import React from 'react';
import styled from 'styled-components';
import {IoIosArrowDropleft, IoIosArrowDropright} from 'react-icons/all';
import TodoHeadDate from './TodoHeadDate';
import {useDispatch, useSelector} from 'react-redux';
import {addDayFromDateKey} from '../util/date';
import {todoThunkActions} from '../modules/todo';

const TodoHeadBlock = styled.div`
  display: grid;
  padding: 24px 32px 24px;
  border-bottom: 1px solid #e9ecef;
`;

const TodoHeadGridBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TodoHeadRemainBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #20c997;
  font-size: 18px;
  margin-top: 20px;
  font-weight: bold;
`;

const TodoHeadArrowBlock = styled.div`
  width: 10%;
  cursor: pointer;
  opacity: 0.2;

  &:hover {
    opacity: 1;
  }
`;

function TodoHead() {
  const dispatch = useDispatch();

  const {dateKey, todos} = useSelector(state => state.todo);
  const remain = todos.filter(todo => !todo.done).length;

  const onChangeDate = (diff) => {
    const nextDateKey = addDayFromDateKey(dateKey, diff);
    dispatch(todoThunkActions.changeDate(nextDateKey));
  };

  return (
      <TodoHeadBlock>
        <TodoHeadGridBlock>
          <TodoHeadArrowBlock>
            <IoIosArrowDropleft onClick={() => onChangeDate(-1)} size="2.5em"/>
          </TodoHeadArrowBlock>
          <TodoHeadDate selectedKey={dateKey}/>
          <TodoHeadArrowBlock>
            <IoIosArrowDropright onClick={() => onChangeDate(1)} size="2.5em"/>
          </TodoHeadArrowBlock>
        </TodoHeadGridBlock>
        <TodoHeadRemainBlock><span>할 일 {remain}개 남음</span></TodoHeadRemainBlock>
      </TodoHeadBlock>
  );
}

export default TodoHead;