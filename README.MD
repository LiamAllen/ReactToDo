#React Todo

React Todo is a simple web application for hosting a todolist for a single user. 

##Installation

Clone repository using 

    `git clone https://github.com/liamallen/reacttodo`

enter the new directory using

    `cd reacttodo`

Then navigate to the nodeapp directory using

    `cd nodeapp`

Install dependencies using 

    `npm install`

Then navigate to the reactapp folder using

   `cd ../reactapp`

Install dependencies using 

    `npm install`

##MySQL Table Schematic

Create a database named 'reacttodo', then create a table named 'todoitems'. 'todoitems' must contain four columns: 'Description', 'Name', 'User', and 'UUID'. The application does not yet have support for multiple users, user column will be set to 'default' for each entry. An illustration of this schematic is show below. 



##Starting the Server

Start backend in the nodeapp directory using 

    `npm start`

Start the frontend in the reactapp directory using 

    `npm run dev`

Navigate to 'http://localhost:5173' to view application.
