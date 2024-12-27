import React, { useEffect, useState } from 'react';
import axios from '../node_modules/axios';

function TodoForm() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [response, setResponse] = useState("");

    async function submitForm() {
        const { response } = await axios.get("http://localhost:8080/createTodo?name=" + name + "&description=" + description);
        setResponse(response);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert('values entered: ' + name + ", " + description);
        submitForm();
        console.log(response);
    }

    return (
        <div>
            <form onSubmit={handleSubmit} method="post">
                <label>Task Name: 
                    <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label> Description: 
                    <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='description' />
                </label>
                <input type='submit' />
            </form>
        </div>
    )
}

export default TodoForm;