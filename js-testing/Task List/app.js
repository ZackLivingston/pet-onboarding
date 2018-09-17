const inputTask = document.getElementById('input-task')
const addTaskButton = document.getElementById('add-task')
const taskList = document.getElementById('task-list')
const clearTasksButton = document.getElementById('clear-tasks')

addTaskButton.addEventListener('mousedown', handleSubmit)
taskList.addEventListener('click', deleteTask)
clearTasksButton.addEventListener('click', clearTasks)
window.addEventListener('DOMContentLoaded', getTasks)

var storage;

function getTasks() {
    storage = localStorage.getItem('tasks')
    if (!storage) {
        storage = []
    } else {
        //storage = Array.from(storage).filter(title => title !== ',')
        storage = JSON.parse(localStorage.getItem('tasks'))
        console.log('at start: ', storage)
    }

    storage.forEach((task) => {
        createTask(task)
    })
}

function handleSubmit(event) {
    event.preventDefault()
    if (inputTask.value) {
        createTask(inputTask.value)
        storage.push(inputTask.value)
        console.log(storage)
        localStorage.setItem('tasks', JSON.stringify(storage))
        inputTask.value = ''
    }
    else {
        inputTask.style.boxShadow = '0 0 12px red'
        inputTask.setAttribute('placeholder', 'You must enter a task')
    }
}

function createTask(value) {
    const newTask = document.createElement('div')
    const taskTitle = document.createElement('h3')
    const deleteTask = document.createElement('p')

    taskTitle.innerText = value
    taskTitle.classList = 'task-title'

    deleteTask.innerText = 'x'
    deleteTask.className = 'delete-task'

    newTask.classList = 'task clr'
    newTask.appendChild(taskTitle)
    newTask.appendChild(deleteTask)

    document.getElementById('task-list').appendChild(newTask)
}

function deleteTask(event) {
    if (event.target.className === 'delete-task') {
        console.log(event.target.parentElement.children[0].innerText)
        storage = storage.filter(title => title !== event.target.parentElement.children[0].innerText)
        localStorage.setItem('tasks', JSON.stringify(storage))
        event.target.parentElement.remove()

    }
}

function clearTasks() {
    taskList.innerHTML = null
    localStorage.removeItem('tasks')
    storage = []
}
