let tasksRef;
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', function() {
    if (checkAuth()) {
        tasksRef = database.ref('tasks/' + hashPassword(currentPassword));
        loadTasks();
    }

    document.getElementById('taskInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addTask();
    });
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('taskDueDate');
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value ? new Date(dueDateInput.value).getTime() : null;
    
    if (taskText) {
        const taskObj = {
            text: taskText,
            completed: false,
            createdAt: Date.now(),
            dueDate: dueDate,
        };

        tasksRef.push(taskObj);
        taskInput.value = '';
        dueDateInput.value = '';
    }
}

function loadTasks() {
    tasksRef.on('value', (snapshot) => {
        const tasks = [];
        snapshot.forEach((childSnapshot) => {
            const task = childSnapshot.val();
            tasks.push({ ...task, id: childSnapshot.key });
        });

        displayTasks(tasks);
    });
}

function displayTasks(tasks) {
    const tasksList = document.getElementById('tasksList');
    tasksList.innerHTML = '';

    tasks
        .sort((a, b) => {
            if (a.completed === b.completed) {
                return b.createdAt - a.createdAt;
            }
            return a.completed ? 1 : -1;
        })
        .filter(task => {
            if (currentFilter === 'active') return !task.completed;
            if (currentFilter === 'completed') return task.completed;
            return true;
        })
        .forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.className = `task ${task.completed ? 'completed' : ''}`;
            
            const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleString() : 'No due date';
            
            taskDiv.innerHTML = `
                <input type="checkbox" 
                    ${task.completed ? 'checked' : ''} 
                    onchange="toggleTask('${task.id}', this.checked)">
                <span class="task-text">${task.text}</span>
                <span class="task-due-date">Due: ${dueDate}</span>
                <button onclick="deleteTask('${task.id}')" class="delete-btn">Delete</button>
            `;
            
            tasksList.appendChild(taskDiv);
        });
}

function toggleTask(taskId, completed) {
    tasksRef.child(taskId).update({ completed });
}

function deleteTask(taskId) {
    tasksRef.child(taskId).remove();
}

function filterTasks(filter) {
    currentFilter = filter;
    document.querySelectorAll('.task-filters button').forEach(btn => {
        btn.classList.toggle('active', btn.innerText.toLowerCase() === filter);
    });
    loadTasks();
}
