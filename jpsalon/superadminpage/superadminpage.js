// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signOut, updatePassword, deleteUser as firebaseDeleteUser } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getFirestore, doc, setDoc, getDocs, collection, query, where, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

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

        // DOM elements
        const addUserBtn = document.getElementById('addUserbtn');
        const updateBtn = document.getElementById('updatebtn');
        const deleteBtn = document.getElementById('deletebtn');
        const logoutBtn = document.getElementById('logoutbtn');

        addUserBtn.addEventListener('click', async () => {
            const username = document.getElementById('addNametxt').value.trim();
            const password = document.getElementById('addPasswordtxt').value.trim();
            const role = document.querySelector('input[name="role"]:checked').value;

            if (!username || !password) {
                alert('Please enter username and password');
                return;
            }

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, username, password);
                const user = userCredential.user;

                await updateProfile(user, { displayName: username });

                await setDoc(doc(db, 'users', user.uid), { username, role });

                alert('User added successfully');
                clearInputFields();
            } catch (error) {
                alert('Error creating user: ' + error.message);
            }
        });

        updateBtn.addEventListener('click', async () => {
            const currentUsername = document.getElementById('currentName').value.trim();
            const newUsername = document.getElementById('newName').value.trim();
            const newPasswordText = document.getElementById('newPassword').value.trim();

            if (!currentUsername || (!newUsername && !newPasswordText)) {
                alert('Please enter all required fields');
                return;
            }

            try {
                const q = query(collection(db, 'users'), where('username', '==', currentUsername));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const docSnap = querySnapshot.docs[0];
                    const uid = docSnap.id;

                    if (newUsername) {
                        await setDoc(doc(db, 'users', uid), { username: newUsername }, { merge: true });
                    }

                    if (newPasswordText) {
                        const user = auth.currentUser;
                        await updatePassword(user, newPasswordText);
                    }

                    alert('User updated successfully');
                    clearInputFields();
                } else {
                    alert('User not found');
                }
            } catch (error) {
                return 0;
            }
        });

        logoutBtn.addEventListener('click', async () => {
            try {
                const auth = getAuth(); // Get the auth instance (if not already done in your script)
                await signOut(auth);
                console.log('User signed out successfully');
                window.location.href = 'login.html'; // Redirect to login page after logout
            } catch (error) {
                console.error('Error signing out:', error.message);
                alert('Error signing out: ' + error.message);
            }
        });

        deleteBtn.addEventListener('click', async () => {
            const username = document.getElementById('deleteUsertxt').value.trim();

            if (!username) {
                alert('Please enter username to delete');
                return;
            }

            try {
                const q = query(collection(db, 'users'), where('username', '==', username));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const docSnap = querySnapshot.docs[0];
                    const uid = docSnap.id;

                    await deleteDoc(doc(db, 'users', uid));

                    const user = auth.currentUser;
                    await firebaseDeleteUser(user);

                    alert('User deleted successfully');
                    clearInputFields();
                } else {
                    alert('User not found');
                }
            } catch (error) {
                return 0;
            }
        });

        logoutBtn.addEventListener('click', async () => {
            await signOut(auth);
            window.location.href = 'login.html'; // Redirect to login page
        });

        function clearInputFields() {
            document.getElementById('addNametxt').value = '';
            document.getElementById('addPasswordtxt').value = '';
            document.getElementById('currentName').value = '';
            document.getElementById('newName').value = '';
            document.getElementById('newPassword').value = '';
            document.getElementById('deleteUsertxt').value = '';
            document.querySelector('input[name="role"]:checked').checked = false;
        }