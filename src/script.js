document.addEventListener("DOMContentLoaded", ()=>{
    const listInput = document.getElementById("listInput");
    const addBtn = document.getElementById("addBtn");
    const taskList = document.getElementById("taskList");

    let tasks = JSON.parse(localStorage.getItem("tasks"))||[];
    tasks.forEach((task) => {
        renderTask(task)
    });
    
    addBtn.addEventListener("click", ()=>{
        const taskText = listInput.value.trim()
        if(taskText==="") return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: true
        };

        tasks.push(newTask);
        saveToLocatStorage();
        renderTask(newTask);
        listInput.value=""; 
    })

    function renderTask(task) {
        console.log(task);
        let li = document.createElement("li");
        li.classList.add("p-2","rounded-lg");
        li.setAttribute("data-id", task.id)
        li.innerHTML= `
            <div id="father" class="flex align-middle flex-row justify-between">
                <div id="father" class="p-2 text-black text-lg">
                    <p class=${task.completed? "line-through": ""}>${task.text}</p>
                </div>
                <button 
                    class="flex text-red-500 border-2 border-red-500 p-2 rounded-lg">
                    <svg class="h-6 w-6 text-red-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="15" y1="9" x2="9" y2="15" />  <line x1="9" y1="9" x2="15" y2="15" /></svg>
                    <span>Remove</span>
                </button>
            </div>
            <hr class="mt-2"/>
        `
        li.addEventListener('click',(e)=>{
            if(e.target.tagName==="BUTTON") return;
            task.completed = !task.completed;
            let pTag = li.getElementsByTagName("P")[0];
            pTag.classList.toggle("line-through")
            saveToLocatStorage();
        })        

        li.querySelector("button").addEventListener("click", (e) => {
            e.stopPropagation(); //prevent toggle from firing
            tasks = tasks.filter((t) => t.id !== task.id);
            li.remove();
            saveToLocatStorage();
          });
        taskList.appendChild(li)
    }

    function saveToLocatStorage(){
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
})