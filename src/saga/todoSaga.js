import {put, takeLatest, call, select} from 'redux-saga/effects';
import {todoActionTypes} from '../modules/todo';
import todoApi from '../api/todoApi';

function* loadTodos(action) {
  const dateKey = action.payload;
  try {
    const todos = yield call(todoApi.getTodos, dateKey);
    yield put({type: todoActionTypes.LOAD_TODOS_SUCCESS, payload: todos});
  } catch (e) {
    yield put({type: todoActionTypes.LOAD_TODOS_FAILURE, error: e});
  }
}

function* addTodo(action) {
  const todo = {
    text: action.payload,
    done: false,
  };
  try {
    const {dateKey} = yield select(state => state.todo);
    const id = yield call(todoApi.addTodo, dateKey, todo);
    yield put({type: todoActionTypes.ADD_TODO_SUCCESS, payload: {...todo, id: id}});
  } catch (e) {
    yield put({type: todoActionTypes.ADD_TODO_FAILURE, error: e.message});
  }
}

function* toggleTodo(action) {
  try {
    const {dateKey} = yield select(state => state.todo);
    yield call(todoApi.toggleTodo, dateKey, action.payload);
    yield put({type: todoActionTypes.TOGGLE_TODO_SUCCESS, payload: action.payload});
  } catch (e) {
    yield put({type: todoActionTypes.TOGGLE_TODO_FAILURE, error: e.message});
  }
}

function* removeTodo(action) {
  try {
    const {dateKey} = yield select(state => state.todo);
    yield call(todoApi.removeTodo, dateKey, action.payload);
    yield put({type: todoActionTypes.REMOVE_TODO_SUCCESS, payload: action.payload});
  } catch (e) {
    yield put({type: todoActionTypes.REMOVE_TODO_FAILURE, error: e.message});
  }
}

export function* todoSaga() {
  yield takeLatest(todoActionTypes.LOAD_TODOS, loadTodos);
  yield takeLatest(todoActionTypes.ADD_TODO, addTodo);
  yield takeLatest(todoActionTypes.TOGGLE_TODO, toggleTodo);
  yield takeLatest(todoActionTypes.REMOVE_TODO, removeTodo);
}