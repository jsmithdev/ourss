/* spell-checker: disable */


import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries

import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    //signInWithCredential,
} from "firebase/auth";

import {
    getFirestore,
    collection,
    doc,
    getDocs,
    setDoc,
    query,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA_5wbhpuRPYajtRwWrkIQT7bXPfrkPNwY",
    authDomain: "ourrss.firebaseapp.com",
    projectId: "ourrss",
    storageBucket: "ourrss.appspot.com",
    messagingSenderId: "769887060069",
    appId: "1:769887060069:web:fb08ec45b2f65c0d40068c"
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);
const auth = getAuth(fire);
const provider = new GoogleAuthProvider();


export function onAuthStateChanged(cb) {
    //console.log('onAuthStateChanged');
    auth.onAuthStateChanged(cb);
}

export async function signIn() {

    try {
        
        const result = await signInWithPopup(auth, provider)

        // This gives you a Google Access Token. You can use it to access the Google API.
        // The signed-in user info.
        const user = result.user;
        
        return user;
    } 
    catch (error) {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode)
        const errorMessage = error.message;
        console.log(errorMessage)
        // The email of the user's account used.
        const email = error.email;
        console.log(email)
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential)

        return errorMessage
    }
}

/**
 * 
 * @param {String} name name of the collection
 * @returns {Array} array of objects; each object is a document in the collection
 * props are set by spreading the data from the document w/ id from document
 */
export async function getRemoteDb(name) {
    console.log('Fire: getRemoteDb name: ', name);
    // move to firestore
    const db = getFirestore(fire);
    const ref = collection(db, name);
    const q = query(ref);

    const ar = await getDocs(q);
    const results = [];
    ar.forEach((d) => {
        results.push({
            id: d.id,
            ...d.data(),
        });
    });
    return results;
}

export async function addToFire(url, id) {

    // move to firestore
    const db = getFirestore(fire);
    //console.log('Fire: db ', db)
    const ref = collection(db, "casts");
    const o = {url,id}
    await setDoc(doc(ref), o);

    console.log('Fire: inserted');

    return o;
}


export async function setRemoteDb(dbname, record) {

    // move to firestore
    const db = getFirestore(fire);
    const ref = collection(db, dbname);
    console.log('Fire: setting remote db ', record)
    return setDoc(doc(ref), record);
}
