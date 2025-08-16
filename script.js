let form = document.getElementById("form")
let todoList = document.getElementById("todo-list")
let storeTasks = JSON.parse(localStorage.getItem("tasks")) || []  

let saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(storeTasks))    
}

let renderTasks = () => {
    todoList.innerHTML = ""
    storeTasks.map((value,index)=>{
        todoList.innerHTML += `
        <div class="taskli">
            <li>${value}</li>
            <div class="icons">
                <i class="fa-solid fa-pen" id="edit" onclick="editTask(${index})"></i>
                <i class="fa-solid fa-trash" id="del" onclick="deleteTasks(${index})"></i>
            </div>
        </div>`
    })
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let userValue = e.target.task.value.replace(/\s+/g," ").trim();
    if(userValue != ""){      
        storeTasks.push(userValue)
        saveTasks()         
        renderTasks() 
    }else{
        alert("Add a task")
    }
    form.reset()
})

let deleteTasks = (i)=>{
    if(confirm("Are you sure you want to delete this task?")){
        storeTasks.splice(i,1)
        saveTasks()        
        renderTasks()
    }
} 

let editTask = (i)=>{
    let afterEdit = prompt("Edit this task", storeTasks[i]) 
    if(afterEdit != "" && afterEdit !== null){
        storeTasks.splice(i,1,afterEdit)
        saveTasks()      
        renderTasks()
        alert("Your task has been edited.");
    }else{
        alert("You have cancelled the editing.");
    }
}

renderTasks()
