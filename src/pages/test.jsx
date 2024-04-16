import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Todo = () => {
    const [todoData, setTodoData] = useState({})
    const [allTodos, setAllTodos] = useState([])

    const handleChange = e => {
        const { name, value } = e.target
        setTodoData({ ...todoData, [name]: value })
    }
    const URL = "http://localhost:5000/notes"
    const handleAddTodo = async () => {
        try {
            await axios.post(URL, todoData)
            toast.success("todo create success")
            getTodos()
            setTodoData({ task: "", desc: "" })
        } catch (error) {
            toast.error(JSON.stringify(error))
        }
    }
    const getTodos = async () => {
        try {
            const { data } = await axios.get(URL)
            setAllTodos(data)
        } catch (error) {
            toast.error(JSON.stringify(error))
        }
    }
    const deleteTodo = async id => {
        try {
            const { data } = await axios.delete(`${URL}/${id}`)
            // setAllTodos(data)
            toast.error("todo delete success")
            getTodos()
        } catch (error) {
            toast.error(JSON.stringify(error))
        }
    }
    const updateTodo = async id => {
        try {
            const { data } = await axios.put(`${URL}/${id}`, { task: "learn react", desc: "react is awesome" })
            // setAllTodos(data)
            toast.warn("todo update success")
            getTodos()
        } catch (error) {
            toast.error(JSON.stringify(error))
        }
    }
    useEffect(() => { getTodos() }, [])
    return <>
        <div className="container">
            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    <div class="card">
                        <div class="card-header">Add Todo</div>
                        <div class="card-body">
                            <input value={todoData.task} onChange={handleChange} name='task' type="text" className='form-control my-2' />
                            <input value={todoData.desc} onChange={handleChange} name='desc' type="text" className='form-control my-2' />
                            <button onClick={handleAddTodo} type="button" class="btn btn-primary w-100">Add Todo</button>
                        </div>

                    </div>
                    <table class=" mt-5 table table-dark table-striped table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Task</th>
                                <th>desc</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {

                                allTodos.map(item => <tr>
                                    <td>{item.id}</td>
                                    <td>{item.task}</td>
                                    <td>{item.desc}</td>
                                    <td>
                                        <button onClick={e => updateTodo(item.id)} type="button" class="mx-2 btn btn-outline-warning">Eidt</button>
                                        <button onClick={e => deleteTodo(item.id)} type="button" class="mx-2 btn btn-outline-danger">Delete</button>

                                    </td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </>
}

export default Todo


// CRUD CREATE READ UPDATE DELETE kasa karave he baghne
// formik sobat crud