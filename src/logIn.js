import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import appSettings from "./firebaseConfig";

// console.log(import.meta.env.VITE_FIREBASE_CONFIG_API_KEY)
// console.log(appSettings.apiKey)
const app = initializeApp(appSettings);
// console.log(JSON.stringify(app))
const auth = getAuth();

const signInButton = document.getElementById("sign-in-btn");

signInButton.addEventListener("click", SignIn);

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // console.log(uid)
        window.location.replace('../src/home.html');
    } else {
        //  User is signed out
        console.log("user need to sign in first");
    }
});

function SignIn() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access Google APIs.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // alert("made a user");
            // console.log(user.uid);
        }).catch((error) => {
            console.log(error)
        });
    // alert(auth.uid);
}