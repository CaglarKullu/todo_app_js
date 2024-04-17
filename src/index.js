import './global.css';
import TodoModel from './models/Todo_model';
import TodoItem from './models/Todo_Item';

    const app = document.getElementById('app');
    app.classList.add('app');
    const todoModel = new TodoModel();
    const newTodo = new TodoItem({
        title: 'Learn JavaScript3',
        description: 'Complete the course on modern JavaScript',
        dueDate: '2023-01-01',
        priority: 'High',
        notes: 'Focus on ES6+ features',
        checklist: [{ item: 'Watch videos', completed: false }, { item: 'Practice exercises', completed: false }],
        status: 'Not Started'
    });
    const newTodo2 = new TodoItem({
        title: 'Learn JavaScript2',
        description: 'Complete the course on modern JavaScript',
        dueDate: '2023-01-01',
        priority: 'High',
        notes: 'Focus on ES6+ features',
        checklist: [{ item: 'Watch videos', completed: false }, { item: 'Practice exercises', completed: false }],
        status: 'Not Started'
    });
    const todos = todoModel.getTodos();
    console.log(todos);
