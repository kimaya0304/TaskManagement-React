import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Todo = () => {
    const [todoData, setTodoData] = useState({})
    const [allTodos, setAllTodos] = useState([])
    const [selectedTodo, setSelectedTodo] = useState()
    const [edit, setEdit] = useState(0)

    const handleChange = e => {
        const { name, value } = e.target
        setTodoData({ [name]: value, status: "" })
    }

    const URL = "http://localhost:5000/tasks"
    const getTodos = async () => {
        try {
            const { data } = await axios.get(URL)
            setAllTodos(data)

        } catch (error) {
            console.log(error);

        }
    }

    const addTodo = async () => {
        debugger;
        try {
            await axios.post(URL, todoData)
            toast.success("task create success")
            getTodos()
            setAllTodos(allTodos.push(todoData));
            setTodoData({ task: "" })

        } catch (error) {
            console.log(error);

        }

    }
    const updateTodo = async (id, status) => {
        try {
            const { data } = await axios.patch(`${URL}/${id}`, { status })
            // setAllTodos(data)
            toast.warn("task status updated")
            getTodos()

        } catch (error) {
            console.log(error);

        }
    }
    const deleteTodo = async id => {
        try {
            const { data } = await axios.delete(`${URL}/${id}`)
            // setAllTodos(data)
            toast.error("task delete success")
            getTodos()

        } catch (error) {
            console.log(error);

        }
    }

    const editTodo = async id => {
        // const editTask = allTodos.filter(item => item.id !== id)
        // setEdit(edit.task)
        try {
            const { data } = await axios.patch(`${URL}/${selectedTodo.id}`, selectedTodo)
            // setAllTodos(data)
            toast.info("task edited success")
            getTodos()

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => { getTodos() }, [])


    return <>

        <div className="container">
            <div className="row">
                <h1 >Add Task</h1>
                <div div className='col-8'>
                    <input value={todoData.task} onChange={handleChange} name='task' type="text" className='form-control my-2' placeholder='Add Task' />
                </div>
                <div className="col-4">
                    <button onClick={addTodo} type="button" class="btn btn-primary w-100">Add Tasks</button>
                </div>
            </div>


            <div className="container">
                <div className="row">
                    <div className="col-sm-6">

                        {/* all tasks on click of add tasks button*/}
                        <table className='mt-5 table table-dark table-striped table-hover'>
                            <thead>
                                <tr>
                                    <th>Tasks</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {

                                    allTodos.length > 0 && allTodos.map(item => <tr>
                                        <td>{item.task}</td>
                                        <td>
                                            <button data-bs-toggle="modal" data-bs-target="#editModal" onClick={e => setSelectedTodo(item)} type="button" className="mx-2 btn btn-warning">Edit</button>
                                            <button onClick={e => deleteTodo(item.id)} type="button" className="mx-2 btn btn-danger">Delete</button>
                                            <button onClick={e => updateTodo(item.id, "pending")} type="button" className="mx-2 btn btn-secondary">Pending</button>
                                            <button onClick={e => updateTodo(item.id, "completed")} type="button" className="mx-2 btn btn-primary">Completed</button>

                                        </td>
                                    </tr>)}
                            </tbody>
                        </table><hr />

                        {/* pending tasks table */}
                        <table className='mt-5 table table-dark table-striped table-hover'>
                            <thead>
                                <tr>
                                    <th>Pending Tasks</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {

                                    allTodos.length && allTodos.filter(item => item.status === "pending").map(item => <tr>
                                        <td>{item.task}</td>
                                        <td>
                                            <button onClick={e => updateTodo(item.id, "completed")} type="button" className="mx-2 btn btn-primary">Completed</button>
                                        </td>
                                    </tr>)}
                            </tbody>
                        </table>

                        {/* completed task table */}
                        <table className='mt-5 table table-dark table-striped table-hover'>
                            <thead>
                                <tr>
                                    <th>Completed Tasks</th>
                                </tr>
                            </thead>
                            <tbody>

                                {

                                    allTodos.length && allTodos.filter(item => item.status === "completed").map(item => <tr>
                                        <td>{item.task}</td>
                                    </tr>)}

                            </tbody>
                        </table><hr />
                    </div>
                    <div className="col-sm-6">
                        <div class="card">
                            <div class="card-header">Tasks History</div>
                            <div class="card-body">
                                {
                                    allTodos.length && allTodos.map(item => <div className={`
                                    alert 
                                    ${item.status === "pending" && "alert-warning"} 
                                    ${item.status === "completed" && "alert-success"} 
                                    d-flex justify-content-between
                                    `}>
                                        <strong>{item.status}</strong>
                                    </div>)
                                }


                                {/* <div className="alert alert-warning d-flex justify-content-between">
                                    <span>Coffee</span><strong>Pending</strong>
                                </div>

                                <div className="alert alert-danger d-flex justify-content-between">
                                    <span>B</span><strong>Deleted</strong>
                                </div> */}




                            </div>

                        </div>
                        {/* if completed show green alert in task history */}
                        {/* if pending show in red alert  in task history*/}
                        {/* if pending  take the task and show in pending task table and after completed show in history */}
                    </div>
                </div>
            </div>


            {/* edit modal */}


            <div class="modal fade" id="editModal" >
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {
                                selectedTodo && <div>
                                    <input
                                        value={selectedTodo.task}
                                        onChange={e => setSelectedTodo({ ...selectedTodo, task: e.target.value })} type="text" class="form-control" id="name" placeholder="Enter Your Name" />                                <div class="valid-feedback">Looks good!</div>
                                </div>
                            }
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">cancel</button>
                            <button onClick={editTodo} type="button" class="btn btn-primary" data-bs-dismiss="modal">Update</button>
                        </div>

                    </div>
                </div>
            </div>



        </div ><hr />

    </>
}

export default Todo