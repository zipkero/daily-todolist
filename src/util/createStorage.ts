interface ILocalStorage<T> {
  get<T>(): any;

  set(value: object): void;
}

export default function createStorage<T>(key: string): ILocalStorage<T> {
  return {
    get<T>() {
      let _data = localStorage.getItem(key);
      return _data ? JSON.parse(_data) : {};
    },
    set(value: object) {
      localStorage.setItem(key, JSON.stringify(value));
    },
  };
}
