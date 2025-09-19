const addBtn = document.getElementById("addBtn");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const errorMessage = document.getElementById("errorMessage");

const todos = [];

addBtn.addEventListener("click", () => {
  const task = todoInput.value.trim();

  todos.unshift(task);
  todoInput.value = "";
  renderTodos();
});

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    const taskText = document.createElement("span");
    taskText.className = "todo-text";
    taskText.textContent = task;

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => editTask(index, li, taskText));

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(index));

    li.appendChild(taskText);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}

function editTask(index, li, taskText) {
  const input = document.createElement("input");
  input.type = "text";
  input.value = todos[index];
  input.className = "todo-text";

  const saveBtn = document.createElement("button");
  saveBtn.className = "save-btn";
  saveBtn.textContent = "Save";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete";

  li.innerHTML = "";
  li.appendChild(input);
  li.appendChild(saveBtn);
  li.appendChild(deleteBtn);

  saveBtn.addEventListener("click", () => {
    const updatedTask = input.value.trim();
    if (updatedTask !== "") {
      todos[index] = updatedTask;
      renderTodos();
    }
  });

  deleteBtn.addEventListener("click", () => deleteTask(index));
}

function deleteTask(index) {
  todos.splice(index, 1);
  renderTodos();
}
