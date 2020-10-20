export default function createStorage(key) {
    return {
        get() {
            let _data = localStorage.getItem(key);
            return _data ? JSON.parse(_data) : {};

        },
        set(value) {
            localStorage.setItem(key, JSON.stringify(value));
        }
    }
}