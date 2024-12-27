import React, { useEffect, useState } from 'react';
import axios from '../node_modules/axios';
import './index.css'
import confirmButton from './assets/confirm.jpg';
import refreshIcon from './assets/refresh.png';
import TodoForm from './TodoForm';

function ObjectLength( object ) {
    var length = 0;
    for( var key in object ) {
        if( object.hasOwnProperty(key) ) {
            ++length;
        }
    }
    return length;
};

function App() {
    const [data, setData] = useState(null);
    const [response, setResponse] = useState("");

    async function getTodo() {
        let res = await axios.get("http://localhost:8080/queryToDo");
        setData(data);
    }

    async function dropTodo(uuid) {
        let res = await axios.get("http://localhost:8080/dropTodo?uuid=" + uuid);
        setResponse(res);
        await getTodo();
    }

    function deleteTodo(uuid) {
        dropTodo(uuid);
    }

    function refreshPage() {
        window.location.reload(false);
        console.log('click!');
    }

    useEffect(() => {
        fetch("http://localhost:8080/queryToDo")
            .then(res => res.text())
            .then(data => setData(data))
            .catch(error => {
                console.error("JSON object cannot be null.")
            });
    }, []);

    const json = JSON.parse(data);
    const keyCount = ObjectLength(json);
    const elements = [];

        for (let i = 0; i < keyCount; i++) {
           elements.push(
            <li key = {json[i].UUID}>
                {json && (
                    <div className='todoItem' id={json[i].UUID}>
                        <h1>{json[i].Name}</h1>
                        <p>{json[i].Description}</p>
                        <button className='todoButton' onClick={() => deleteTodo(json[i].UUID)}>
                            <img src={confirmButton} width='50px' height='50px'/>
                        </button>
                    </div>
                )}
            </li>
            );}

            return (
                <div className='todoListBox'>
                    <h1>TODO List <button onClick={() => refreshPage()}><img src={refreshIcon} width='50' height='50' /></button></h1>
                        <TodoForm />
                        <ul className='todoList'>
                            {elements}
                        </ul>
                        <p>{response}</p>
                </div>
            )
    }


export default App;
