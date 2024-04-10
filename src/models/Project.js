import { isBefore } from 'date-fns';
class Project {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.todos = [];
        this.status = 'active'; 
    }
    // Method to add a new TodoItem to the project
    addTodo(todoItem) {
        if (!(todoItem instanceof TodoItem)) {
            throw new TypeError('Expected todoItem to be an instance of TodoItem');
        }
        this.todos.push(todoItem);
    }
    // Method to remove a TodoItem from the project by its id
    removeTodoById(todoId) {
        const index = this.todos.findIndex(todo => todo.id === todoId);
        if (index === -1) {
            throw new Error('TodoItem not found');
        }
        this.todos.splice(index, 1);
    }

    // Method to find a TodoItem in the project by its id
    findTodoById(todoId) {
        return this.todos.find(todo => todo.id === todoId);
    }

    // Method to get all TodoItems in the project
    getAllTodos() {
        return this.todos;
    }

    // Optional: Method to update the project name
    updateName(newName) {
        if (typeof newName !== 'string' || !newName.trim()) {
            throw new Error('Invalid name provided');
        }
        this.name = newName.trim();
    }

    // Optional: Method to get all TodoItems due before a specific date
    getTodosDueBefore(date) {
        return this.todos.filter(todo => isBefore(todo.dueDate, date));
    }

    // Method to convert the project object to JSON
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            todos: this.todos.map(todo => todo.toJSON()), // Serialize each TodoItem
        };
    }
    static fromJSON(json) {
        const project = new Project(json.id, json.name);
        json.todos.forEach(todoJson => {
            const todo = TodoItem.fromJSON(todoJson); // Assuming TodoItem has a similar fromJSON method
            project.addTodo(todo);
        });
        return project;
    }
    setStatus(status) {
        const validStatuses = ['active', 'completed', 'archived'];
        if (!validStatuses.includes(status)) {
            throw new Error('Invalid project status');
        }
        this.status = status;
    }

    getStatus() {
        return this.status;
    }
    sortTodosByPriority() {
        this.todos.sort((a, b) => b.priority - a.priority);
    }

    getTodoSummary() {
        const summary = {
            total: this.todos.length,
            completed: this.todos.filter(todo => todo.completed).length,
            pending: this.todos.filter(todo => !todo.completed).length
        };
    
        return summary;
    }
}

export default Project;