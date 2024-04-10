class ProjectView {
    constructor(rootElement) {
        this.rootElement = rootElement;
    }

    render(projects, currentProjectId, onProjectSelect) {
        // Clear the root element first
        this.rootElement.innerHTML = '';

        // Create and append project elements
        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.textContent = project.name;
            projectElement.classList.add('project');

            // Highlight the current project
            if (project.id === currentProjectId) {
                projectElement.classList.add('active');
            }

            projectElement.addEventListener('click', () => onProjectSelect(project.id));
            
            this.rootElement.appendChild(projectElement);
        });
    }
}

export default ProjectView;
