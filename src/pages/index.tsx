import Todo from "domain/entities/Todo"
import { useState } from "react"

import { useAppDispatch, useAppSelector } from "../app/redux/hooks"
import { fetchList, StoreTodo, DeleteTodo, UpdateTodo } from "../app/redux/todo/asyncTodo.slice"

export default function Home() {
    const [todo, setTodo] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [toEdit, setToEdit] = useState(null)


    const { asyncTodos, loading, syncTodos } = useAppSelector((state) => ({
        asyncTodos: state.asyncTodoSlice.asyncTodos,
        loading: state.asyncTodoSlice.loading,
        syncTodos: state.syncTodoSlice.syncTodos
    }))

    const dispatch = useAppDispatch()

    const handleClick = () => {
        dispatch(fetchList())
        setIsEdit(false)
        setToEdit(null)
        setTodo('')
    }

    const handleTodoChange = (e: any) => {
        setTodo(e.target.value)
    }

    const handleSubmitTodo = () => {
        // if(isEdit) {
        //     dispatch(UpdateTodo({item: toEdit, data:todo, list: asyncTodos}))
        //     setIsEdit(false)
        //     setToEdit(null)
        // } else {
        dispatch(StoreTodo({todo: todo}))
        console.log('index');
        // }

        // setTodo('')
    }

    const handleDeleteTodo = (item) => {
        dispatch(DeleteTodo({id: item, list: asyncTodos}))
    }

    const handleEditTodo = (item) => {
        setTodo(item.title)
        setIsEdit(true)
        setToEdit(item)
        dispatch(DeleteTodo({item: item, list: asyncTodos}))
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                columnGap: 50,
            }}
        >
            <div>
                <h2>Async Reducer</h2>
                <button type="button" onClick={handleClick} disabled={loading}>
                    Refresh
                </button>
                <ul>
                    {asyncTodos.map((item: Todo) => (
                        <li key={item.id}>
                            {item.title}
                            <button type="button" onClick={() => handleEditTodo(item)}>
                                Edit
                            </button> 
                            <button type="button" onClick={() => handleDeleteTodo(item.id)}>
                                delete
                            </button>
                        </li>
                    ))}
                </ul>
                <div>
                    <input value={todo} type="text" placeholder="New Todo" onChange={handleTodoChange} />
                    <button type="button" onClick={handleSubmitTodo} disabled={loading}>
                        { isEdit ? 'Update' :  'Submit'}
                    </button>
                </div>
            </div>
            <div>
                <h2>Sync Reducer</h2>
                {/* <div>
                    <ul>
                        {syncTodos.map((todos) => (
                            <li>{todos}</li>
                        ))}
                    </ul>
                </div> */}
            </div>
        </div>
    )
}
