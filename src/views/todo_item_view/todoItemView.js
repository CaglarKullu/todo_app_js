import './todoItemView.css';
class TodoItemView {
    constructor(rootElement) {
        this.rootElement = rootElement;
    }

    // Render the view with the to-do item details
    render(todoItem, onSave, onCancel, onDelete) {
        this.rootElement.innerHTML = `
            <div class="todo-item-detail">
                <div>
                    <label>Title:</label>
                    <input type="text" value="${todoItem.title}" class="todo-title-edit" />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea class="todo-desc-edit">${todoItem.description}</textarea>
                </div>
                <div>
                    <label>Due Date:</label>
                    <input type="date" value="${todoItem.dueDate}" class="todo-due-date-edit" />
                </div>
                <div>
                    <label>Priority:</label>
                    <select class="todo-priority-edit">
                        <option value="High" ${todoItem.priority[1] === 'High' ? 'selected' : ''}>High</option>
                        <option value="Medium" ${todoItem.priority[1] === 'Medium' ? 'selected' : ''}>Medium</option>
                        <option value="Low" ${todoItem.priority[1] === 'Low' ? 'selected' : ''}>Low</option>
                    </select>
                </div>
                <button class="save-todo-btn">Save</button>
                <button class="cancel-todo-btn">Cancel</button>
                <button class="delete-todo-btn">Delete</button>
            </div>
        `;

        this.rootElement.querySelector('.save-todo-btn').addEventListener('click', () => onSave(this.collectTodoData()));
        this.rootElement.querySelector('.cancel-todo-btn').addEventListener('click', onCancel);
        this.rootElement.querySelector('.delete-todo-btn').addEventListener('click', () => onDelete(todoItem.id));
    }

    // Collect data from the form fields
    collectTodoData() {
        return {
            title: this.rootElement.querySelector('.todo-title-edit').value,
            description: this.rootElement.querySelector('.todo-desc-edit').value,
            dueDate: this.rootElement.querySelector('.todo-due-date-edit').value,
            priority: [this.rootElement.querySelector('.todo-priority-edit').selectedIndex + 1, this.rootElement.querySelector('.todo-priority-edit').value]
        };
    }
}

export default TodoItemView;