import './global.css';
import TodoModel from './models/Todo_model';
import TodoItem from './models/Todo_Item';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    app.classList.add('app');
    const todoModel = new TodoModel();
    const newTodo = new TodoItem({
        title: 'Learn JavaScript',
        description: 'Complete the course on modern JavaScript',
        dueDate: '2023-01-01',
        priority: 'High',
        notes: 'Focus on ES6+ features',
        checklist: [{ item: 'Watch videos', completed: false }, { item: 'Practice exercises', completed: false }],
        status: 'Not Started'
    });
    console.log(newTodo);
});