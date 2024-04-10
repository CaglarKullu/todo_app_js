class MainController {
    constructor(projectModel, todoModel, projectView, todoListView, todoItemView, uiView) {
        this.projectModel = projectModel;
        this.todoModel = todoModel;
        this.projectView = projectView;
        this.todoListView = todoListView;
        this.todoItemView = todoItemView;
        this.uiView = uiView;

        // Initial rendering
        this.refreshProjects();
        this.refreshTodos();

        // Example setup for UI interactions
        // Assume addButton is your UI element for adding projects
        document.getElementById('add-project-btn').addEventListener('click', () => {
            this.uiView.showModal('Add Project', (projectName) => {
                this.addProject(projectName);
            });
        });
    }
    
    refreshProjects() {
        this.projectView.render(
            this.projectModel.getProjects(), 
            this.projectModel.getCurrentProjectId(), 
            this.selectProject.bind(this),
            this.deleteProject.bind(this) // Assuming you have a method to handle project deletion
        );
    }

    refreshTodos() {
        const currentProjectId = this.projectModel.getCurrentProjectId();
        this.todoListView.render(
            this.todoModel.getTodosByProjectId(currentProjectId), 
            this.selectTodo.bind(this), 
            this.toggleTodoCompletion.bind(this), 
            this.deleteTodo.bind(this)
        );
    }

    // Method to handle adding a new project
addProject(projectName) {
    this.projectModel.addProject(projectName);
    this.refreshProjects();
}

// Method to select a project and refresh the todo list
selectProject(projectId) {
    this.projectModel.setCurrentProjectId(projectId);
    this.refreshTodos();
}

// Method to delete a project
deleteProject(projectId) {
    this.projectModel.deleteProject(projectId);
    // Optionally, select another project by default
    this.refreshProjects();
    this.refreshTodos();
}
addTodo() {
    // Assume `uiView.showModal` displays a form to enter to-do details
    this.uiView.showModal('Add Todo', (todoData) => {
        this.todoModel.addTodo(this.projectModel.getCurrentProjectId(), todoData);
        this.refreshTodos();
    });
}
editTodo(todoId) {
    const todo = this.todoModel.getTodoById(todoId);
    // `showModal` with todo details for editing
    this.uiView.showModal('Edit Todo', (updatedTodoData) => {
        this.todoModel.updateTodo(todoId, updatedTodoData);
        this.refreshTodos();
    });
}
toggleTodoCompletion(todoId) {
    this.todoModel.toggleCompletion(todoId);
    this.refreshTodos();
}
deleteTodo(todoId) {
    this.uiView.showConfirmation('Are you sure you want to delete this to-do?', () => {
        this.todoModel.deleteTodo(todoId);
        this.refreshTodos();
    });
}

}

export default MainController;
