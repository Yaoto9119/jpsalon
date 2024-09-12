// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFwptP02oMd31XNzHBuN5GNuGGBv0cdtY",
  authDomain: "finals-44ff7.firebaseapp.com",
  projectId: "finals-44ff7",
  storageBucket: "finals-44ff7.appspot.com",
  messagingSenderId: "556644415769",
  appId: "1:556644415769:web:bd1b4900daf6255edf2d88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the auth instance
const auth = getAuth(app);
const db = getFirestore(app);

// Get the login button
const login = document.getElementById('submit');

login.addEventListener("click", function(event) {
  event.preventDefault();
  const email = document.getElementById('Username').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log('User signed in:', user);

      // Retrieve the user's role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role;
        console.log('User role:', role);  // Debugging line
        // Redirect based on role
        if (role === 'superadmin') {
          window.location.href = "../jpsalon/superadminpage/superadminpage.html";
        } else if (role === 'admin') {
          window.location.href = "../jpsalon/adminpage.html";
        } else {
          window.location.href = "../jpsalon/userpage.html";
        }
      } else {
        console.error("No such user document!");
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // Handle errors here
      console.error('Error signing in:', errorCode, errorMessage);
    });
});
