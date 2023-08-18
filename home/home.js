import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth,signOut,onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import {
  doc, setDoc ,getFirestore,getDoc,updateDoc
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
       userName.value = docSnap.data().displayName;
       email.value = docSnap.data().email;
      userProfile.src = docSnap.data().picture
  } else {
  
      console.log("No such document!");
  }
}

onAuthStateChanged(auth, (user) => {
  const uid = localStorage.getItem("uid")
  if (user && uid) {
     console.log(user);
     console.log(user.uid);
       getUserData(user.uid)
        if (location.pathname !== "/home/home.html") {
          location.href = "home/home.html"
        }
  } else {
       if (location.pathname !== '/index.html' && location.pathname !== "/login.html") {
          location.href = "../login.html"
       }
  }
});


let logoutBtn=document.getElementById('logoutBtn');
logoutBtn && logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    console.log('sign out')
    localStorage.clear()
        
 location.href='/login.html'
    
   
  }).catch((error) => {
    console.log(error)
})

}
)
const uploadFile=(file)=>{
  return new Promise((resolve,reject)=>{
    const storageRef = ref(storage, `images/${file.name}`);
    //console.log(file.files[0].name)
    const uploadTask = uploadBytesResumable(storageRef, file);
  
  uploadTask.on('state_changed', 
    (snapshot) => {
  
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      reject(error);
    }, 
    () => {
     
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        resolve(downloadURL);
      });
    }
  );
  }
  )
}
// let userFiles=document.getElementById('upload-btn');

// userFiles.addEventListener('click',async()=>{
//   try {
//     let file=document.getElementById('file');
//     const res= await userUploadFiles(file.files[0]);
//     console.log(res)
//     let img=document.getElementById('user-img');
//     img.src=res;

    
//   } catch (error) {
//     console.log(error)
//   }
  

// }
// )
const fileInput = document.getElementById("file-input");

fileInput.addEventListener("change", () => {
  
    userProfile.src = URL.createObjectURL(fileInput.files[0])
})
const updateProfile = document.getElementById("update-profile");

updateProfile && updateProfile.addEventListener("click", async () => {
    let uid = localStorage.getItem("uid")
    let userName = document.getElementById("userName")
    let email = document.getElementById("email")
    const imageUrl = await uploadFile(fileInput.files[0])
    const washingtonRef = doc(db, "users", uid);
    await updateDoc(washingtonRef, {
      displayName: userName.value,
        email: email.value,
        picture: imageUrl
    });
})