import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC3UciZC9F18CeRB0UxD1xfBvGauzKLoow",
  authDomain: "hackathon-b60d9.firebaseapp.com",
  projectId: "hackathon-b60d9",
  storageBucket: "hackathon-b60d9.firebasestorage.app",
  messagingSenderId: "162601443955",
  appId: "1:162601443955:web:261ccf06d18e6474930006",
  measurementId: "G-L9PD0KS4WH",
};

const app = initializeApp(firebaseConfig);

// sign in with google work here
const provider = new GoogleAuthProvider();
const auth = getAuth();



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
export { auth, provider };
