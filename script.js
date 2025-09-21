
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks() {
      const taskList = document.getElementById("taskList");
      taskList.innerHTML = "";
      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <span class="task-text">${task}</span>
          <div class="actions">
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
          </div>
        `;
        taskList.appendChild(li);
      });
    }

    function addTask() {
      const input = document.getElementById("taskInput");
      const errorMsg = document.getElementById("errorMsg");
      const task = input.value.trim();

      if (task === "") {
        errorMsg.style.display = "block";
        return;
      }
      errorMsg.style.display = "none";

      tasks.push(task);
      saveTasks();
      renderTasks();
      input.value = "";
    }

    function deleteTask(index) {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    }

    function editTask(index) {
      const taskList = document.getElementById("taskList");
      const li = taskList.children[index];
      const oldText = tasks[index];

      li.innerHTML = `
        <input type="text" class="edit-input" value="${oldText}">
        <div class="actions">
          <button onclick="saveEdit(${index})">Save</button>
          <button onclick="renderTasks()">Cancel</button>
        </div>
      `;
    }

    function saveEdit(index) {
      const taskList = document.getElementById("taskList");
      const li = taskList.children[index];
      const newValue = li.querySelector("input").value.trim();

      if (newValue === "") {
        alert("Task cannot be empty!");
        return;
      }

      tasks[index] = newValue;
      saveTasks();
      renderTasks();
    }

    document.getElementById("addBtn").addEventListener("click", addTask);
    document.getElementById("taskInput").addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        addTask();
      }
    });

    renderTasks();