// DOM elements
const todoContentInput = document.getElementById('todoContent');
const todoCategorySelect = document.getElementById('todoCategory');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');

// Function to fetch all todos from the server
async function fetchTodos() {
    try {
        const response = await fetch('/api/todos');
        const todos = await response.json();
        
        // Clear current list
        todoList.innerHTML = '';
        
        // Add each todo to the DOM
        todos.forEach(todo => {
            addTodoToDOM(todo);
        });
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

// Function to add a new todo
async function addTodo() {
    const content = todoContentInput.value.trim();
    const category = todoCategorySelect.value;
    
    if (!content || !category) {
        alert('Please enter both content and category');
        return;
    }
    
    try {
        const response = await fetch('/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content, category })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to add todo');
        }
        
        const newTodo = await response.json();
        
        // Add the new todo to the DOM
        addTodoToDOM(newTodo);
        
        // Clear the form
        todoContentInput.value = '';
        todoCategorySelect.value = '';
    } catch (error) {
        console.error('Error adding todo:', error);
        alert(error.message);
    }
}

// Function to delete a todo
async function deleteTodo(id) {
    try {
        const response = await fetch(`/api/todos/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to delete todo');
        }
        
        // Remove the todo from the DOM
        const todoElement = document.querySelector(`.todo-item[data-id="${id}"]`);
        if (todoElement) {
            todoElement.remove();
        }
    } catch (error) {
        console.error('Error deleting todo:', error);
        alert(error.message);
    }
}

// Function to add a todo to the DOM
function addTodoToDOM(todo) {
    const todoElement = document.createElement('div');
    todoElement.className = `todo-item ${todo.category}`;
    todoElement.setAttribute('data-id', todo.id);
    
    todoElement.innerHTML = `
        <div class="todo-content">${todo.content}</div>
        <span class="todo-category ${todo.category}">${todo.category}</span>
        <button class="delete-btn">Delete</button>
    `;
    
    const deleteBtn = todoElement.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
    
    todoList.appendChild(todoElement);
}

// Event listener for the add button
addTodoBtn.addEventListener('click', addTodo);

// Initial fetch of todos when the page loads
document.addEventListener('DOMContentLoaded', fetchTodos);
