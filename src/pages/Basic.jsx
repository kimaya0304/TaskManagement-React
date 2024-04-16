import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Basic = () => {
    const [users, setusers] = useState([])
    const URL = "http://localhost:5000/notes"
    const getusers = async e => {
        try {
            const { data } = await axios.get(URL)
            console.log(data);
            setusers(data)
        } catch (error) {
            console.log(error);
        }
    }
    const updateUser = async id => {
        try {
            await axios.put(`${URL}/${id}`, { name: "JOHN", age: 200 })
            console.log("user update success");
            getusers()
            toast.success("update succesee")
        } catch (error) {
            console.log(error);
        }
    }


    const addUser = async e => {
        try {
            const { data } = await axios.post(URL, { name: "new user", age: 20 })
            console.log("user create success");
            getusers()
            toast.success("add success")
        } catch (error) {
            console.log(error);
        }
    }
    const deleteUser = async id => {
        try {
            await axios.delete(`${URL}/${id}`)
            console.log("user delete success");
            getusers()
            toast.error(" user delete success")
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => { getusers() }, [])
    return <>
        {/* <button class="btn btn-primary" onClick={addUser}>add</button> */}
        {/* <button class="btn btn-success" onClick={getusers}>get</button> */}
        {/* <hr />
        {
            users.map(item => <div className='alert alert-success'>
                {item.name}{item.age}
                <button onClick={e => updateUser(item.id)}>update</button>
                <button onClick={e => deleteUser(item.id)}>delete</button>
            </div>)
        } */}
    </>
}

export default Basic

// npm i axios react toastify