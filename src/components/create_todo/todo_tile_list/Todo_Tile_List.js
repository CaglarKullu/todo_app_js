import TodoTile from '../Create_Todo_Tile.js';

export default class TodoTileList {
    constructor(todos, onUpdate, onDelete) {
        this.todos = todos;
        this.onUpdate = onUpdate;
        this.onDelete = onDelete;
    }

    render() {
        const listElement = document.createElement('div');
        listElement.className = 'todo-tile-list';

        this.todos.forEach(todo => {
            const todoTile = new TodoTile(todo, this.onUpdate, this.onDelete);
            listElement.appendChild(todoTile.render());
        });

        return listElement;
    }
}
