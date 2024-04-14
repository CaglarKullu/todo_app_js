import './projectView.css';

class ProjectView {
    constructor(rootElement, onProjectAdd, onProjectSelect, onProjectDelete) {
        this.rootElement = rootElement;
        this.onProjectAdd = onProjectAdd;
        this.onProjectSelect = onProjectSelect;
        this.onProjectDelete = onProjectDelete;

        // Bind the method to ensure 'this' context is maintained
        this.renderProjects = this.renderProjects.bind(this);
    }

    // Call this method to initially set up the project view with an add project form and project list
    render(projects, currentProjectId) {
        this.rootElement.innerHTML = `
            <aside class="add-project">
                <input type="text" id="new-project-name" placeholder="New Project Name" />
                <button id="add-project-btn">Add Project</button>
            </aside>
            <ul id="project-list"></ul>
        `;

        // Immediately query the DOM for the button and set up the event listener
        this.setupEventListeners();
        
        // Render projects after setting up initial UI
        this.projectListElement = this.rootElement.querySelector('#project-list');
        this.renderProjects(projects, currentProjectId);
    }

    setupEventListeners() {
        const addBtn = this.rootElement.querySelector('#add-project-btn');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                const projectName = this.rootElement.querySelector('#new-project-name').value.trim();
                if (projectName) {
                    this.onProjectAdd(projectName);
                }
            });
        } else {
            console.error('The add button was not found in the DOM.');
        }
    }

    renderProjects(projects, currentProjectId) {
        this.projectListElement.innerHTML = projects.map(project => `
            <li class="project-item ${project.id === currentProjectId ? 'active' : ''}" data-project-id="${project.id}">
                ${project.name}
                <span class="delete-project-btn" data-project-id="${project.id}" data-project-name="${project.name}">❌</span>
            </li>
        `).join('');
    }
}

export default ProjectView;
