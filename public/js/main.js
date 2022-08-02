const deleteBtn = document.querySelectorAll('.fa-trash')// creates variable and assigns it to a selection all elements with a class of the trash can
const item = document.querySelectorAll('.item span')//creates a variable and assigns it to the selection of span tags inside of a parent that has a class of 'item'
const itemCompleted = document.querySelectorAll('.item span.completed')// creats a variable and assigns it to a selection of spans with a class of 'completed' inside of a parent with a class of 'item'

Array.from(deleteBtn).forEach((element)=>{//creating an array from our selection and starting a loop
    element.addEventListener('click', deleteItem)//add an event istener to the current item that waits for a click and then calls a function called deleteItem
})//closes the loop

Array.from(item).forEach((element)=>{//creating an array from our selection and starting a loop
    element.addEventListener('click', markComplete)//add an event istener to the current item that waits for a click and then calls a function called markComplete
})//closes the loop

Array.from(itemCompleted).forEach((element)=>{//creating an array from our selection and starting a loop
    element.addEventListener('click', markUnComplete)//add an event listener to only completed items
})//closes the loop

async function deleteItem(){//decleare an asynchronus function
    const itemText = this.parentNode.childNodes[1].innerText//checks inside list item and grabs only the innertext within the list span
    try{//starting a try block
        const response = await fetch('deleteItem', {//creats a response variable that waits on a fetch request to get data from the result of the deleteItem route
            method: 'delete',//sets the CRUD method for the route
            headers: {'Content-Type': 'application/json'},//specifies the type of content expected, JSON
            body: JSON.stringify({//declare message content, and strings that content
              'itemFromJS': itemText//setting the content of the body to the inner text of the list item, and naming it 'itemFromJS'
            })//closes the body
          })//closes the object
        const data = await response.json()//waiting on server response with JSON
        console.log(data)//logs result to console
        location.reload()//reloads page to update what is displayed

    }catch(err){//if error occurs, pass error into catch block
        console.log(err)//log error into console
    }//close catch block
}//closes/ends function

async function markComplete(){//decleare an asynchronus function
    const itemText = this.parentNode.childNodes[1].innerText//checks inside list item and grabs only the innertext within the list span
    try{//starting a try block
        const response = await fetch('markComplete', {//creats a response variable that waits on a fetch request to get data from the result of the markComplete route
            method: 'put',//setting the CRUD method to 'update' for the route
            headers: {'Content-Type': 'application/json'},//specifies the type of content expected, JSON
            body: JSON.stringify({//declare message content, and strings that content
                'itemFromJS': itemText//setting the content of the body to the inner text of the list item, and naming it 'itemFromJS'
            })//closes the body
          })//closes the object
        const data = await response.json()//waiting on server response with JSON
        console.log(data)//logs result to console
        location.reload()//reloads page to update what is displayed

    }catch(err){//if error occurs, pass error into catch block
        console.log(err)//log error into console
    }//close catch block
}//closes/ends function

async function markUnComplete(){//decleare an asynchronus function
    const itemText = this.parentNode.childNodes[1].innerText//checks inside list item and grabs only the innertext within the list span
    try{//starting a try block
        const response = await fetch('markUnComplete', {//creats a response variable that waits on a fetch request to get data from the result of the markUnComplete route
            method: 'put',//setting the CRUD method to 'update' for the route
            headers: {'Content-Type': 'application/json'},//specifies the type of content expected, JSON
            body: JSON.stringify({//declare message content, and strings that content
                'itemFromJS': itemText//setting the content of the body to the inner text of the list item, and naming it 'itemFromJS'
            })//closes the body
          })//closes the object
        const data = await response.json()//waiting on server response with JSON
        console.log(data)//logs result to console
        location.reload()//reloads page to update what is displayed

    }catch(err){//if error occurs, pass error into catch block
        console.log(err)//log error into console
    }//close catch block
}//closes/ends function