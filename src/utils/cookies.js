import { v4 as uuidv4 } from 'uuid';

export function createUserID() {
    let userID = getCookie('userID');

    if (!userID) {
        userID = generateUserID();
        setCookie('userID', userID, 365); // Set the cookie to last for one year
    }

    return userID;
}

export function generateUserID() {
    return uuidv4();
}

export function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

export function setCookie(name, value, days) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    const expires = 'expires=' + expirationDate.toUTCString();
    document.cookie = name + '=' + value + ';' + expires + ';path=/';
}