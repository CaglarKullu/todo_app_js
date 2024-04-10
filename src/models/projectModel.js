class ProjectModel {
    constructor() {
        this.projects = []; // Array to hold Project instances
        this.currentProjectId = null; // or some default value
    }

    // Adds a new Project instance to the model
    addProject(name) {
        const id = this.generateProjectId(); // Implement this method based on your ID strategy
        const newProject = new Project(id, name);
        this.projects.push(newProject);
        return newProject;
    }

    // Retrieves all projects
    getProjects() {
        return this.projects;
    }

    // Finds a project by ID
    findProjectById(projectId) {
        return this.projects.find(project => project.id === projectId);
    }

    // Sets the current project ID
    setCurrentProjectId(projectId) {
        this.currentProjectId = projectId;
    }

    // Gets the current project ID
    getCurrentProjectId() {
        return this.currentProjectId;
    }

    // Generates a unique ID for new projects
    generateProjectId() {
        // Simple ID generation strategy - you might want something more robust
        return Date.now().toString();
    }

    // Additional methods as needed...
}

export default ProjectModel;