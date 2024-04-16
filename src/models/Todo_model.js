import TodoItem from './Todo_Item';
import LocalStorageHelper from '../utils/localStore';


class TodoModel {
    constructor() {
        const localStorageHelper = new LocalStorageHelper();
        this.localStorageHelper = localStorageHelper;
        const todoData = JSON.parse(localStorageHelper.get('todos') || '[]');
        const todos = todoData.map(todoData => new TodoItem(
            todoData.id,
            todoData.title,
            todoData.description,
            new Date(todoData.dueDate),
            todoData.priority,
            todoData.notes,
            todoData.checklist,
            todoData.status
        ));
        this.todos =todos;
       
    }

    saveTodos() {
       this.localStorageHelper.set('todos', JSON.stringify(this.todos));
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