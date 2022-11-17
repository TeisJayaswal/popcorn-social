import db from "../../firebase.config";
import { getAuth } from "firebase/auth";
import { getProfilePicUrl } from "./pic";

export async function addUserToDocsAPI(user) {
  const email = getAuth().currentUser.email;
  console.log(getAuth().currentUser.email);
  const pic = getProfilePicUrl();
  const name = getAuth().currentUser.displayName;

  const userData = { userName: name, userPic: pic, userEmail: email };

  return db.collection("users").doc(`${email}`).set(userData, { merge: true });
}
