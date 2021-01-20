import { Todo } from "../models/Todo";
import createStorage from "../util/createStorage";

const delay = (n: number) => new Promise((resolve) => setTimeout(resolve, n));
const TODO_KEY: string = "todolist";
const storage = createStorage(TODO_KEY);
const todoInfo = storage.get();

const todoApi = {
  addTodo: async (key: string, todo: Todo) => {
    await delay(500);
    if (!todoInfo.hasOwnProperty(key)) {
      todoInfo[key] = [];
    }
    todoInfo[key].push({
      ...todo,
    });
    storage.set(todoInfo);
  },
  getTodos: async (key: string): Promise<Todo[]> => {
    await delay(500);
    if (!todoInfo.hasOwnProperty(key)) {
      todoInfo[key] = [];
    }
    return [
      ...todoInfo[key].map((todo: Todo) => {
        return {
          ...todo,
        };
      }),
    ];
  },
  getTodo: async (key: string, id: number): Promise<Todo> => {
    await delay(500);
    if (!todoInfo.hasOwnProperty(key)) {
      todoInfo[key] = [];
    }
    const todo = todoInfo[key].find((todo: Todo) => todo.id === id);
    return todo ? { ...todo } : null;
  },
  removeTodo: async (key: string, id: number) => {
    await delay(500);
    const removeIndex = todoInfo[key].findIndex((todo: Todo) => todo.id === id);
    if (removeIndex > -1) {
      todoInfo[key].splice(removeIndex, 1);
    }
    storage.set(todoInfo);
  },
  toggleTodo: async (key: string, id: number) => {
    await delay(500);
    const findObj = todoInfo[key].find((todo: Todo) => todo.id === id);
    if (findObj) {
      findObj.done = !findObj.done;
    }
    storage.set(todoInfo);
  },
};

export default todoApi;
