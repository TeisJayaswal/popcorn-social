import firebase from "firebase/compat/app";
import db from "../firebase.config";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

// function to follow user and add follower to object in firebase
export async function addPostToFeedAPI(post) {
  const postRef = await addDoc(collection(db, "posts"), post);
  return updateDoc(postRef, {
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  });
}

export async function addCommentToPostAPI(singlePost, comment) {
  const postRef = doc(db, "posts", `${singlePost.id}`);
  return updateDoc(postRef, {
    comments: firebase.firestore.FieldValue.arrayUnion(comment),
  });
}
