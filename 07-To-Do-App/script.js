const $ = elem => document.querySelector(elem)

const $taskInput = $('.add-task input')
// Utilizamos "querySelectorAll" en vez de "querySelector" ya que queremos seleccionar todos
// los elementos span contenidos en el div con clase "filters", con querySelector obtendríamos
// solo el primero
const $filters = document.querySelectorAll('.filters span')
const $clearBtn = $('.filters button')
const $taskBox = $('.task-box')

// Variables

let editId
let isEditTask = false
let tasks = JSON.parse(localStorage.getItem('todo-list'))

// Recorrer cada uno de los filtros
// $filters.forEach(filter => {
//     filter.addEventListener('click', () => {

//     })
// })

function showTodoApp (filter) { 
    let liID = ''

    if (tasks) {
        tasks.forEach((task, id) => {
            let completedTask = task.status === 'completed' ? 'checked' : ''
        });
    }
}
function showMenu () { }
function updateStatus () { }
function editTask () { }
function deleteTask () { }