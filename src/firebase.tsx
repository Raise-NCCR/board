import React, { useState, useEffect } from "react";

import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';

import { FirebaseContext } from "./contexts";
import { Post } from "./models";


export const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
});

export const db = app.firestore();

export const signin = async (email: string, password: string) => {
  try {
    await app
    .auth()
    .signInWithEmailAndPassword(email, password);
  } catch(error) {
    alert(error);
  }
};

export const signup = async (email: string, password: string) => {
  try {
    await app
    .auth()
    .createUserWithEmailAndPassword(email, password);
  } catch (error) {
    alert(error);
  }
};

export const signout = async () => {
  await app.auth().signOut();
};

/*export const sendEmailVerification = async () => {
  if (!firebase.auth().currentUser) {
    throw new Error("No logged in user found");
  }
  return await firebase.auth().currentUser?.sendEmailVerification({
    url: process.env.REACT_PUBLIC_FRONTEND_URL ?? "",
  });
};

export const sendPasswordResetEmail = async (email: string) => {
  return await firebase
    .auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      return true;
    });
};*/

export const addPost = async (post: Post) => {
  try {
    await db
      .collection("threads").doc("thread1").collection("posts")
      .add(post);
  } catch(error) {
    alert(error);
  }
};

export const updatePost = async (post: Post) => {
  try {
    await db
      .collection("threads").doc("thread1").collection("posts").doc(post.id)
      .set(post);
  } catch(error) {
    alert(error);
  }
};

export const deletePost = async (post: Post) => {
  try {
    await db
      .collection("threads").doc("thread1").collection("posts").doc(post.id)
      .delete();
  } catch(error) {
    alert(error);
  }
};

export const FirebaseProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    })
  }, [])

  if (loading) {
    return (
      <div className='loading'>ロード中...</div>
    )
  }

  return (
    <FirebaseContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
};
