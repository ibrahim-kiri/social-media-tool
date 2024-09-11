// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';

// Firebase configuration object
// Make sure to set these environment variables in your .env.local file
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FFIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const db = getFirestore();

/**
 * Create a new post in the database
*/
export async function addPost(postData) {
  try {
    const docRef = await addDoc(collection(db, 'posts'), postData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding post to Firebase:', error);
    throw new Error('Failed to add post to database');
  }
}

/**
 * Retrieve all scheduled posts from the database
*/
export async function getPosts() {
  try {
    const postsSnapshot = await getDocs(collection(db, 'posts'));
    return postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching posts from Firebase:', error);
    throw new Error('Failed to fetch posts from database');
  }
}

/**
 * Retrieve a post from the database by it's ID
*/
export async function getPostById(id) {
  try {
    const docRef = doc(db, 'posts', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
  } catch (error) {
    console.error('Error fetching post from Firebase:', error);
    throw new Error('Failed to fetch post from database');
  }
}

/**
 * Update an existing post in the database
*/
export async function updatePost(id, updates) {
  try {
    const docRef = doc(db, 'posts', id);
    await updateDoc(docRef, updates);
  } catch (error) {
    console.error('Error updating post in Firebase:', error);
    throw new Error('Failed to update post in database');
  }
}

/**
 * Delete a post from the database
*/
export async function deletePost(id) {
  try {
    const docRef = doc(db, 'posts', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting post from Firebase:', error);
    throw new Error('Failed to delete post from database');
  }
}
