import {
    App,
    Credentials,
} from "realm-web";

const CLUSTER_NAME = 'Cluster0';
const DATABASE_NAME = 'ourss';

const app = new App({ id: 'data-ypxlr' });

export async function login() {

    const credentials = Credentials.anonymous();
    
    try {
        const user = await app.logIn(credentials);
        log("Logged in", user);
        return user;
    } catch(err) {
        log("Failed to log in", err);
    }
}

export async function logout() {
    try {
        await app.currentUser?.logOut();
        log("Logged out");
    } catch(err) {
        log("Failed to log out", err);
    }
}

export async function getRemoteDb(name) {
    //log('getRemoteDb name: ', name);
    const mongo = app.currentUser.mongoClient(CLUSTER_NAME);
    const collection = mongo.db(DATABASE_NAME).collection(name);
    //log('collection: ', collection)
    return collection.find( {}, { id: 1, feed: 1, _id: 0 });
}

function log(...args) {
    console.log('Mongo: ',...args);
}