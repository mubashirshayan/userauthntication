
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


let signup=()=>{
    createUserWithEmailAndPassword(auth, email.value, password.value)
  .then(async(userCredential) => {
    const user = userCredential.user;
    await setDoc(doc(db, "user", user.uid), {
      email:email.value,
      password:password.value,
    });
    console.log(user);

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    document.getElementById('error').innerHTML=errorMessage;
    // ..
  });
  
    // console.log(email.value);
    // console.log(password.value);
}
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
    //console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
  });
}
let verify=()=>{
  sendEmailVerification(auth.currentUser)
  .then(() => {
    // Email verification sent!
   
  });

}


window.signup=signup;
window.login=login;
window.verify=verify;