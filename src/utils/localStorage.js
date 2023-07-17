export function localStorageSet(item, value) {
    localStorage.setItem(item, value);
}

export function localStorageGet(item) {
    return localStorage.getItem(item);
}

export function localStorageRemove(item) {
    localStorage.removeItem(item);
}