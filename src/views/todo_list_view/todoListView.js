import './todoListView.css';
class TodoListView {
    constructor(rootElement) {
        this.rootElement = rootElement;
    }

    render(todoItems, onTodoSelect, onTodoComplete, onTodoDelete) {
        this.rootElement.innerHTML = ''; // Clear the list before re-rendering

        const listElement = document.createElement('ul');
        listElement.className = 'todo-list';

        todoItems.forEach(todoItem => {
            const itemElement = document.createElement('li');
            itemElement.className = 'todo-item';
            itemElement.innerHTML = `
                <span class="todo-title ${todoItem.completed ? 'todo-completed' : ''}" data-id="${todoItem.id}">${todoItem.title}</span>
                <span class="todo-due-date">${todoItem.dueDate}</span>
                <button class="toggle-complete-btn" data-id="${todoItem.id}">✓</button>
                <button class="delete-todo-btn" data-id="${todoItem.id}">🗑</button>
            `;

            // Event listeners for actions
            itemElement.querySelector('.todo-title').addEventListener('click', () => onTodoSelect(todoItem.id));
            itemElement.querySelector('.toggle-complete-btn').addEventListener('click', () => onTodoComplete(todoItem.id));
            itemElement.querySelector('.delete-todo-btn').addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent triggering the select action
                onTodoDelete(todoItem.id);
            });

            listElement.appendChild(itemElement);
        });

        this.rootElement.appendChild(listElement);
    }
}

export default TodoListView;