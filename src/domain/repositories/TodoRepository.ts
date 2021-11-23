import Todo from "../entities/Todo"

export default interface TodoRepository {
    GetTodos(): Promise<Todo[]>,
    StoreTodo(todo): Promise<Todo[]>,
    DeleteTodo(id, list): Promise<Todo[]>,
    UpdateTodo(item, data): Promise<Todo[]>,
    DoneTodo(id): Promise<Todo[]>
    DoneAllTodo(): Promise<Todo[]>
}
