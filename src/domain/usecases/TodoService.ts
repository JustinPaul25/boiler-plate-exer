import Todo from "../entities/Todo"
import TodoRepository from "../repositories/TodoRepository"

export default class TodoServiceImpl {
    todoRepo: TodoRepository

    constructor(ir: TodoRepository) {
        this.todoRepo = ir
    }

    async GetTodos(): Promise<Todo[]> {
        return this.todoRepo.GetTodos()
    }

    async StoreTodo(props): Promise<Todo[]> {
        if(props.todo.length > 3) {
            return this.todoRepo.StoreTodo(props)
        } else {
            throw "Todo Title must be 4 or more characters"
        }
    }

    async DeleteTodo(props): Promise<Todo[]> {
        if(props.isDone) {
            throw "Unable to delete completed tasks!"
        } else {
            return this.todoRepo.DeleteTodo(props.id)
        }
    }

    async UpdateTodo(props): Promise<Todo[]> {
        return this.todoRepo.UpdateTodo(props.item, props.data)
    }

    async DoneTodo(props): Promise<Todo[]> {
        return this.todoRepo.DoneTodo(props.item)
    }

    async DoneAllTodo(): Promise<Todo[]> {
        return this.todoRepo.DoneAllTodo()
    }
}
