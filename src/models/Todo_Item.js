import { format, parseISO } from 'date-fns';
class TodoItem {
    constructor( {id, title, description, dueDate, priority, notes = '', checklist = [], status = 'Not Started'}) {
        this.id = id ||Date.now().toString(); // A unique identifier for the todo
        this.title = title; // The title of the todo
        this.description = description; // A brief description of the task
        this.dueDate = dueDate; // The date when the todo should be completed
        this.priority = priority; // The urgency of the todo, e.g., "Low", "Medium", "High"
        this.notes = notes; // Additional remarks or information
        this.checklist = checklist; // Sub-tasks or steps required to complete the main task
        this.status = status; // Current state of the task, e.g., "Not Started", "In Progress", "Completed"
    }
    // Method to get the due date in 'yyyy-MM-dd' format
    getFormattedDueDate() {
        // Format the date as 'yyyy-MM-dd'
        return format(this.dueDate, 'yyyy-MM-dd');
    }

    // Method to toggle the completion status of the todo
    toggleCompleted() {
        this.status = this.status === 'Completed' ? 'Not Started' : 'Completed';
    }

    // Method to update the todo's priority
    updatePriority(newPriority) {
        this.priority = newPriority;
    }

    // Method to add a note to the todo
    addNote(note) {
        this.notes += `\n${note}`;
    }

    // Method to add a sub-task to the checklist
    addChecklistItem(item) {
        this.checklist.push({ item, completed: false });
    }

    // Method to toggle the completion status of a checklist item
    toggleChecklistItem(index) {
        if (index >= 0 && index < this.checklist.length) {
            this.checklist[index].completed = !this.checklist[index].completed;
        }
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            dueDate: this.dueDate instanceof Date ? this.dueDate.toISOString() : this.dueDate,
            priority: this.priority,
            notes: this.notes,
            checklist: this.checklist,
            status: this.status,
        };
    }
    deserializeTodoItem(todoData) {
        return new TodoItem(
            todoData.id,
            todoData.title,
            todoData.description,
            parseISO(todoData.dueDate), // Convert ISO string back to Date
            todoData.priority,
            todoData.notes,
            todoData.checklist,
            todoData.status
        );
    }
}

export default TodoItem;