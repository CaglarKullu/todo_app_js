import ProjectModel from './models/projectModel';
import TodoModel from './models/toDoModel';
import ProjectView from './views/project_view/projectView.js';
import TodoListView from './views/todo_list_view/todoListView';
import TodoItemView from './views/todo_item_view/todoItemView';
import UIView from './views/ui_view/uiView';
import MainController from './controllers/MainController';
import './global.css'; 

document.addEventListener('DOMContentLoaded', () => {
    // Models
    const projectModel = new ProjectModel();
    const todoModel = new TodoModel();

    // Views
    const projectView = new ProjectView(document.getElementById('project-list'));
    const todoListView = new TodoListView(document.getElementById('todo-list'));
    const todoItemView = new TodoItemView(document.getElementById('todo-details'));
    const uiView = new UIView();

    // Initialize the main controller with all dependencies
    const mainController = new MainController(
        projectModel, 
        todoModel, 
        projectView, 
        todoListView, 
        todoItemView, 
        uiView
    );
});