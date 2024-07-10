// fab.js
class FloatingActionButton {
    constructor(options) {
        this.text = options.text || '+';
        this.primaryColor = options.primaryColor || '#5d1049';
        this.secondaryColor = options.secondaryColor || '#007bff';
        this.onClick = options.onClick || function() { alert('FAB Clicked!'); };
        this.createButton();
        this.addStyles();
        this.attachEvent();
    }

    createButton() {
        this.fabContainer = document.createElement('div');
        this.fabContainer.classList.add('fab-container');
        
        this.fab = document.createElement('button');
        this.fab.classList.add('fab');
        this.fab.textContent = this.text;
        
        this.fabContainer.appendChild(this.fab);
        document.body.appendChild(this.fabContainer);
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            :root {
                --primary-color: ${this.primaryColor};
                --secondary-color: ${this.secondaryColor};
                --background-color: #ffffff;
                --text-color: #333;
                --todo-bg-color: #f9f9f9;
                --border-color: #ddd;
                --font-stack: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                --font-size-normal: 16px;
                --font-size-large: 18px;
            }
            body {
                margin: 0;
                font-family: var(--font-stack);
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background-color: var(--background-color);
            }
            .fab-container {
                position: relative;
            }
            .fab {
                width: 56px;
                height: 56px;
                background-color: var(--primary-color);
                border: none;
                border-radius: 50%;
                color: white;
                font-size: 24px;
                cursor: pointer;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
                display: flex;
                justify-content: center;
                align-items: center;
                position: fixed;
                right: 20px;
                bottom: 20px;
                transition: background-color 0.3s ease;
            }
            .fab:hover {
                background-color: var(--secondary-color);
            }
            .fab:active {
                transform: scale(0.95);
            }
        `;
        document.head.appendChild(style);
    }

    attachEvent() {
        this.fab.addEventListener('click', this.onClick);
    }
}

