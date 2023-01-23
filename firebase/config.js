// import firebase from 'firebase/app'
// import 'firebase/firestore'

import { initializeApp } from 'firebase/app'
import { getFirestore, serverTimestamp } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDpfttUzDApjUWXa6Su9xnAXYYszqGgxLs",
    authDomain: "patiodoors-93701.firebaseapp.com",
    projectId: "patiodoors-93701",
    storageBucket: "patiodoors-93701.appspot.com",
    messagingSenderId: "637707458644",
    appId: "1:637707458644:web:b40188f00272ceff0335c1"
  };

const firebaseApp = initializeApp(firebaseConfig)
const projectFirestore = getFirestore(firebaseApp)
const timestamp = serverTimestamp()

// const projectFirestore = firebase.firestore()
// const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore,
     timestamp 
    }