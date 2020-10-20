import React from 'react';
import styled from "styled-components";
import {getDateFromDateKey, getDisplayDate, getDisplayDay} from "../util/date";

const TodoHeadDateBlock = styled.div`
  display: grid;  
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }
  .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 21px;
  } 
`;

function TodoHeadDate({selectedKey}) {
    const currentDate = getDateFromDateKey(selectedKey);
    return (
        <TodoHeadDateBlock>
            <h1>{getDisplayDate(currentDate)}</h1>
            <div className="day">
                {getDisplayDay(currentDate)}
            </div>
        </TodoHeadDateBlock>
    );
}

export default React.memo(TodoHeadDate);