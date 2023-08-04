import { v4 as uuidv4 } from 'uuid';
import { localStorageGet, localStorageSet } from './localStorage';

export function createUserId() {
    let userId = getUserId();

    if (!userId) {
        userId = generateUserId();
        setUserId(userId);
    }
}

export function generateUserId() {
    return uuidv4();
}

export function getUserId() {
    return localStorageGet('user-id');
}

export function setUserId(userId) {
    localStorageSet('user-id', userId);
}