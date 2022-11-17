import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import db from "../firebase.config";
import { getDocs } from "firebase/firestore";

// function to follow user and add follower to object in firebase
export async function followUserFromAPI(user) {
  const email = getAuth().currentUser.email;
  return (
    db
      .collection("users")
      .doc(`${email}`)
      .update({
        following: firebase.firestore.FieldValue.arrayUnion(user.email),
      }),
    db
      .collection("users")
      .doc(`${user.email}`)
      .update({ followers: firebase.firestore.FieldValue.arrayUnion(email) })
  );
}

export async function unfollowUserFromAPI(user) {
  const email = getAuth().currentUser.email;
  return (
    db
      .collection("users")
      .doc(`${email}`)
      .update({
        following: firebase.firestore.FieldValue.arrayRemove(user.email),
      }),
    db
      .collection("users")
      .doc(`${user.email}`)
      .update({ followers: firebase.firestore.FieldValue.arrayRemove(email) })
  );
}

export async function getUserDataAPI() {
  const res = await db.collection("users");
  const q = await getDocs(res);
  const userArray = [];
  q.forEach((doc) => {
    // console.log(doc.data().userName);
    userArray.push({
      name: doc.data().userName,
      email: doc.data().userEmail,
    });
  });

  return userArray;
}

export async function fetchUserData(user) {
  const response = await db.collection("users").doc(`${user}`);
  const data = await response.get();
  const postData = await data.data();

  return postData;
}
