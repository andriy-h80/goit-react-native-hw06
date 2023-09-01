import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
  } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
  
export const writeUserToFirestore = async (login, email, password) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      login: login,
      email: email,
      password: password,
    });
    console.log("Document adding with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};
  
export const registerDB = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};
  
export const loginDB = async (email, password) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    return credentials.user;
  } catch (error) {
    throw error;
  }
};
  
export const updateUserProfile = async (update) => {
  const user = auth.currentUser;
  if (user) {
    try {
      await updateProfile(user, update);
    } catch (error) {
      throw error;
    }
  }
};
  
export const logoutDB = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully");
  } catch (error) {
    console.log("Logout error:", error);
    throw error;
  }
};
  