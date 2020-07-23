document.addEventListener("DOMContentLoaded", () => {
    createForm();
   fetchUsers()
})

const BASE_URL = "http://127.0.0.1:3000"

//read - fetch users index 

function fetchUsers(){
    fetch(`${BASE_URL}/users`)
    .then(resp => resp.json())
    .then(users => {
        //we do something with the data fetched
        for (const user of users){
            let u  = new User(user.id, user.name, user.username, user.email)
            u.renderUser();
        }
        
    })
}

// create - create a new user

//create a form
//add an event listener 
//once form is submitted => fetch `post` to my back end 
//do something with the returned object

function createForm(){
    let usersForm = document.getElementById("users-form")

    usersForm.innerHTML += 
    `
    <form>
        Name: <input type="text" id="name"><br>
        Username: <input type="text" id="username"><br>
        Email: <input type="text" id="email"><br>
        <input type="submit" value="Create User">
    </form>
    `

    usersForm.addEventListener("submit", userFormSubmission)

}

function userFormSubmission(){
    event.preventDefault();
    let name = document.getElementById("name").value
    let username = document.getElementById("username").value
    let email = document.getElementById("email").value

    let user = {
        name: name,
        username: username,
        email: email
    }

    fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(user)
    })
    .then(resp => resp.json())
    .then(user => {
        let u  = new User(user.id, user.name, user.username, user.email)
        u.renderUser();
})
    
}


// delete - delete a user 

// const buttons = document.getElementsByClassName("delete-bttn")
// console.log(buttons)
// buttons.forEach(el => {
//     el.addEventListener("click", () => {
//         debugger;
//     })
// })

function deleteUser(){

    let userId = parseInt(event.target.dataset.id)

    fetch(`${BASE_URL}/users/${userId}`, {
        method: 'DELETE'
    })

    this.location.reload()
}

