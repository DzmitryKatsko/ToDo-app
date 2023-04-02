const form = document.querySelector('#form')
const taskInput=document.querySelector('#taskInput');
const tasksList=document.querySelector('#tasksList');
const emptyList=document.querySelector('#emptyList');

let tasks=[];

if (localStorage.getItem('tasks')){
    tasks=JSON.parse(localStorage.getItem('tasks'))
}
tasks.forEach(function(task){

});

form.addEventListener('submit',addTask);
tasksList.addEventListener('click',deleteTask)
tasksList.addEventListener('click',doneTask)

function doneTask(event)
{
    if (event.target.dataset.action==='done'){

        const parentNode = event.target.closest('.list-group-item');

        const id =parentNode.id;
        const task=tasks.find(function(task) {
            if (task.id===id){
                return true;
            }
        })


        saveToLocalStorage();

        const taskTitle= parentNode.querySelector('.task-title');
        taskTitle.classList.toggle('task-title--done')
       }
}

function deleteTask(event)
{
if (event.target.dataset.action==='delete'){

     const parentNode = event.target.closest('.list-group-item');

     const id =parentNode.id;

     tasks=tasks.filter((task)=>task.id!==id)

     saveToLocalStorage()

 parentNode.remove()
}

if(tasksList.children.length===1)
{
emptyList.classList.remove('none')
}
checkEmptyList();

}

function addTask(event){
    event.preventDefault();
   
    const taskText= taskInput.value;

    const newTask={
        id: Date.now(),
        text: taskText,
        done: false
    }

    tasks.push(newTask);

    saveToLocalStorage();

    const cssTask= newTask.done ? 'task-title task-title--done':'task-title';

    const taskHTML=`<li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
    <span class="${cssTask}">${newTask.text}</span>
    <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-action">
            <img src="tick.svg" alt="Done" width="18" height="18">
        </button>
        <button type="button" data-action="delete" class="btn-action">
            <img src="cross.svg" alt="Done" width="18" height="18">
        </button>
    </div>
</li>`;

tasksList.insertAdjacentHTML('beforeend',taskHTML)

taskInput.value=""
taskInput.focus();

if(tasksList.children.length>1)
{
emptyList.classList.add('none')
}
}
function checkEmptyList(){
    if (tasks.length===0){
        const emptyListHTML=`<li id="emptyList" class="list-group-item empty-list">
        <div class="empty-list__title">List is empty</div>
    </li> `
    tasksList.insertAdjacentHTML('afterbegin',emptyListHTML)
    }

    if(tasks.length>0){
        const emptyListEl=document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove(): null;
    }
}

function saveToLocalStorage(){
    localStorage.setItem('tasks',JSON.stringify(tasks))
}