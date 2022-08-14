import { openDB } from 'idb';

const DB_NAME = 'ourss'
const VERSION = 2


const DB = openDB(DB_NAME, VERSION, {
	upgrade(db) {

		if(!db.objectStoreNames.contains('casts')) {
			// Create a store of objects
			db.createObjectStore('casts', {
				// The 'id' property of the object will be the key.
				keyPath: 'id',
				autoIncrement: false,
			});
		}
		if(!db.objectStoreNames.contains('audio')) {
			// Create a store of objects
			db.createObjectStore('audio', {
				// The 'id' property of the object will be the key.
				keyPath: 'id',
				autoIncrement: false,
			});
		}
	},
});

/* export async function createStore(store) {
	return openDB(DB_NAME, 1, {
		upgrade(db) {
			// Create a store of objects
			db.createObjectStore(store, {
				// The 'id' property of the object will be the key.
				keyPath: 'id',
				autoIncrement: true,
			});
		},
	});
} */

/**
 * Get item by id
 * @param {String} store 
 * @param {String} uid 
 * @returns {Promise<Object>} single item from store
 */
export async function getItemById(uid, store = 'casts') {
	return (await DB).get(store, uid);}

/**
 * Delete item by id
 * @param {String} store 
 * @param {String} uid 
 * @returns {Promise<Object>} single item from store
 */
export async function deleteItemById(store, uid) {
	return (await DB).delete(store, uid);
}

/**
 * Set item (item/Object must have id/key)
 * @param {String} store name of store
 * @param {Object} item object to store
 * @returns {Promise<Object>} single item from store
 */
export async function setItem(store, item) {
	return (await DB).put(store, item);
}

/**
 * Get all items from the database store
 * @param {String} store name of database store to get all from
 * @param {String} orderBy field to order by
 * @returns {Promise} resolves  array of items
 */
export async function getItems(store, orderBy) {
	
	if(orderBy) return (await DB).getAllFromIndex(store, orderBy);
	
	return (await DB).getAll(store);
}

/**
 * Get all keys/ids from a database store
 * @param {String} store name of database store to get all keys from
 * @returns {Promise} resolves  array of keys
 */
export async function getKeys(store) {
	return (await DB).getAllKeys(store);
}

/**
 * Ensure the database store exists
 * @param {String} store name of database store to get all from
 * @returns {Promise} resolves  array of items
 */
export async function checkBaseExists(store) {
	return (await window.indexedDB.databases()).map(db => db.name).includes(store);
} // @param {Boolean} create Optional; create the store if it doesn't exist

/**
 * Ensure the database store exists
 * @param {String} store name of database store to get all from
 * @returns {Promise} resolves  array of items
 */
export async function getItemsByKeys(store, keys) {
	
	let cursor = await (await DB).transaction(store).store.openCursor();
	let items = []

	while (cursor) {
		if(keys.includes(cursor.key)){
			items = [...items, cursor.value]
		}
		cursor = await cursor.continue();
	}

	return items;
}
