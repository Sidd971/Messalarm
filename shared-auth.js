// Firebase configuration
const firebaseConfig = {
    // Replace with your config
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
let currentPassword = '';

// Check if user is already logged in
function checkAuth() {
    const storedPassword = sessionStorage.getItem('password');
    if (storedPassword) {
        currentPassword = storedPassword;
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('messagePage') ? 
            document.getElementById('messagePage').style.display = 'block' :
            document.getElementById('tasksPage').style.display = 'block';
        return true;
    }
    return false;
}

function login() {
    const password = document.getElementById('password').value;
    if (password) {
        currentPassword = password;
        sessionStorage.setItem('password', password);
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('messagePage') ? 
            document.getElementById('messagePage').style.display = 'block' :
            document.getElementById('tasksPage').style.display = 'block';
        
        // Initialize page-specific content
        if (typeof loadMessages === 'function') loadMessages();
        if (typeof loadTasks === 'function') loadTasks();
    }
}

function hashPassword(password) {
    return btoa(password).replace(/[/+=]/g, '_');
}

// Check auth on page load
document.addEventListener('DOMContentLoaded', checkAuth);
