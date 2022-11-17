import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import db from "../firebase.config";

export async function fetchWatchlistFromAPI() {
  const email = getAuth().currentUser.email;
  const response = db.collection("users").doc(`${email}`);
  const data = await response.get();

  const userWatchlist = data.data().watch_list;
  return userWatchlist;
}

export async function addFilmToWatchlistAPI(film) {
  const email = getAuth().currentUser.email;
  return db
    .collection("users")
    .doc(`${email}`)
    .update({ watch_list: firebase.firestore.FieldValue.arrayUnion(film) });
}

export async function removeFilmToWatchlistAPI(film) {
  const email = getAuth().currentUser.email;
  return db
    .collection("users")
    .doc(`${email}`)
    .update({ watch_list: firebase.firestore.FieldValue.arrayRemove(film) });
}
