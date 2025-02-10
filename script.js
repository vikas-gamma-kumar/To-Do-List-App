// Get references to HTML elements
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Load saved tasks from local storage when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

// Event listener for adding a new task
addTaskButton.addEventListener("click", addTask);

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim(); // Get text and remove spaces

    if (taskText === "") {
        alert("Task cannot be empty!"); // Alert if input is empty
        return;
    }

    createTaskElement(taskText); // Create the task element
    saveTask(taskText); // Save task to local storage

    taskInput.value = ""; // Clear input field
}

// Function to create a task element and add it to the list
function createTaskElement(taskText) {
    const li = document.createElement("li"); // Create list item
    li.textContent = taskText;

    // Add event to mark task as completed
    li.addEventListener("click", () => {
        li.classList.toggle("completed"); // Toggle completed class
    });

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.classList.add("delete");

    // Remove task on delete button click
    deleteButton.addEventListener("click", () => {
        li.remove();
        removeTaskFromStorage(taskText);
    });

    // Add delete button to task
    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

// Function to save tasks to local storage
function saveTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(createTaskElement);
}

// Function to remove task from local storage
function removeTaskFromStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
