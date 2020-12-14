import createStorage from "../util/createStorage";
import uniqid from 'uniqid';

const delay = n => new Promise(resolve => setTimeout(resolve, n));
const TODO_KEY = 'todolist';
const storage = createStorage(TODO_KEY);
const todoInfo = storage.get();

const todoApi = {
    addTodo: async (key, todo) => {
        await delay(500);
        if (!todoInfo.hasOwnProperty(key)) {
            todoInfo[key] = [];
        }
        const id = uniqid();
        todoInfo[key].push({
            ...todo,
            id: id,
        });
        storage.set(todoInfo);
        return id;
    },
    getTodos: async (key) => {
        await delay(500);
        if (!todoInfo.hasOwnProperty(key)) {
            todoInfo[key] = [];
        }
        return [...todoInfo[key].map(todo => {
            return {
                ...todo
            }
        })]
    },
    getTodo: async (key, id) => {
        await delay(500);
        if (!todoInfo.hasOwnProperty(key)) {
            todoInfo[key] = [];
        }
        const todo = todoInfo[key].find(todo => todo.id === id)
        return todo ? {...todo} : null;
    },
    removeTodo: async (key, id) => {
        await delay(500);
        const removeIndex = todoInfo[key].findIndex(todo => todo.id === id);
        if (removeIndex > -1) {
            todoInfo[key].splice(removeIndex, 1);
        }
        storage.set(todoInfo);
    },
    toggleTodo: async (key, id) => {
        await delay(500);
        const findObj = todoInfo[key].find(todo => todo.id === id);
        if (findObj) {
            findObj.done = !findObj.done
        }
        storage.set(todoInfo);
    }
}

export default todoApi;