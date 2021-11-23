import { configureStore } from "@reduxjs/toolkit"

import syncTodoSlice from "./todo/todo.slice"
import asyncTodoSlice from "./todo/asyncTodo.slice"

export const store = configureStore({
    reducer: {
        syncTodoSlice,
        asyncTodoSlice
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
