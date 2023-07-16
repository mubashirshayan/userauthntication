
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
  import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,
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
//console.log(email);

let passwordError=document.getElementById('password-error');
let emailError=document.getElementById('email-error');
let signup=()=>{
    createUserWithEmailAndPassword(auth, email.value, password.value)
  .then(async(userCredential) => {
    const user = userCredential.user;
    await setDoc(doc(db, "user", user.uid), {
      email:email.value,
      password:password.value,
    });
    console.log(user);
    if (user) {
      window.open('http://127.0.0.1:5500/home/home.html')
    }

   

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    if (errorMessage === 'Firebase: Error (auth/missing-password).') {
      console.log('yes')
      passwordError.innerHTML='*'+"missing password"
    }
     else if("Firebase: Password should be at least 6 characters (auth/weak-password)."){
      console.log('no')
      passwordError.innerHTML='*'+"password should be atleast 6 character"
      
     }
     if (errorMessage =='Firebase: Error (auth/user-not-found).') {
      console.log('yes')
      let emailError=document.getElementById('email-error');
     emailError.innerHTML+='*'+"user not found"
    }
    if (errorMessage === 'Firebase: Error (auth/invalid-email).') {
      console.log('yes')
     emailError.innerHTML='*'+"Please enter correct email"
    }
    else if (errorMessage === 'Firebase: Error (auth/email-already-in-use).') {
      console.log('yes')
      let Error=document.getElementById('email-error');
     Error.innerHTML='*'+"email-already-in-use"
    }
    
    
  
    
  });
  
}

// let verify=()=>{
//   sendEmailVerification(auth.currentUser)
//   .then(() => {
//     // Email verification sent!
   
//   });

// }


window.signup=signup;

// window.verify=verify;