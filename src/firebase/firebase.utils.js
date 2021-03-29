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

  firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;