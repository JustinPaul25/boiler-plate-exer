import Todo from "../../domain/entities/Todo"
import TodoRepository from "../../domain/repositories/TodoRepository"

let todos = [
    {id: 1, title: 'todo1'},
    {id: 2, title: 'todo2'},
    {id: 3, title: 'todo3'}
];

export default class TodoRepositoryImpl implements TodoRepository {
    async GetTodos(): Promise<Todo[]> {
        return todos;
    }

    async StoreTodo(data): Promise<Todo[]> {
        let newTodos = todos
        await todos.push({id: newTodos[newTodos.length - 1].id + 1, title: data});

        return todos;
    }

    async StoreTodo(data, list): Promise<Todo[]> {
        const newList = []
        console.log(data)
        for(var ctr = 0; ctr < list.length; ctr++) {
            newList.push({id: list[ctr].id, title: list[ctr].title});
        }
        
        newList.push({id: list[list.length - 1].id + 1, title: data});
        
        return newList;
    }

    async DeleteTodo(id, list): Promise<Todo[]> {
        const newList = []
        for(var ctr = 0; ctr < list.length; ctr++) {
            if(id != list[ctr].id) {
                newList.push({id: list[ctr].id, title: list[ctr].title});
            }
        }
        
        return newList;
    }

    async UpdateTodo(item, data, list): Promise<Todo[]> {
        const newList = []
        for(var ctr = 0; ctr < list.length; ctr++) {
            if(item.id != list[ctr].id) {
                newList.push({id: list[ctr].id, title: list[ctr].title});
            } else {
                newList.push({id: list[ctr].id, title: data});
            }
        }
        
        return newList;
    }
}

