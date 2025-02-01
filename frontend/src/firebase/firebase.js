import { initializeApp } from "firebase/app";
import { getFirestore, query,collection, addDoc, doc, getDoc ,getDocs,deleteDoc,updateDoc,serverTimestamp,orderBy} from "firebase/firestore";
import {getStorage,ref,uploadBytes,getDownloadURL,deleteObject} from 'firebase/storage'
import {GoogleAuthProvider,signInWithPopup,getAuth,signInWithEmailAndPassword,signOut,onAuthStateChanged} from 'firebase/auth'
 const firebaseConfig = {
    apiKey: "AIzaSyD--nJYPl3SzN1T9iA6xglxp4IP32n46_I",
    authDomain: "ngoweb-315e7.firebaseapp.com",
    projectId: "ngoweb-315e7",
    storageBucket: "ngoweb-315e7.appspot.com",
    messagingSenderId: "787076481345",
    appId: "1:787076481345:web:ced2bd2bdc011679fee1c0",
    measurementId: "G-08B5N74ZPW",
    databaseURL: "https://DATABASE_NAME.firebaseio.com",
  };
  

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app)
  const googleprovider = new GoogleAuthProvider()
  const auth = getAuth(app)


  // const signupwithgoogle = ()=>{
  //   signInWithPopup(auth,googleprovider)
  // }
  export function signupwithgoogle(){
    signInWithPopup(auth,googleprovider)
  }

  export async function login (data){
    const user = await signInWithEmailAndPassword(auth,data.email,data.password)
    return user
    // .then(value=>console.log("signin sucess"))
    // .catch((err)=> console.log(err))
  }

  export async function logout() {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  }
export async function addData(data) {
      try {
          const docRef = await addDoc(collection(db, "stories"), {
              title:data.title,
              story:data.story,
              createdAt:serverTimestamp(),
          });
          console.log("Document written with ID: ", docRef.id);
      } catch (e) {
          console.error("Error adding document: ", e);
      }
  }
export async function getAllData() {
    
    // const querySnapshot = await getDocs(collection(db, "stories"));
    // querySnapshot.forEach((doc) => {
    //     console.log(`${doc.id} => `, doc.data());
    // });
    // return querySnapshot
    try {
        const q = query(collection(db, "stories"), orderBy("createdAt","desc")); 
        const snapshot = await getDocs(q);
        console.log("********&&&&&",snapshot)
        snapshot.forEach((doc) => {
          console.log(`${doc.data().title}` , `${doc.data().createdAt}`);
        });
        return snapshot
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    
}

export async function deleteSpecificData(docId) {
  
  const docRef = doc(db, "stories", docId);

  try {
      await deleteDoc(docRef);
      console.log("Document successfully deleted!");
  } catch (e) {
      console.error("Error deleting document: ", e);
  }
}


export async function addVolunteer(data) {
  try {
      const docRef = await addDoc(collection(db, "volunteer"), {
          name:data.name,
          email:data.email,
          phone:data.phone,
          address:data.address,
          availability:data.availability,
          createdAt:serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
  } catch (e) {
      console.error("Error adding document: ", e);
  }
}

export async function getAllVolunteer() {
    
  // const querySnapshot = await getDocs(collection(db, "stories"));
  // querySnapshot.forEach((doc) => {
  //     console.log(`${doc.id} => `, doc.data());
  // });
  // return querySnapshot
  try {
      const q = query(collection(db, "volunteer"), orderBy("createdAt","desc")); 
      const snapshot = await getDocs(q);
      console.log("********&&&&&",snapshot)
      snapshot.forEach((doc) => {
        console.log(`${doc.data().title}` , `${doc.data().createdAt}`);
      });
      return snapshot
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  
}

export async function deleteSpecificVolunteer(docId) {
  
  const docRef = doc(db, "volunteer", docId);

  try {
      await deleteDoc(docRef);
      console.log("Document successfully deleted!");
  } catch (e) {
      console.error("Error deleting document: ", e);
  }
}



///conatct
export async function addFeedback(data) {
  try {
      const docRef = await addDoc(collection(db, "feedback"), {
          name:data.name,
          email:data.email,
          message:data.message,
          isreaded:false,
          createdAt:serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
  } catch (e) {
      console.error("Error adding document: ", e);
  }
}

export async function getAllFeedback() {
    
  // const querySnapshot = await getDocs(collection(db, "stories"));
  // querySnapshot.forEach((doc) => {
  //     console.log(`${doc.id} => `, doc.data());
  // });
  // return querySnapshot
  try {
      const q = query(collection(db, "feedback"), orderBy("createdAt","desc")); 
      const snapshot = await getDocs(q);
      console.log("********&&&&&",snapshot)
      snapshot.forEach((doc) => {
        console.log(`${doc.data().title}` , `${doc.data().createdAt}`);
      });
      return snapshot
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  
}

export async function deleteSpecificFeedback(docId) {
  
  const docRef = doc(db, "feedback", docId);

  try {
      await deleteDoc(docRef);
      console.log("Document successfully deleted!");
  } catch (e) {
      console.error("Error deleting document: ", e);
  }
}


//events
export async function addEvent(data) {
  try {

      const uploadimageurl = ref(storage,`${Date.now()}-${data.image.name}`)
      const upload = await uploadBytes(uploadimageurl,data.image)
      const downloadURL = await getDownloadURL(upload.ref);
      const docRef = await addDoc(collection(db, "events"), {
          title:data.title,
          location:data.location,
          description:data.description,
          imageurl:downloadURL,
          startdate:data.startDate,
          enddate:data.endDate,
          createdAt:serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
  } catch (e) {
      console.error("Error adding document: ", e);
  }
}


export async function getEvents() {
  
  try {
      const querySnapshot = await getDocs(collection(db, "events"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => `, doc.data());
      });
      return querySnapshot
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  
}


export async function deleteSpecificEvent(eventId, imageUrl) {
  
  try {
    
    await deleteDoc(doc(db, 'events', eventId));


    if (imageUrl) {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
      console.log('Image deleted successfully');
    }

     console.log("Document is deleted")
  } catch (error) {
    console.error('Error deleting event or image: ', error);
    alert('Failed to delete event or image.');
  }
}
