class TodoModel {
    constructor() {
        this.todos = []; // This will store all todos
    }

    // Adds a new TodoItem to the model
    addTodo(todoItem) {
        this.todos.push(todoItem);
    }

    // Retrieves todos by project ID
    getTodosByProjectId(projectId) {
        return this.todos.filter(todo => todo.projectId === projectId);
    }

    // Other methods as needed, e.g., deleteTodo, updateTodo, etc.
}

export default TodoModel;