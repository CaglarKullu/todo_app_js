import TodoItem from './Todo_Item';
class TodoModel {
    constructor() {
        if (!TodoModel.instance) {
            this.todos = [];
            this.loadTodos(); 
            TodoModel.instance = this;
        }
        return TodoModel.instance;
    }

    loadTodos() {
        const storedTodos = localStorage.getItem('todos');
        if (!storedTodos) {
            this.todos = [];
        } else {
            this.todos = JSON.parse(storedTodos).map(todoData => new TodoItem({
                id: todoData.id,
                title: todoData.title,
                description: todoData.description,
                dueDate: new Date(todoData.dueDate),
                priority: todoData.priority,
                notes: todoData.notes,
                checklist: todoData.checklist,
                status: todoData.status
            }));
        }
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos.map(todo => todo.toJSON())));
    }

    addTodo(todo) {
        this.todos.push(todo);
        this.saveTodos();
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveTodos();
    }

    updateTodo(todo) {
        const index = this.todos.findIndex(t => t.id === todo.id);
        if (index !== -1) {
            this.todos[index] = todo;
            this.saveTodos();
        }
    }

    getTodos() {
        return this.todos;
    }

    clearTodos() {
        this.todos = [];
        this.saveTodos();
    }
}
export default TodoModel;