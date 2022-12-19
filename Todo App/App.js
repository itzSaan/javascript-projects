
const createNewTodoBtn = document.getElementById("createNewTodo")
const createBtn = document.getElementById("createNew")
const cancelBtn = document.getElementById("cancel")
const modal = document.getElementById("modal")
const form = document.getElementById("form")
const msg = document.getElementById("alert")
const todosContainer = document.getElementById("todosContainer")
const todoInput = document.getElementById("todoInput")
const todoStatus = document.getElementById("todoStatus")
const todoDescription = document.getElementById("todoDescription")

let todos = []

createNewTodoBtn.addEventListener("click", () => {   
    modal.style.display = "grid"
    createBtn.innerText = "create todo"
})

cancelBtn.addEventListener("click", () => {   
    modal.style.display = "none"
})

window.addEventListener("click", (event) => {
    if(event.target == modal) {
        modal.style.display = "none"
    }
})

window.addEventListener("resize", () => { 
    if (screen.width < 400) {
        createNewTodoBtn.children[1].innerText = ""
    } else {
        createNewTodoBtn.children[1].innerText = "add new"

    }
})

form.addEventListener("submit", (e) => {
    e.preventDefault()
    formValidation();
})

let formValidation = () => {
    if(todoInput.value === "") {
        msg.innerHTML = "Todo Name cannot be blank."
    } else{
        // console.log("success")
        msg.innerHTML = ""
        storeTodo()
        modal.style.display = "none"
    }
}

let storeTodo = () => {
    todos.unshift({
        title: todoInput.value,
        status: todoStatus.value === "Complete" ? true : false,
        details: todoDescription.value
    })

    localStorage.setItem("todos", JSON.stringify(todos))
    // console.log(todos)
    createTodo()
}

let createTodo = () => {
    todosContainer.innerHTML = ""   
    todos.map((x, y) => (
        todosContainer.innerHTML += 
        `<div class="todo  ${x.status ? "complete" : ""}" id=${y}>
        <label>${x.title}</label>
        <span>${x.details}</span>
        <div class="options">
        <img src="images/edit (1).png" onclick="editTodo(this)"  alt="edit" />
        <img src="images/delete (1).png" onclick="deleteTodo(this)"  alt="delete" />
        </div>
        </div>
        `
        ))
    resetForm()
}

function deleteTodo(e) {    
    e.parentElement.parentElement.remove()
    todos.splice(e.parentElement.parentElement.id, 1)

    localStorage.setItem("todos", JSON.stringify(todos))
}

function editTodo(e) {
    // debugger    
    let selectedTodo = e.parentElement.parentElement
    modal.style.display = "grid"
    todoInput.value = selectedTodo.children[0].innerText
    todoDescription.value = selectedTodo.children[1].innerText
    createBtn.innerText = "update todo"
    cancelBtn.removeAttribute("type")

    deleteTodo(e)
}

let resetForm = () => {
    todoInput.value = ""
    todoDescription.value = ""
}

(() => {
    todos = JSON.parse(localStorage.getItem("todos")) || []
    // console.log(todos)   
    createTodo()
})()



