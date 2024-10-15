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

            if (filter === task.status || filter === null) {
                liID += `<li class="task">
                    <label for="${id}">
                        <input type="checkbox" onClick="updateStatus(this)" id="${id}"${completedTask} />
                        <p class="${completedTask}">${task.name}</p>
                    </label>
                    <div class="settings">
                        <i class="uil uil-ellipsis" onClick="showMenu(this)"></i>
                        <ul class="task-menu">
                            <li onclick="editTask(${id}, "${task.name}")"><i class="uil uil-pen"></i>Edit</li>
                            <li onclick='deleteTask(${id}, "${filter}")'><i class="uil uil-trash"></i>Delete</li>
                        </ul>
                    </div>
                </li>`
            }
        });
    }

    // Si no existe un id, mostrar mensaje de lista de tareas vacía ya que significa que no
    // hay tareas creadas
    $taskBox.innerHTML = liID || "<span>You don't have any tasks</span>"
    let checkTask = document.querySelectorAll('.task')
    !checkTask.length ? clearAll.classList.remove('active') : clearAll.classList.add('active')
    $taskBox.offsetHeight >= 300 ? $taskBox.classList.add('overflow') : $taskBox.classList.remove('overflow')
}

// Mostrar todos los elementos HTML creados anteriormente
showTodoApp('all')

function showMenu (selectedTask) { 
    let containerMenu = selectedTask.parentElement.lastElementChild
    containerMenu.classList.add('show')
    document.addEventListener('click', (event) => {
        if (event.target.value !== 'I' || event.target !== selectedTask) containerMenu.classList.remove('show')
    })
}
function updateStatus () { }
function editTask () { }
function deleteTask () { }