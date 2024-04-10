import './uiView.css';
class UIView {
    constructor() {
        this.initModal();
    }

    initModal() {
        // Create and append the modal element to body
        const modal = document.createElement('div');
        modal.id = 'modal';
        modal.className = 'modal hidden';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-button">×</span>
                <div id="modal-body"></div>
            </div>
        `;
        document.body.appendChild(modal);

        // Close modal when the close button is clicked
        modal.querySelector('.close-button').addEventListener('click', this.hideModal.bind(this));

        // Optional: Close modal on outside click
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                this.hideModal();
            }
        });
    }

    showModal(content) {
        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = ''; // Clear previous content
        modalBody.appendChild(content); // Add new content

        document.getElementById('modal').classList.remove('hidden');
    }

    hideModal() {
        document.getElementById('modal').classList.add('hidden');
    }

    // Example method for showing a confirmation dialog
    showConfirmation(message, onConfirm) {
        const confirmContent = document.createElement('div');
        confirmContent.innerHTML = `<p>${message}</p><button id="confirmBtn">Confirm</button>`;
        this.showModal(confirmContent);
        document.getElementById('confirmBtn').addEventListener('click', () => {
            onConfirm();
            this.hideModal();
        });
    }

    // Method to show notifications or alerts
    showAlert(message, type = 'success') {
        const alertBox = document.createElement('div');
        alertBox.className = `alert alert-${type}`;
        alertBox.textContent = message;
        document.body.appendChild(alertBox);

        // Automatically hide the alert after some time
        setTimeout(() => {
            document.body.removeChild(alertBox);
        }, 3000);
    }
}

export default UIView;