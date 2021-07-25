import firebase from "firebase/app"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDZwgBTWtcRzDLscSrtW-de3kTMpl-qas8",
    authDomain: "upload-files-17b2a.firebaseapp.com",
    projectId: "upload-files-17b2a",
    storageBucket: "upload-files-17b2a.appspot.com",
    messagingSenderId: "1026978820794",
    appId: "1:1026978820794:web:b1f75126ccc1e6652f0883"
  };

  firebase.initializeApp(firebaseConfig)

  const storage=firebase.storage()

  export {storage, firebase as default}