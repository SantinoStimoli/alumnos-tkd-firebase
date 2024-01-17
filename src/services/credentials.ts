// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBdKPCOt_yvh0yPHRDelX4S3FmGRrcHxDE',
  authDomain: 'alumnos-tkd.firebaseapp.com',
  projectId: 'alumnos-tkd',
  storageBucket: 'alumnos-tkd.appspot.com',
  messagingSenderId: '12721964387',
  appId: '1:12721964387:web:c31375f1d3a24585c2bf56',
  measurementId: 'G-3GTQKGXENS',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export const auth = getAuth(app)

// sessions functions
export const registerFirebase = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(auth, email, password)
}

export const logInFirebase = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password)
}

export const logOutFirebase = async () => {
  await signOut(auth)
}

// HTTP functions

export const postData = async (collectionName: string, data: Object) => {
  await addDoc(collection(db, collectionName), data)
}

export const getData = async (collectionName: string) => {
  const response = await getDocs(collection(db, collectionName))
  const data: Object[] = []
  response.forEach((d) => data.push({ ...d.data(), id: d.id }))

  return data
}

export const deleteData = async (collectionName: string, id: string) => {
  await deleteDoc(doc(db, collectionName, id))
}
