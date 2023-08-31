import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBwmokuZziHtkC1TEJt9fRkov3pXarwSK0",
    authDomain: "travel-blog-f05ae.firebaseapp.com",
    projectId: "travel-blog-f05ae",
    storageBucket: "travel-blog-f05ae.appspot.com",
    messagingSenderId: "854150745332",
    appId: "1:854150745332:web:b2eab4ff2d0e71e845e2a1",
    measurementId: "G-J10XZDYL31"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db  = getFirestore(app);
  const storage = getStorage(app);

  export {auth, db, storage};
