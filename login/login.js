import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
  import { getAuth,signInWithEmailAndPassword,
    sendEmailVerification  } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
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
  const db=getFirestore();



                                                             

let password=document.getElementById('password');
let email=document.getElementById('email');
let passwordError=document.getElementById('password-error');
let emailError=document.getElementById('email-error');

let login=()=>{
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then(async(userCredential) => {
      // Signed in 
      const user = userCredential.user;
      const docRef = doc(db, "user", user.uid);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
   if (user) {
    window.open('../home/home.html')
   }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      if (errorMessage=='Firebase: Error (auth/user-not-found).') {
 
        let passwordError=document.getElementById('password-error');
        passwordError.innerHTML='*'+"user not found"
        emailError.innerHTML='*'+"user not found"
      }
      if (errorMessage === 'Firebase: Error (auth/missing-password).') {
        
        let passwordError=document.getElementById('password-error');
        passwordError.innerHTML='*'+"missing password"
      }
      if (errorMessage === 'Firebase: Error (auth/wrong-password).') {
       
        let passwordError=document.getElementById('password-error');
        passwordError.innerHTML='*'+"please enter correct password"
      }
      if (errorMessage === 'Firebase: Error (auth/invalid-email).') {
   
       emailError.innerHTML='*'+"Please enter correct email"
      }
    });
}


window.login=login;