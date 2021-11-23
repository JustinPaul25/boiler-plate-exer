import TodoServiceImpl from "domain/usecases/TodoService";
import Todo from "../../domain/entities/Todo"
import TodoRepository from "../../domain/repositories/TodoRepository"

var todos = [
    {id: 1, title: 'todo1'},
    {id: 2, title: 'todo2'},
    {id: 3, title: 'todo3'}
];

export default class TodoRepositoryImpl implements TodoRepository {
    async GetTodos(): Promise<Todo[]> {
        return todos;
    }

    async StoreTodo(data): Promise<Todo[]> {
        if(todos.length > 0){
            const newData = todos.map((item) =>
                ({ ...item })
            )
            newData.push({id:todos[todos.length - 1].id + 1, title: data.todo})

            todos = newData;
            return newData;
        }
        return [{id:data.todos.length + 1, title: data.todo}]
    }

    async DeleteTodo(data): Promise<Todo[]> {
        const newData = todos.map((item) =>
            ({ ...item })
        )
        
        const filteredData = newData.filter(item => item.id !== data);
        
        todos = filteredData;
        return filteredData;
    }

    async UpdateTodo(todo, data): Promise<Todo[]> {
        const newData = todos.map((item) =>
            ({ ...item })
        )

        var foundIndex = newData.findIndex(item => item.id == todo.id);
        newData[foundIndex].title = data;
        
        todos = newData;
        return newData;
    }
}

