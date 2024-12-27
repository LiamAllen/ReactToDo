//* TODO: 
// 1. Create form for TodoItem Creation
// 2. Fine-tune Stylesheet
// 3. Add user authentication via 0auth 2.0 and SSO or JWT
// *\\

const cors = require('cors');
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 8080;

//objects used to generate random id strings for database items
const crypto = require('crypto');

app.use(cors()); //cors middleware enables cross-origin resource sharing, allowing the react app to make requests to this express server running on a different port

var con = mysql.createConnection({ //Creates a connection to the MySQL server
    host: "localhost",
    user: "username",
    password: "password",
    database: "reacttodo"

});

con.connect(function(err) { //Establishes a connection with the MySQL server and confirms successful connection
    if (err) throw err;
    console.log("Connected to MySQL Database!");
});

//MySQL funtions here

const mySqlQuery = async () => { //call funtion to make a query in the reacttoto db
    let sql = 'SELECT * FROM todoItems';
    return new Promise((resolve, reject) => {
        con.query(sql, function (err, result) {
            if(err){
                reject(err);
            }
            else{
                resolve(result);
            }
        });
    });
}

const dropTodoItem = (uuid) => { //used to drop TodoItems from the database. 
    let sql = "DELETE FROM todoItems WHERE UUID = '" + uuid + "'";
    return new Promise((resolve, reject) => {
        con.commit(sql), function (err, result) {
            if (err) {
                reject(err);
            }
            else{
                resolve(result);
                console.log(result);
            }
        }
    })
}

const createTodoItem = (user, uuid, name, description) => { //used to drop TodoItems from the database. 
    let sql = "INSERT INTO todoItems VALUES('" + user + "', '" + uuid + "', '" + name + "', '" + description + "')";
    return new Promise((resolve, reject) => {
        con.commit(sql), function (err, result) {
            if (err) {
                reject(err);
            }
            else{
                resolve(result);
                console.log(result);
            }
        }
    })
}

//other needed functions here

const makeUUID = async () => {
    return crypto.randomBytes(16).toString('hex');
}

//API Routes Here

app.get('/queryTodo', async (req, res) => {
    //let query = req.query.q;
    //console.log(query);
    var result = await mySqlQuery();
    console.log(result);
    res.send(result);
});

app.get('/dropTodo', async (req, res) => {
    let uuid = req.query.uuid;
    if(uuid == 'undefined'){
        console.log("nothing to delete");
        res.send("Nothing specified to delete");
    }
    else {    
        let result = await dropTodoItem(uuid);
        console.log(result);
        res.send(result);
    }
});

app.get('/createTodo', async (req, res) => {
    let name = req.query.name;
    let description = req.query.description;
    let user = 'default'; //placeholder until user authentication is in place.
    let uuid = await makeUUID();  
    console.log(name + " " + description + " " + uuid);
    let result = await createTodoItem(user, uuid, name, description);
    res.send(result);
});

app.listen(port, () => {
    console.log("Server is running");
});

/**TODO:
 * Link Node to MySQL server and create API for creating, deleting, finishing, and listing todo list items.
 * Allow react application to use the node express API to fetch data from the todo list 
 * Allow react application to use the node express API to send data to the todo list
 * (optional) allow for multiple users in the app via MySQL login and JWT
 */