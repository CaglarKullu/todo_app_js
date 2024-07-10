import './global.css';
import TodoModel from './models/Todo_model';
import TodoTileList from './components/create_todo/todo_tile_list/Todo_Tile_List.js';
import EditTodoForm from './components/edit_todo/Edit_Todo.js';
import FloatingActionButton from './components/fab/Fab.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const todoModel = new TodoModel();


    function render() {
        const todos = todoModel.getTodos();
        const todoTileList = new TodoTileList(todos, handleUpdate, handleDelete);
        app.innerHTML = '';  // Clear previous content
        if(todos.length === 0) {
            // No todos found
            const div = document.createElement('div');
            div.className = 'no-todos-found';
            div.textContent = 'No todos found';
            app.appendChild(div);
        }
        app.appendChild(todoTileList.render());
    }

    function handleUpdate(todo) {
        const editForm = new EditTodoForm(todo, (updatedTodo) => {
            todoModel.updateTodo(updatedTodo);
            render();
        });
        const formElement = editForm.render();
        document.body.appendChild(formElement);
        formElement.style.display = 'block'; // Show the form
    }
    function handleDelete(id) {
        console.log('Deleting todo with id:', id);
        todoModel.deleteTodoById(id);
        render();
    }

    render();
});
