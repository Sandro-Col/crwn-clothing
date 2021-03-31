import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAsEsam-Iz_W-atbvUXmD7hE60z4YW-QAg",
    authDomain: "crwn-db-86d6b.firebaseapp.com",
    projectId: "crwn-db-86d6b",
    storageBucket: "crwn-db-86d6b.appspot.com",
    messagingSenderId: "618031491010",
    appId: "1:618031491010:web:010dad3ce4a91e5593185b",
    measurementId: "G-7W3BBT43GV"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    // null = false, then !null = true
    if (!userAuth) return;

    // LESSON 101. Storing User Data in Firebase
    // === QUERYREFERENCE and QUERYSNAPSHOT ===
    // A query is a request we make to firestore to give us something from the database.
    // Firestore return to us two types of objects:
    // - references and
    // - snapshots
    // Of these objects, they can be either Document or Collection versions.
    // Firestore wil always return us these objects, even if nothing exists at from that query.
    //
    // === QueryReference ===
    // A queryReference object is a object that represents the "current" place in the database that we are querying.
    //
    // We get them by calling either:
    // firestore.doc(`/users/:userId`);
    // firestore.collections(`users`);
    //
    // The queryReference object does not have the actual data of the collection or document.
    // It instead has properties that tell us details about it, or 
    // the method to get the Snapshot object wich gives us the data we are looking for.

    // === DocumentReference Vs CollectionReference ===
    // We use documentRef objects to perform our CRUD methods (create, retrieve, update, delete).
    // The documentRef methods are .set(), .get(), .update() and .delete() respectively.
    //
    // We can also add documents to collections using the collectionRef object using the .add() method
    // collectionRef.add({//value:prop})
    // 
    // We get snapshotObject from the referenceObject using the .get() method. ie.:
    // documentRef.get() or
    // collectionRef.get()
    // 
    // documentRef returns a documentSnapshot object.
    // collectionRef returns a querySnapshot object. 

    // Making a queryReference to get the User "firestore.doc(`/users/:userId`);"
    const userRef = firestore.doc(`user/${userAuth.uid}`);

    // Making a documentRef objects to perform a retrieve method.
    // We get snapshotObject from the referenceObject using the .get() method "userRef.get();"
    const snapShot = await userRef.get();

    // null = false, then !null = true
    if(!snapShot.exists) { // if user do not exists, then create user
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({ //creating the new user
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;