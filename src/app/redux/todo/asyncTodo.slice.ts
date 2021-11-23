import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import TodoRepositoryImpl from "../../../data/repositories/TodoRepositoryImpl"
import Item from "../../../domain/entities/Todo"
import TodoService from "../../../domain/usecases/TodoService"
import type { RootState } from "../store"
// Define a type for the slice state
interface CounterState {
    loading: boolean
    asyncTodos: Array<Item>
}

// Define the initial state using that type
const initialState: CounterState = {
    loading: false,
    asyncTodos: [],
}

export const fetchList = createAsyncThunk("plantSlice/fetchList", async () => {
    const todoRepo = new TodoRepositoryImpl()
    const todoService = new TodoService(todoRepo)
    const asyncTodos = await todoService.GetTodos()
    return asyncTodos
})

export const StoreTodo = createAsyncThunk("plantSlice/fetchList", async (props) => {
    console.log('slice');
    const todoRepo = new TodoRepositoryImpl()
    const todoService = new TodoService(todoRepo)
    const asyncTodos = await todoService.StoreTodo(props)
    return asyncTodos;
})

export const DeleteTodo = createAsyncThunk("plantSlice/fetchList", async (props) => {
    const todoRepo = new TodoRepositoryImpl()
    const todoService = new TodoService(todoRepo)
    const asyncTodos = await todoService.DeleteTodo(props)
    return asyncTodos;
})

export const UpdateTodo = createAsyncThunk("plantSlice/fetchList", async (props) => {
    const todoRepo = new TodoRepositoryImpl()
    const todoService = new TodoService(todoRepo)
    const asyncTodos = await todoService.UpdateTodo(props)
    return asyncTodos;
})


export const asyncTodoSlice = createSlice({
    name: "asyncTodoSlice",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchList.fulfilled, (state, action) => ({
            ...state,
            asyncTodos: action.payload,
            loading: false,
        }))
        builder.addCase(fetchList.pending, (state) => ({
            ...state,
            loading: true,
        }))
        builder.addCase(fetchList.rejected, (state) => ({
            ...state,
            loading: false,
        }))
    },
})

// Other code such as selectors can use the imported `RootState` type
export const todos = (state: RootState) => state.asyncTodoSlice.asyncTodos
export default asyncTodoSlice.reducer