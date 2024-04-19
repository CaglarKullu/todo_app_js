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
        localStorage.setItem('todos', JSON.stringify(this.todos.map(todo => JSON.parse(JSON.stringify(todo)))));
    }

    addTodo(todo) {
        this.todos.push(todo);
        this.saveTodos();
    }

    deleteTodoById(id) {
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
    addSampleTodos() {
        const samples = [
            new TodoItem({
                id: Date.now().toString(),
                title: 'Learn JavaScript',
                description: 'Complete the JavaScript course on interactive platforms',
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),  // One week from now
                priority: 'High',
                notes: 'Start with ES6 features',
                checklist: [
                    { item: 'Watch video lectures', completed: false },
                    { item: 'Complete hands-on exercises', completed: false }
                ],
                status: 'Not Started'
            }),
            new TodoItem({
                id: Date.now().toString(),
                title: 'Grocery Shopping',
                description: 'Buy groceries for next week',
                dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),  // Two days from now
                priority: 'Medium',
                notes: 'Remember to check pantry stocks',
                checklist: [
                    { item: 'Eggs', completed: false },
                    { item: 'Milk', completed: false }
                ],
                status: 'Not Started'
            })
        ];

        samples.forEach(sample => this.addTodo(sample));
    }
}
export default TodoModel;