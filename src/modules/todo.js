import {getDateKeyFromDate} from '../util/date';
import createReducers from '../util/createReducer';

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
  loadTodos: (dateKey) => ({type: todoActionTypes.LOAD_TODOS, payload: dateKey}),
  addTodo: (text) => ({type: todoActionTypes.ADD_TODO, payload: text}),
  removeTodo: (id) => ({type: todoActionTypes.REMOVE_TODO, payload: id}),
  toggleTodo: (id) => ({type: todoActionTypes.TOGGLE_TODO, payload: id}),
  changeDate: (dateKey) => ({type: todoActionTypes.CHANGE_DATE, payload: dateKey}),
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