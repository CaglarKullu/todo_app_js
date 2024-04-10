import './projectView.css';
class ProjectView {
    constructor(rootElement, onProjectAdd, onProjectSelect, onProjectDelete) {
        this.rootElement = rootElement;
        this.onProjectAdd = onProjectAdd;
        this.onProjectSelect = onProjectSelect;
        this.onProjectDelete = onProjectDelete;
        this.renderProjects = this.renderProjects.bind(this);
    }

    // Call this method to initially set up the project view with an add project form and project list
    render(projects, currentProjectId) {
        this.rootElement.innerHTML = `
            <div class="add-project">
                <input type="text" id="new-project-name" placeholder="New Project Name" />
                <button id="add-project-btn">Add Project</button>
            </div>
            <ul id="project-list"></ul>
        `;

        document.getElementById('add-project-btn').addEventListener('click', () => {
            const projectName = document.getElementById('new-project-name').value.trim();
            if (projectName) {
                this.onProjectAdd(projectName);
            }
        });

        this.projectListElement = document.getElementById('project-list');
        this.renderProjects(projects, currentProjectId);
    }

    // Separated render function for projects to call on init and when projects are updated
    renderProjects(projects, currentProjectId) {
        this.projectListElement.innerHTML = '';

        projects.forEach(project => {
            const projectElement = document.createElement('li');
            projectElement.textContent = project.name;
            projectElement.className = 'project-item';
            if (project.id === currentProjectId) projectElement.classList.add('active');

            projectElement.addEventListener('click', () => this.onProjectSelect(project.id));

            // Adding delete button
            const deleteBtn = document.createElement('span');
            deleteBtn.textContent = ' ❌';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent triggering the project selection
                const confirmDeletion = confirm(`Are you sure you want to delete "${project.name}"?`);
                if (confirmDeletion) {
                    this.onProjectDelete(project.id);
                }
            });

            projectElement.appendChild(deleteBtn);
            this.projectListElement.appendChild(projectElement);
        });
    }
}

export default ProjectView;