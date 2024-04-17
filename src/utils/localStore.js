class LocalStorageHelper {
    constructor() {
        this.localStorage = localStorage;
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
}

export default LocalStorageHelper;