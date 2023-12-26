import { initializeApp } from "firebase/app"
import { getAuth, signOut} from "firebase/auth"
import appSettings from '../src/firebaseConfig.js'

const app = initializeApp(appSettings);

const auth = getAuth();

const signOutButton = document.getElementById("sign-out-btn");

signOutButton.addEventListener("click", SignOut);

function SignOut(){
    const auth = getAuth();
    signOut(auth).then(() => {
        window.location.replace('../index.html');
    }).catch((error) => {
        alert("error signing out...");
    })
}