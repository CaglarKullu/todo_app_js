import { format } from 'date-fns';
import './Edit_Todo.css';

export default class EditTodoForm {
    constructor(todo, onUpdate) {
        this.todo = todo;
        this.onUpdate = onUpdate;
    }

    render() {
        const container = document.createElement('div');
        container.className = 'edit-todo-form';
        container.id = 'modal';

        const html = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <form id="editForm">
                    <label for="title">Title:</label>
                    <input type="text" id="editTitle" name="title" value="${this.todo.title}" required>

                    <label for="description">Description:</label>
                    <textarea id="editDescription" name="description" required>${this.todo.description}</textarea>

                    <label for="dueDate">Due Date:</label>
                    <input type="date" id="editDueDate" name="dueDate" value="${format(new Date(this.todo.dueDate), 'yyyy-MM-dd')}" required>

                    <label for="priority">Priority:</label>
                    <select id="editPriority" name="priority">
                        <option value="Low" ${this.todo.priority === 'Low' ? 'selected' : ''}>Low</option>
                        <option value="Medium" ${this.todo.priority === 'Medium' ? 'selected' : ''}>Medium</option>
                        <option value="High" ${this.todo.priority === 'High' ? 'selected' : ''}>High</option>
                    </select>

                    <label for="status">Status:</label>
                    <select id="editStatus" name="status">
                        <option value="Not Started" ${this.todo.status === 'Not Started' ? 'selected' : ''}>Not Started</option>
                        <option value="In Progress" ${this.todo.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                        <option value="Completed" ${this.todo.status === 'Completed' ? 'selected' : ''}>Completed</option>
                    </select>

                    <button type="submit">Submit</button>
                </form>
            </div>
        `;

        container.innerHTML = html;

        const closeSpan = container.querySelector(".close");
        closeSpan.onclick = () => container.style.display = "none";

        const form = container.querySelector("form");
        form.onsubmit = (event) => {
            event.preventDefault();
            this.handleSubmit(form);
        };

        return container;
    }

    handleSubmit(form) {
        const updatedTodo = {
            ...this.todo,
            title: form.editTitle.value,
            description: form.editDescription.value,
            dueDate: new Date(form.editDueDate.value),
            priority: form.editPriority.value,
            status: form.editStatus.value
        };
        this.onUpdate(updatedTodo);
        const modal = document.getElementById('modal');
        modal.style.display = "none";

    }
}
