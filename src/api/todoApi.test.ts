import todoApi from "./todoApi";

describe('todoApi 테스트', () => {
    it('초기 길이 체크', async () => {
        const key = '2020-10-05'
        const todos = await todoApi.getTodos(key)
        expect(todos.length).toBe(0)
    })

    it('할일 추가 후 길이 체크', async () => {
        const key = '2020-10-05';
        await todoApi.addTodo(key, {
            id: 1,
            text: '청소하기',
        })
        const todos = await todoApi.getTodos(key);
        expect(todos.length).toBe(1);
    });

    it('저장된 객체와 조회 객체 동일여부 확인', async () => {
        const key = '2020-10-04';
        const todo = {
            id: 1,
            text: '객체확인',
            done: false,
        }
        await todoApi.addTodo(key, todo);
        const todos = await todoApi.getTodos(key);
        expect(todos[0]).not.toBe(todo);
    });

    it('삭제 후 존재여부 확인', async () => {
        const key = "2020-10-04";
        const id = 1;
        let todo = await todoApi.getTodo(key, id);
        expect(todo).not.toBe(null);
        await todoApi.removeTodo(key, id);
        todo = await todoApi.getTodo(key, id);
        expect(todo).toBe(null);
    });

    it('토글 후 데이터 확인', async () => {
        const key = '2020-10-05';
        const id = 1;
        const prevTodo = await todoApi.getTodo(key, id);
        await todoApi.toggleTodo(key, id);
        const nextTodo = await todoApi.getTodo(key, id);
        expect(nextTodo.done).not.toBe(prevTodo.done);
        expect(nextTodo.done).toBe(true);
    });
})