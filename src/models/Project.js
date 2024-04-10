class Project {
    constructor(id, name) {
        this.id = id; // Unique identifier for the project
        this.name = name; // Name of the project
        this.todos = []; // Array to hold TodoItem objects
    }

    // Method to add a new TodoItem to the project
    addTodo(todoItem) {
        this.todos.push(todoItem);
    }

    // Method to remove a TodoItem from the project by its id
    removeTodoById(todoId) {
        this.todos = this.todos.filter(todo => todo.id !== todoId);
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
        this.name = newName;
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
}

export default Project;