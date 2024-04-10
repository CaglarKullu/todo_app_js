class TodoListView {
    constructor(rootElement) {
        this.rootElement = rootElement;
    }

    render(todos, onTodoSelect, onTodoDelete) {
        this.rootElement.innerHTML = '';

        todos.forEach(todo => {
            const todoElement = document.createElement('div');
            todoElement.textContent = `${todo.title} - Due: ${todo.dueDate}`;
            todoElement.classList.add('todo-item');

            // Event listener for selecting a todo to view/edit
            todoElement.addEventListener('click', () => onTodoSelect(todo.id));

            // Delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent triggering the click on the todoElement
                onTodoDelete(todo.id);
            });

            todoElement.appendChild(deleteBtn);
            this.rootElement.appendChild(todoElement);
        });
    }
}

export default TodoListView;