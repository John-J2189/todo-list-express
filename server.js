const express = require('express')//makes it possible to use express in this file
const app = express()//setting up variable and assigning it to the instance of express
const MongoClient = require('mongodb').MongoClient//makes it possible to use methods associated with MongoClient and talk to our DB
const PORT = 2121//setting a variable
require('dotenv').config()//allows us to look for variable in env file


let db,//declare variable db, but do not asign a current value
    dbConnectionStr = process.env.DB_STRING,//declaring variable and assigning our database connetion string to it
    dbName = 'todo'//declaring a variable and assigning the name of the database we will use

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })//creating a connection to MongoDB, passing in our connection string, passing in addtional property
    .then(client => {//waiting for teh connection and proceeding if successful, and passing in all client information
        console.log(`Connected to ${dbName} Database`)//log to the console a template literal 'connected to todo Database'
        db = client.db(dbName)//assigning a value to previously decaled db variable that contains a db client factory method
    }) //closing our .then
    
app.set('view engine', 'ejs')//sets ejs as default render method
app.use(express.static('public'))//sets location of static assets
app.use(express.urlencoded({ extended: true }))//tells express to decode and encode urls where the ehader matches the content. supports arrays and objects
app.use(express.json())//parses JSON content from incoming requests


app.get('/',async (request, response)=>{//starts a get method when the root route is passed in, sets up req and res params
    const todoItems = await db.collection('todos').find().toArray()//sets a variable and awaits all items from teh todos collection
    const itemsLeft = await db.collection('todos').countDocuments({completed: false})//sets a varaible and awaits count of uncompleted items to later display in EJS
    response.render('index.ejs', { items: todoItems, left: itemsLeft })//rendering EJS file and passing through the db items and the count remaining inside of an object.
    // db.collection('todos').find().toArray()
    // .then(data => {
    //     db.collection('todos').countDocuments({completed: false})
    //     .then(itemsLeft => {
    //         response.render('index.ejs', { items: data, left: itemsLeft })
    //     })
    // })
    // .catch(error => console.error(error))
})

app.post('/addTodo', (request, response) => {//starts a POST method when the add route is passed in
    db.collection('todos').insertOne({thing: request.body.todoItem, completed: false})//inserts a new item into the todos' collection, gives it a completed value of false by default
    .then(result => {//iof insert is successful, do something
        console.log('Todo Added')//console log the action
        response.redirect('/')//gets rid of the /addTodo route, and redirects back to the homepage
    })//closing the .then
    .catch(error => console.error(error))//catches any errors
})//ending the POST

app.put('/markComplete', (request, response) => {//starts a PUT method when the markComplete route is passed in
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{//looks in the db for one item matching the name of the item passed in from the main.js file that was clicked on
        $set: {
            completed: true//set completed status to true
          }
    },{
        sort: {_id: -1},//moves item to bottom of list
        upsert: false//prevents insertion if item does not already exist
    })
    .then(result => {//starts a then if update was successful
        console.log('Marked Complete')//console logging successful compeltion
        response.json('Marked Complete')//sending response back to sender
    })//closing the .then
    .catch(error => console.error(error))//catching the errors

})//ending the put

app.put('/markUnComplete', (request, response) => {//starts a PUT method when the markUnComplete route is passed in
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{//looks in the db for one item matching the name of the item passed in from the main.js file that was clicked on
        $set: {
            completed: false//set completed status to false
          }
    },{
        sort: {_id: -1},//moves item to bottom of list
        upsert: false//prevents insertion if item does not already exist
    })
    .then(result => {//starts a then if update was successful
        console.log('Marked Complete')//console logging successful compeltion
        response.json('Marked Complete')//sending response back to sender
    })//closing the .then
    .catch(error => console.error(error))//catching the errors

})//ending the put

app.delete('/deleteItem', (request, response) => {//starts a delete method when the delete route is passed
    db.collection('todos').deleteOne({thing: request.body.itemFromJS})//look inside the todos' for the ONE item that has a matching name from our JS file
    .then(result => {//starts a tehn if delete was successful
        console.log('Todo Deleted')//logs succesfful completion
        response.json('Todo Deleted')//sends resposne back to sender
    })//closing .then
    .catch(error => console.error(error))//catching the errors

})//ending the delete

app.listen(process.env.PORT || PORT, ()=>{//sets up a port we will be listening on - either the port from teh .env file or the port from the variable we set
    console.log(`Server running on port ${PORT}`)//console logging the running port
})//end the lsiten method