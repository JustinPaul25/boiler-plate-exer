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

    async StoreTodo(data): Promise<Todo[]> {
        console.log('service');
        return this.todoRepo.StoreTodo(data)
    }

    async DeleteTodo(id, list): Promise<Todo[]> {
        return this.todoRepo.DeleteTodo(id, list)
    }

    async UpdateTodo(item, data, list): Promise<Todo[]> {
        return this.todoRepo.UpdateTodo(item, data, list)
    }
}
