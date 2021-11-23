import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface SyncTodoState {
    syncTodos: String[]
}

const initialState = { syncTodos: ["Todo1", "Todo2", "Todo3"] } as SyncTodoState

const todoSlice = createSlice({
    name: "syncTodo",
    initialState,
    reducers: {
        
    },
})

export default todoSlice.reducer
