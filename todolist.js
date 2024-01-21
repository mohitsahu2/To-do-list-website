document.addEventListener('DOMContentLoaded', function () {
    // Function to retrieve tasks from local storage
    function getTasks() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    }

    // Function to save tasks to local storage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to render tasks on the UI
    function renderTasks() {
        const todoList = document.getElementById('todo-list');
        const tasks = getTasks();

        todoList.innerHTML = '';

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'task';
            li.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} />
                <span>${task.text}</span>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            `;
            li.querySelector('input').addEventListener('change', () => toggleTaskCompletion(index));
            todoList.appendChild(li);
        });
    }

    // Function to add a new task
    function addTask(text) {
        const tasks = getTasks();
        tasks.push({ text, completed: false });
        saveTasks(tasks);
        renderTasks();
    }

    // Function to delete a task
    function deleteTask(index) {
        const tasks = getTasks();
        tasks.splice(index, 1);
        saveTasks(tasks);
        renderTasks();
    }

    // Function to toggle task completion
    function toggleTaskCompletion(index) {
        const tasks = getTasks();
        tasks[index].completed = !tasks[index].completed;
        saveTasks(tasks);
        renderTasks();
    }

    // Event listener for adding a new task
    document.getElementById('new-task').addEventListener('keyup', function (event) {
        if (event.key === 'Enter' && this.value.trim() !== '') {
            addTask(this.value.trim());
            this.value = '';
        }
    });

    // Initial rendering of tasks
    renderTasks();
});