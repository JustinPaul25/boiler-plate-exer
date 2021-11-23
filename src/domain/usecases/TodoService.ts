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
        console.log('service');
        return this.todoRepo.StoreTodo(props)
    }

    async DeleteTodo(props): Promise<Todo[]> {
        return this.todoRepo.DeleteTodo(props.id, props.list)
    }

    async UpdateTodo(props): Promise<Todo[]> {
        return this.todoRepo.UpdateTodo(props.item, props.data, props.list)
    }
}
