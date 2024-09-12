import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

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
const db = getFirestore(app);

async function displayUsers() {
    try {
        const usersTableBody = document.querySelector('#usersTable tbody');
        const usersCollection = collection(db, 'users');
        const querySnapshot = await getDocs(usersCollection);
        
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${userData.username}</td>
                <td>${userData.role}</td>
            `;
            usersTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching users:', error.message);
    }
}

document.addEventListener('DOMContentLoaded', displayUsers);
