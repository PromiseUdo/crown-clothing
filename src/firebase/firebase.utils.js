import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyAwZRl5u2EtfuN5kGiJNkELC0zemkNfjq8",
    authDomain: "crown-db-a2423.firebaseapp.com",
    projectId: "crown-db-a2423",
    storageBucket: "crown-db-a2423.appspot.com",
    messagingSenderId: "506273419496",
    appId: "1:506273419496:web:aeb5442856aa976878395d",
    measurementId: "G-RRBMPXKBRL"
  }

//function to take user object and store in firebase database

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName: displayName,
                email: email,
                createdAt: createdAt,
                ...additionalData
            })
        }catch(e){
            console.log('error creating user', e.message);
        }

    }
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;