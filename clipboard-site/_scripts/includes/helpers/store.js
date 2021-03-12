import { writable } from 'svelte/store';

const stores = [];

const getStoreFromLocal = (storeStorageKey) => {
    let storeFromLocal = localStorage.getItem(storeStorageKey);
    try {
        storeFromLocal = storeFromLocal ? JSON.parse(storeFromLocal) : null;
    } catch {}
    return storeFromLocal ? storeFromLocal : {};
}

const createStore = (storeName) => {
    let startingStore = {}, 
        storeStorageKey = `cc-svelte-store-${storeName}`,
        persistentStore = /persist/.test(storeName);
    if (persistentStore) {
        startingStore = getStoreFromLocal(storeStorageKey);
    }
    const store = writable(startingStore);
    if (persistentStore) {
        store.subscribe(s => localStorage.setItem(storeStorageKey, JSON.stringify(s)));
    }
    return store;
}

export const hydrate = (props) => {
    for (let [k, storeName] of Object.entries(props)) {
        if (!/(^|_)store$/.test(k)) continue;
        if (!storeName || typeof(storeName) !== "string") continue;
        if (!stores[storeName]) stores[storeName] = createStore(storeName);

        props[k] = stores[storeName];
    }
}
