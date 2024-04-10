import { TodoItem } from '../models/Todo_Model';
import { Project } from '../models/Project';
class LocalStorageHelper {
    constructor() {
        this.localStorage = window.localStorage;
    }

    get(key) {
        return JSON.parse(this.localStorage.getItem(key));
    }

    set(key, value) {
        this.localStorage.setItem(key, JSON.stringify(value));
    }

    remove(key) {
        this.localStorage.removeItem(key);
    }

    clear() {
        this.localStorage.clear();
    }

    has(key) {
        return this.localStorage.getItem(key) !== null;
    }

    saveProjects(projects) {
        const projectsToSave = projects.map(project => project.toJSON());
        this.set('projects', JSON.stringify(projectsToSave));
    }

    loadProjects() {
        const projectsData = JSON.parse(this.get('projects') || '[]');
        const projects = projectsData.map(projectData => {
            const project = new Project(projectData.id, projectData.name);
            project.todos = projectData.todos.map(todoData => new TodoItem(
                todoData.id, todoData.title, todoData.description, new Date(todoData.dueDate),
                todoData.priority, todoData.notes, todoData.checklist, todoData.status
            ));
            return project;
        });
        return projects;
    }
}

export default LocalStorageHelper;