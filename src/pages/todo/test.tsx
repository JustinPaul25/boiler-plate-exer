import { Button, Divider, List, Skeleton, Checkbox, Input } from 'antd';

import Todo from "domain/entities/Todo"
import { useState } from "react"

import { useAppDispatch, useAppSelector } from "../../app/redux/hooks"
import { fetchList, storeTodo, deleteTodo, updateTodo, doneTodo, doneAllTodo } from "../../app/redux/todo/asyncTodo.slice"

export default function Test() {
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

    const handleIsDoneChange = (e: any) => {
        dispatch(doneTodo({item: e.target.value}))
    }

    const handleDoneAllTodo = () => {
        dispatch(doneAllTodo({item: toEdit, data:todo}))
    }

    const handleSubmitTodo = () => {
        if(isEdit) {
            dispatch(updateTodo({item: toEdit, data:todo}))
            setIsEdit(false)
            setToEdit(null)
        } else {
            dispatch(storeTodo({todo: todo}))
        }

        setTodo('')
    }

    const handleDeleteTodo = (item, isDone) => {
        dispatch(deleteTodo({id: item, isDone: isDone}))
    }

    const handleEditTodo = (item) => {
        setTodo(item.title)
        setIsEdit(true)
        setToEdit(item)
        dispatch(deleteTodo({item: item, list: asyncTodos}))
    }

    return (
        <div>
            <div>
                <Divider orientation="left">TODO LIST</Divider>
                <div>
                    <Input.Group compact>
                        <Input style={{ width: 'calc(100% - 300px)' }} value={todo} type="text" placeholder="New Todo" onChange={handleTodoChange} />
                        <Button style={{ marginRight: '5px' }} onClick={handleSubmitTodo} disabled={loading} type="primary">{ isEdit ? 'Update' :  'Create'}</Button>
                        <Button type="primary" onClick={handleClick} disabled={loading}>Refresh</Button>
                        <Button type="primary" onClick={handleDoneAllTodo} disabled={loading}>Mark All as Done</Button>
                    </Input.Group>
                </div>
                <List
                    itemLayout="horizontal"
                    dataSource={asyncTodos}
                    renderItem={item =>
                        console.log(item) || (
                            <List.Item
                            actions={[<Button type="primary" onClick={() => handleEditTodo(item)} disabled={loading}>Edit</Button>, <Button type="primary" onClick={() => handleDeleteTodo(item.id, item.isDone)} disabled={loading}>Delete</Button>]}
                            >
                            <Checkbox style={{ marginRight: '2rem' }} value={item.id} onChange={handleIsDoneChange} checked={item.isDone}></Checkbox>
                            <Skeleton avatar title={false} loading={loading} active>
                                <List.Item.Meta
                                title={<a href="https://ant.design">{item.title}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                />
                            </Skeleton>
                            </List.Item>
                        )
                    }
                />
            </div>
        </div>
    )
}
