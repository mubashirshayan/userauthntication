import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth,signOut,onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import {
  doc,getFirestore,getDoc, collection, query, where, getDocs, addDoc, serverTimestamp,onSnapshot 

   } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js"
   import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";
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
 const storage = getStorage();
 const userProfile = document.getElementById("user-profile");
let getUserData=async(uid)=>{
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
       let userName = document.getElementById("userName")
       let email = document.getElementById("email")
      console.log("Document data:", docSnap.data());
       userName.innerHTML = docSnap.data().displayName;
       email.innerHTML = docSnap.data().email;
      userProfile.src = docSnap.data().picture
  } else {
  
      console.log("No such document!");
  }
}

onAuthStateChanged(auth, (user) => {
  const uid = localStorage.getItem("uid")
  if (user && uid) {
    //  console.log(user);
    
       getUserData(user.uid)
       getAllUserData(user.email);

        if (location.pathname !== "/home/home.html" && location.pathname !== "/chat/chat.html") {
          location.href = "home/home.html"
        }
  } else {
       if (location.pathname !== '/index.html' && location.pathname !== "/login.html") {
          location.href = "../login.html"
       }
  }
});
let getAllUserData=async(email)=>{
    const q = query(collection(db, "users"), where("email", "!=", email));
    const chatList=document.getElementById('chatList');
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    
      // console.log(doc.id, " => ", doc.data());
      const{displayName,email,picture}=doc.data();
    chatList.innerHTML+=`<li onclick="selectUserChat('${email}','${displayName}','${doc.id}')" class="list-group-item d-flex mainli justify-content-between align-items-start">
    <div class="ms-2 me-auto">
      <div class="fw-bold"><img src="images/istockphoto-1337144146-612x612.jpg " height="50px" width="50px" alt="">
      <span>${displayName}</span><p>${email}</p></div>
      
    </div>
    <!-- <span class="badge bg-primary rounded-pill">14</span> -->
  </li>
 `
    });
}
let selectedUserId;
let selectUserChat=(email,displayName,selectUid)=>{
     let chatingUsername=document.getElementById('chatingUsername');
     let chatingUseremail=document.getElementById('chatingUseremail');
     chatingUseremail.innerHTML=email;
     chatingUsername.innerHTML=displayName;
    selectedUserId=selectUid;
    let mainUserId=localStorage.getItem("uid");
    console.log(
     "selectid",selectedUserId
    );
    // console.log("mIn id",mainUserId);
    let mainChatId;
    if (mainUserId<selectedUserId) {
      mainChatId=mainUserId+selectedUserId;
    } else {
      mainChatId=selectedUserId+mainUserId;
    }
    // console.log(mainChatId);
    getAllMessages(mainChatId);

   
}
window.selectUserChat=selectUserChat
let inputText=document.getElementById("input_text");
inputText.addEventListener("keydown",async(e)=>{
  // console.log(e.keyCode)
  if(e.keyCode==13){
    let mainUserId=localStorage.getItem("uid");
console.log(
 "selectid",selectedUserId
);
// console.log("mIn id",mainUserId);
let chatID;
if (mainUserId<selectedUserId) {
  chatID=mainUserId+selectedUserId;
} else {
  chatID=selectedUserId+mainUserId;
}
console.log(chatID);
const docRef = await addDoc(collection(db, "messages"), {
  message: inputText.value,
  chatId: chatID,
  timestamp: serverTimestamp(),
  sender:mainUserId,
  receiver:selectedUserId,
});
// console.log("Document written with ID: ", docRef.id);
   }
})

let getAllMessages=(chatId)=>{
  const q = query(collection(db, "messages"), where("chatId", "==", chatId));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const messages = [];
  querySnapshot.forEach((doc) => {
      messages.push(doc.data());
  });
  console.log("message ", messages);
});

}
EoAyWLU5duWrHDnYB7eoYKV414B2VdAYT01ckJU8EobChGinsfjCciN2
function btnDisplay() {
  let show=document.getElementById("msMenu");
  show.style.display="block";
}
