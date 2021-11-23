import TodoServiceImpl from "domain/usecases/TodoService";
import Todo from "../../domain/entities/Todo"
import TodoRepository from "../../domain/repositories/TodoRepository"

class TodoDTO {
    id = 0
    title = ""
    isDone = false
}

const LOCALSTORAGE_NAME = "Todos"

export default class TodoRepositoryImpl implements TodoRepository {
    getLocalStorage(name: string) {
        const todos = JSON.parse(<string>localStorage.getItem(name))
            ? JSON.parse(<string>localStorage.getItem(name))
            : []

        return todos
    }

    setLocalStorage(name: string, value: any) {
        return localStorage.setItem(name, value)
    }

    async GetTodos(): Promise<Todo[]> {
        const todos = this.getLocalStorage(LOCALSTORAGE_NAME)

        return todos.map((todo: TodoDTO) => new Todo(todo.id, todo.title, todo.isDone));
    }

    async StoreTodo(data): Promise<Todo[]> {
        let todos = this.getLocalStorage(LOCALSTORAGE_NAME)

        if(todos.length !== 0){
            todos.push({id:todos[todos.length - 1].id + 1, title: data.todo, isDone: false})
        } else {
            todos.push({id:1, title: data.todo, isDone: false})
        }

        this.setLocalStorage(LOCALSTORAGE_NAME, JSON.stringify(todos))
        return this.GetTodos();
    }

    async DeleteTodo(data): Promise<Todo[]> {
        let todos = this.getLocalStorage(LOCALSTORAGE_NAME)
        
        const filteredData = todos.filter(item => item.id !== data);
        
        this.setLocalStorage(LOCALSTORAGE_NAME, JSON.stringify(filteredData))
        return this.GetTodos();
    }

    async UpdateTodo(todo, data): Promise<Todo[]> {
        const newData = this.getLocalStorage(LOCALSTORAGE_NAME)

        var foundIndex = newData.findIndex(item => item.id == todo.id);
        newData[foundIndex].title = data;
        
        this.setLocalStorage(LOCALSTORAGE_NAME, JSON.stringify(newData))
        return this.GetTodos();
    }

    async DoneTodo(id): Promise<Todo[]> {
        const newData = this.getLocalStorage(LOCALSTORAGE_NAME)

        var foundIndex = newData.findIndex(item => item.id == id);
        newData[foundIndex].isDone = !newData[foundIndex].isDone;
        
        this.setLocalStorage(LOCALSTORAGE_NAME, JSON.stringify(newData))
        return this.GetTodos()
    }

    async DoneAllTodo(): Promise<Todo[]> {
        let newData = this.getLocalStorage(LOCALSTORAGE_NAME)
        newData = newData.map((item) => {
            const container = {
                id: item.id,
                title: item.title,
                isDone: true
            }

            return container
        })
        
        this.setLocalStorage(LOCALSTORAGE_NAME, JSON.stringify(newData))
        return this.GetTodos()
    }
}

