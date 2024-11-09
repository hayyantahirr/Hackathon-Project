import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD6xobFeMtElG3xtCuO028fZoEPjOz_Zro",
  authDomain: "react-ecommerce-app-detail.firebaseapp.com",
  projectId: "react-ecommerce-app-detail",
  storageBucket: "react-ecommerce-app-detail.appspot.com",
  messagingSenderId: "950142404283",
  appId: "1:950142404283:web:2b8f6596270433da8b8b9e",
  measurementId: "G-Y8P0YE4ZPJ",
};

const app = initializeApp(firebaseConfig);

// sign in with google work here
const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getFirestore(app);
// signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     // IdP data available using getAdditionalUserInfo(result)
//     // ...
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });
// signInWithRedirect(auth, provider);
export { auth, provider,db };
