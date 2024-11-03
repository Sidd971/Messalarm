<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tasks</title>
    <style>
        body {
            background: #000000;
            color: #ffffff;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
        }

        .nav-links {
            margin-bottom: 20px;
        }

        .nav-links a {
            color: #ffffff;
            text-decoration: none;
            margin-right: 15px;
        }

        .nav-links a:hover {
            text-decoration: underline;
        }

        h1 {
            color: #ffffff;
            font-size: 24px;
            margin-bottom: 20px;
        }

        input[type="password"],
        input[type="text"] {
            background: #333;
            border: 1px solid #444;
            color: #ffffff;
            padding: 5px;
            margin: 5px 0;
            width: 200px;
        }

        button {
            background: #444;
            color: #ffffff;
            border: none;
            padding: 5px 10px;
            margin: 5px 0;
            cursor: pointer;
        }

        button:hover {
            background: #555;
        }

        #tasksPage {
            display: none;
        }

        .task {
            background: #333;
            padding: 10px;
            margin: 10px 0;
            border-radius: 4px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .task.completed {
            opacity: 0.7;
        }

        .task.completed .task-text {
            text-decoration: line-through;
        }

        #tasksList {
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="nav-links">
        <a href="index.html">Messages</a>
        <a href="tasks.html">Tasks</a>
    </div>

    <div id="loginPage">
        <h1>Tasks</h1>
        <p>Enter password to access your tasks</p>
        <input type="password" id="password" placeholder="Enter password">
        <button onclick="login()">Login</button>
    </div>

    <div id="tasksPage">
        <h1>Tasks</h1>
        <div>
            <input type="text" id="taskInput" placeholder="New task...">
            <button onclick="addTask()">Add Task</button>
        </div>
        <div id="tasksList"></div>
    </div>

    <script src="auth.js"></script>
    <script src="tasks.js"></script>
</body>
</html>
