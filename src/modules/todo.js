import {getDateKeyFromDate} from '../util/date';
import createReducers from '../util/createReducer';
import todoApi from '../api/todoApi';

export const todoActionTypes = {
  LOAD_TODOS: 'todo/LOAD_TODOS',
  LOAD_TODOS_SUCCESS: 'todo/LOAD_TODOS_SUCCESS',
  LOAD_TODOS_FAILURE: 'todo/LOAD_TODOS_FAILURE',

  ADD_TODO: 'todo/ADD_TODO',
  ADD_TODO_SUCCESS: 'todo/ADD_TODO_SUCCESS',
  ADD_TODO_FAILURE: 'todo/ADD_TODO_FAILURE',

  REMOVE_TODO: 'todo/REMOVE_TODO',
  REMOVE_TODO_SUCCESS: 'todo/REMOVE_TODO_SUCCESS',
  REMOVE_TODO_FAILURE: 'todo/REMOVE_TODO_FAILURE',

  TOGGLE_TODO: 'todo/TOGGLE_TODO',
  TOGGLE_TODO_SUCCESS: 'todo/TOGGLE_TODO_SUCCESS',
  TOGGLE_TODO_FAILURE: 'todo/TOGGLE_TODO_FAILURE',

  CHANGE_DATE: 'todo/CHANGE_DATE',
  CHANGE_DATE_SUCCESS: 'todo/CHANGE_DATE_SUCCESS',
  CHANGE_DATE_FAILURE: 'todo/CHANGE_DATE_FAILURE',
};

export const todoActionCreators = {
  loadTodos: () => ({type: todoActionTypes.LOAD_TODOS}),
  addTodo: (text) => ({type: todoActionTypes.ADD_TODO, payload: text}),
  removeTodo: (id) => ({type: todoActionTypes.REMOVE_TODO, payload: id}),
  toggleTodo: (id) => ({type: todoActionTypes.TOGGLE_TODO, payload: id}),
  changeDate: (dateKey) => ({
    type: todoActionTypes.CHANGE_DATE,
    payload: dateKey,
  }),
};

export const todoThunkActions = {
  loadTodos: (dateKey) => async (dispatch, getState) => {
    dispatch(todoActionCreators.loadTodos());
    try {
      const todos = await todoApi.getTodos(dateKey);
      dispatch({type: todoActionTypes.LOAD_TODOS_SUCCESS, payload: todos});
    } catch (e) {
      dispatch({type: todoActionTypes.LOAD_TODOS_FAILURE, error: e});
    }
  },
  addTodo: (text) => async (dispatch, getState) => {
    const todo = {
      text: text,
      done: false,
    };
    dispatch(todoActionCreators.addTodo(todo));
    try {
      const id = await todoApi.addTodo(getState().todo.dateKey, todo);
      todo.id = id;
      dispatch({type: todoActionTypes.ADD_TODO_SUCCESS, payload: todo});
    } catch (e) {
      dispatch({type: todoActionTypes.ADD_TODO_FAILURE, error: e});
    }
  },
  toggleTodo: (id) => async (dispatch, getState) => {
    dispatch(todoActionCreators.toggleTodo(id));
    try {
      await todoApi.toggleTodo(getState().todo.dateKey, id);
      dispatch({type: todoActionTypes.TOGGLE_TODO_SUCCESS, payload: id});
    } catch (e) {
      dispatch({type: todoActionTypes.TOGGLE_TODO_FAILURE, error: e});
    }
  },
  removeTodo: (id) => async (dispatch, getState) => {
    dispatch(todoActionCreators.removeTodo(id));
    try {
      await todoApi.removeTodo(getState().todo.dateKey, id);
      dispatch({type: todoActionTypes.REMOVE_TODO_SUCCESS, payload: id});
    } catch (e) {
      dispatch({type: todoActionTypes.REMOVE_TODO_FAILURE, error: e});
    }
  },
  changeDate: (nextDateKey) => (dispatch, getState) => {
    dispatch(todoActionCreators.changeDate(nextDateKey));
  },
};

const initialState = {
  loadTodosRequest: false,
  loadTodosDone: false,
  loadTodosError: null,

  addTodoRequest: false,
  addTodoDone: false,
  addTodoError: null,

  removeTodoRequest: false,
  removeTodoDone: false,
  removeTodoError: null,

  toggleTodoRequest: false,
  toggleTodoDone: false,
  toggleTodoError: null,

  todos: [],
  dateKey: getDateKeyFromDate(),
};

const todoReducer = createReducers(initialState, {
  [todoActionTypes.LOAD_TODOS]: (state, action) => {
    return {
      ...state,
      loadTodosRequest: true,
      loadTodosDone: false,
      loadTodosError: null,
    };
  },
  [todoActionTypes.LOAD_TODOS_SUCCESS]: (state, action) => {
    return {
      ...state,
      loadTodosRequest: false,
      loadTodosDone: true,
      loadTodosError: null,
      todos: action.payload,
    };
  },
  [todoActionTypes.LOAD_TODOS_FAILURE]: (state, action) => {
    return {
      ...state,
      loadTodosRequest: false,
      loadTodosDone: false,
      loadTodosError: action.error,
    };
  },

  [todoActionTypes.ADD_TODO]: (state, action) => {
    return {
      ...state,
      addTodoRequest: true,
      addTodoError: null,
      addTodoDone: false,
    };
  },
  [todoActionTypes.ADD_TODO_SUCCESS]: (state, action) => {
    return {
      ...state,
      addTodoRequest: false,
      addTodoDone: true,
      todos: state.todos.concat(action.payload),
    };
  },
  [todoActionTypes.ADD_TODO_FAILURE]: (state, action) => {
    return {
      ...state,
      addTodoRequest: false,
      addTodoError: action.error,
    };
  },

  [todoActionTypes.TOGGLE_TODO]: (state, action) => {
    return {
      ...state,
      toggleTodoRequest: true,
      toggleTodoDone: false,
      toggleTodoError: null,
    };
  },
  [todoActionTypes.TOGGLE_TODO_SUCCESS]: (state, action) => {
    return {
      ...state,
      toggleTodoDone: true,
      toggleTodoRequest: false,
      todos: state.todos.map(todo => todo.id === action.payload ?
          {...todo, done: !todo.done} :
          todo),
    };
  },
  [todoActionTypes.TOGGLE_TODO_FAILURE]: (state, action) => {
    return {
      ...state,
      toggleTodoRequest: false,
      toggleTodoError: action.error,
    };
  },

  [todoActionTypes.REMOVE_TODO]: (state, action) => {
    return {
      ...state,
      removeTodoRequest: true,
      removeTodoDone: false,
      removeTodoError: null,
    };
  },
  [todoActionTypes.REMOVE_TODO_SUCCESS]: (state, action) => {
    return {
      ...state,
      removeTodoDone: true,
      removeTodoRequest: false,
      todos: state.todos.filter(todo => todo.id !== action.payload),
    };
  },
  [todoActionTypes.REMOVE_TODO_FAILURE]: (state, action) => {
    return {
      ...state,
      removeTodoRequest: false,
      removeTodoError: action.error,
    };
  },

  [todoActionTypes.CHANGE_DATE]: (state, action) => {
    return {
      ...state,
      dateKey: action.payload,
    };
  },
});

export default todoReducer;