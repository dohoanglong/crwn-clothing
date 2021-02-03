import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyARMZjI8uci63JEUYvxjWE52apgdA-BVnI",
  authDomain: "crwn-db-f6577.firebaseapp.com",
  projectId: "crwn-db-f6577",
  storageBucket: "crwn-db-f6577.appspot.com",
  messagingSenderId: "66755322168",
  appId: "1:66755322168:web:e4519e7c4514a2a3b821cd",
  measurementId: "G-F7G1B1Y6SP",
};

export const createUserProfileDocument = async (userAuth,additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get(); 
  if(!snapShot.exists) {
    const { displayName,email } =userAuth;
    const  createdAt =new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }catch(err) {
      console.log(err);
    }
  } 

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider= new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;