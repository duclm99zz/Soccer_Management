
import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlkg8donJdFe4H_79F5PYW0Wb7n1S0lsA",
  authDomain: "duclm99-50123.firebaseapp.com",
  projectId: "duclm99-50123",
  storageBucket: "duclm99-50123.appspot.com",
  messagingSenderId: "224780440778",
  appId: "1:224780440778:web:3031d976e7b460f2eb1033",
  measurementId: "G-RQFF89DJYN"
};


firebase.initializeApp(firebaseConfig)
firebase.firestore()

export default firebase