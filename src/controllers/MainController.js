class MainController {
    constructor(projectModel, todoModel, projectView, todoListView, todoItemView, uiView) {
        this.projectModel = projectModel;
        this.todoModel = todoModel;
        this.projectView = projectView;
        this.todoListView = todoListView;
        this.todoItemView = todoItemView;
        this.uiView = uiView;
        this.selectTodo = this.selectTodo.bind(this);
        // Initial rendering
        this.init();
        this.refreshProjects();
        this.refreshTodos();
    }

    init() {
        // Wait until the call stack is clear to ensure all synchronous rendering tasks are complete
        setTimeout(() => {
            const addButton = document.getElementById('add-project-btn');
            if (addButton) {
                addButton.addEventListener('click', () => {
                    this.uiView.showModal(this.getAddProjectModalContent(), (projectName) => {
                        this.addProject(projectName);
                    });
                });
            } else {
                console.error("Add Project button not found!");
            }
        }, 0);
    }
    getAddProjectModalContent() {
        // Return the HTML content for the modal to add a new project
        return `
            <div>
                <input type="text" id="project-name-input" placeholder="Enter Project Name">
                <button id="submit-btn">Add Project</button>
                <button id="close-modal-btn">Close</button>
            </div>
        `;
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
        const todos = this.todoModel.getTodosByProjectId(currentProjectId);
        this.todoListView.render(
            todos,
            this.selectTodo.bind(this),
            this.toggleTodoCompletion.bind(this),
            this.deleteTodo.bind(this)
        );
    }

    // Method to handle adding a new project
    addProject(projectName) {
        if (projectName.trim() !== '') {
            this.projectModel.addProject(projectName);
            this.projectView.render(
                this.projectModel.getProjects(),
                this.projectModel.getCurrentProjectId()
            );
        } else {
            console.log('Project name cannot be empty.');
        }
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

selectTodo(todoId) {
    const todo = this.todoModel.findTodoById(todoId);
    if (todo) {
        this.todoItemView.render(todo, this.saveTodo.bind(this), this.cancelEdit.bind(this));
    } else {
        console.error("Todo not found!");
    }
}

saveTodo(todoData) {
    this.todoModel.updateTodo(todoData);
    this.refreshTodos();
    this.uiView.hideModal(); // Assuming modal usage
}

cancelEdit() {
    this.uiView.hideModal(); // Assuming modal usage
}

}

export default MainController;
