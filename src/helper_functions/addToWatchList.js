/* eslint-disable no-unused-vars */
// function to add film to watchlist in firebase plus set state variable to load on page

import React, { useEffect, useState } from "react";
import "./stylesheets/App.css";
import { async } from "@firebase/util";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  getRedirectResult,
} from "firebase/auth";
import db from "../firebase.config";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { FieldValue, arrayUnion, arrayRemove } from "firebase/firestore/lite";
import firebase from "firebase/compat/app";
import { connect } from "react-redux";

const addFilmToWatchList = async (film) => {
  // const email = getAuth().currentUser.email;
  // const res = await db
  //   .collection("users")
  //   .doc(`${email}`)
  //   .update({ watch_list: firebase.firestore.FieldValue.arrayUnion(film) });
  const newElement = film;
  setWatchlist([...watchlist, newElement]);
  // fetchWatchlist();
};

export default addFilmToWatchList;
