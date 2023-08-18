
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
  import { getAuth,createUserWithEmailAndPassword, GoogleAuthProvider,signInWithPopup,onAuthStateChanged
    ,signInWithEmailAndPassword,signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
  import {
     doc, setDoc ,getFirestore,getDoc,
    } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js"
  //  import { GoogleAuthProvider ,  signInWithPopup,} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
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
  const provider = new GoogleAuthProvider(app);
console.log(location)
let passwordError=document.getElementById('password-error');
let emailError=document.getElementById('email-error');
//////////////////////////////////// SIGNUP FORM////////////////////////////////////////
let signup=()=>{
                                                               
let displayName=document.getElementById('user-name');
let password=document.getElementById('password');
let email=document.getElementById('email');
    createUserWithEmailAndPassword(auth, email.value, password.value)
  .then(async(userCredential) => {
    try {
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
          displayName: displayName.value,
          email: email.value,
          password: password.value
      });
 
      localStorage.setItem("uid", user.uid)
      location.href = "home/home.html"
     console.log(user);
  } catch (err) {
      console.log(err)
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
     if(errorMessage=="Firebase: Password should be at least 6 characters (auth/weak-password)."){
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
     if (errorMessage === 'Firebase: Error (auth/email-already-in-use).') {
      console.log('yes')
      let Error=document.getElementById('email-error');
     Error.innerHTML='*'+"email-already-in-use"
    }
  });
  
}

onAuthStateChanged(auth, (user) => {
  const uid = localStorage.getItem("uid")
  if (user && uid) {
        if (location.pathname !== "/home/home.html") {
          location.href = "home/home.html"
        }
  } else {
       if (location.pathname !== '/index.html' && location.pathname !== "/login.html") {
          location.href = "/index.html"
       }
  }
}); 
////////////////////////////////////// LOGIN FORM///////////////////////////////////////////
const loginBtn = document.getElementById('login-btn');

loginBtn && loginBtn.addEventListener("click", (e) => {
    e.preventDefault()
  let password=document.getElementById('password');
let email=document.getElementById('email');
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then(async(userres) => {
      const user = userres.user;
      console.log(user)
      localStorage.setItem("uid", user.uid)
       location.href="home/home.html"
      }
    )
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
)

let googleSignup=()=>{
  
}
let googleLogin=document.getElementById('googleSignup');

googleLogin&&googleLogin.addEventListener('click',()=>{
  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    
    location.href="home/home.html"
  
  }).catch((error) => {
   
    const errorCode = error.code;
    const errorMessage = error.message;
   
    const email = error.customData.email;
  
    const credential = GoogleAuthProvider.credentialFromError(error);
    
  });
})
// let verify=()=>{
//   sendEmailVerification(auth.currentUser)
//   .then(() => {
//     // Email verification sent!
   
//   });

// }

window.signup=signup;