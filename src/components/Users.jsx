import React, { useEffect, useState } from 'react';
import UsersTable from './UsersTable';
import http from '../services/httpService'
import { toast } from 'react-toastify';

const Users = () => {

    const [users, setUsers ] = useState([])
    const [userDeleted, setUserDeleted] = useState(false)

    const [inputName, setInputName] = useState("")
    const [inputEmail, setInputEmail] = useState("")
    const [userCreated, setUserCreated] = useState(false)
    
    const handleDeleteUser = async (id) => {
        try{
            await http.delete(`/user/${id}`)
            toast.success("User deleted!")
            setUserDeleted(!userDeleted)
            
        }catch(error){
            toast.error("Error: "+error.response.data)
        }
    }

    const handleNameChanged = (e) => {
        setInputName(e.target.value)
    }

    const handleEmailChanges = (e) => {
        setInputEmail(e.target.value)
    }

    const handleCreateUser = async() => {
        try{
            const user = {
                name: inputName, 
                email: inputEmail
            }
            const {data} = await http.post(`/user`, user)
            if(data){
                setUserCreated(!userCreated)
                toast.success("User created")
            }
        }catch(error){
            let message = error.response.data
            if(error.response.data.status === 400)
                message = "Make sure 'name' is String and 'email' is email type."
    
            toast.error("Error: "+message)
        }
    }


    useEffect(async () => {
        const {data} = await http.get("/user")
        setUsers(data);

    },[userDeleted, userCreated])

    return (
        <div>
            <h2>Users</h2>
            {users.length === 0 && <p><b>There are no users on the system.</b></p>}
            <UsersTable data={users} handleDelete={handleDeleteUser}/> 
            <div className="card">

                <div className="card-body">

                    <div className="card-body">

                        <div className="card">
                            <div className="card-body">
                            <h5 className="card-title">Create user</h5>
                                <input type="text" className="form-control inputName" 
                                            placeholder="User name...." value={inputName} onChange={handleNameChanged}
                                                />
                                <input type="text" className="form-control inputEmail" 
                                            placeholder="Email..." value={inputEmail} onChange={handleEmailChanges}
                                                />
                                <button className="btn btn-md btn-dark transferButton" onClick={handleCreateUser}>Create</button>
                            </div>
                        </div>
                        
                    </div>

                </div>

            </div>
             

        </div>
    );
};

export default Users;