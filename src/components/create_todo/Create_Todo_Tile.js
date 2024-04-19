import { format } from 'date-fns';

export default class TodoTile {
    constructor(todo, onUpdate, onDelete) {
        this.todo = todo;
        this.onUpdate = onUpdate;
        this.onDelete = onDelete;
    }

    render() {
        const element = document.createElement('div');
        element.className = 'todo-tile';

        // Title
        const title = document.createElement('h4');
        title.textContent = this.todo.title;
        element.appendChild(title);

        // Description
        const description = document.createElement('p');
        description.textContent = this.todo.description;
        element.appendChild(description);

        // Due Date
        const dueDate = document.createElement('span');
        dueDate.textContent = 'Due: ' + format(new Date(this.todo.dueDate), 'PP'); // Using 'PP' for more readable date format
        element.appendChild(dueDate);

        // Priority
        const priority = document.createElement('span');
        priority.textContent = 'Priority: ' + this.todo.priority;
        element.appendChild(priority);

        // Status
        const status = document.createElement('span');
        status.textContent = 'Status: ' + this.todo.status;
        element.appendChild(status);

        // Notes
        const notes = document.createElement('p');
        notes.textContent = 'Notes: ' + this.todo.notes;
        element.appendChild(notes);

        // Checklist (only display if items exist)
        if (this.todo.checklist.length > 0) {
            const checklistLabel = document.createElement('h5');
            checklistLabel.textContent = 'Checklist:';
            element.appendChild(checklistLabel);

            const checklistUl = document.createElement('ul');
            this.todo.checklist.forEach(item => {
                const li = document.createElement('li');
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = item.completed;
                checkbox.disabled = true; // Disable editing here, handle in edit dialog or similar
                
                const itemLabel = document.createElement('span');
                itemLabel.textContent = item.item;

                li.appendChild(checkbox);
                li.appendChild(itemLabel);
                checklistUl.appendChild(li);
            });
            element.appendChild(checklistUl);
        }

        // Edit Button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => this.onUpdate(this.todo);
        element.appendChild(editButton);

        // Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => this.onDelete(this.todo.id);
        element.appendChild(deleteButton);

        return element;
    }
}
