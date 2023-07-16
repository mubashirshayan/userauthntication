import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth,signOut  } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import {
    doc, setDoc ,getFirestore,getDoc,
   } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js"
const firebaseConfig = {
    apiKey: "AIzaSyDashlFZaphkexWtqpoNH2FSjmBs4SBi14",
    authDomain: "user-support-c12c9.firebaseapp.com",
    databaseURL: "https://user-support-c12c9-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "user-support-c12c9",
    storageBucket: "user-support-c12c9.appspot.com",
    messagingSenderId: "777228558573",
    appId: "1:777228558573:web:7bfb09d761c1317d74ece4"
  };

  const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
 const user = auth.currentUser;
 const db=getFirestore(app);

//  console.log(auth
//     );
   
    let profile=()=>{
  
      console.log(auth.currentUser
     );
    }
   




let logOut=()=>{
    signOut(auth).then(() => {
      console.log('sign out')
      window.open('../login/login.html')
      
     
    }).catch((error) => {
      console.log(error)
  })
  }
window.logOut=logOut;
// let profile=()=>{
    
if (user !== null) {
  // The user object has basic properties such as display name, email, etc.
  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL;
  const emailVerified = user.emailVerified;
  console.log(email);

  // The user's ID, unique to the Firebase project. Do NOT use
  // this value to authenticate with your backend server, if
  // you have one. Use User.getToken() instead.
  const uid = user.uid;
}
// }
window.profile=profile;