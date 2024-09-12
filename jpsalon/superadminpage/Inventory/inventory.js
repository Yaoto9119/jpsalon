// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
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
const auth = getAuth(app);
const db = getFirestore(app);

// Fetch and display inventory data
const fetchInventory = async () => {
    const inventoryTableBody = document.getElementById('inventoryTable').getElementsByTagName('tbody')[0];
    try {
        const querySnapshot = await getDocs(collection(db, "inventory"));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const row = inventoryTableBody.insertRow();
            row.insertCell(0).innerText = data.productName;
            row.insertCell(1).innerText = data.code;
            row.insertCell(2).innerText = data.color;
            row.insertCell(3).innerText = data.brand;
            row.insertCell(4).innerText = data.quantity;
        });
    } catch (error) {
        console.error("Error fetching inventory data: ", error);
    }
};

// Call the function to fetch and display inventory data on page load
fetchInventory();

// Logout function
const logoutFunction = async () => {
    try {
        await signOut(auth);
        window.location.href = '../login.html'; // Adjust the path as needed
    } catch (error) {
        console.error("Error logging out: ", error);
    }
};
