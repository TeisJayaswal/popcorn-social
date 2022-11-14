/* eslint-disable no-unused-vars */
/* eslint-disable n/handle-callback-err */
import { async } from "@firebase/util";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useState } from "react";

import db from "./firebase.config";

const provider = new GoogleAuthProvider();

const auth = getAuth();

console.log(auth);

export function signIn() {
  console.log("starting sign in");
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      // ...
      addUserToDocs(user);
    })

    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

export function signOutUser() {
  signOut(auth)
    .then(() => {
      console.log("logged out");
      authStateObserver();
      getAuth();
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}

const addUserToDocs = async (user) => {
  const name = getAuth().currentUser.displayName;
  const res = await db.collection("users").doc(`${name}`);
};
// Initialize firebase auth
export function initFirebaseAuth() {
  console.log("firebase auth init");
  // Listen to auth state changes.
  onAuthStateChanged(getAuth(), authStateObserver);
}

// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
  return getAuth().currentUser.photoURL || "/images/profile_placeholder.png";
}

// Returns the signed-in user's display name.
function getUserName() {
  console.log("displayign username");
  return getAuth().currentUser.displayName;
}

// Returns true if a user is signed-in.
export function isUserSignedIn() {
  console.log(getAuth().currentUser);
  console.log("logging whether user is signed in");
  console.log(!!getAuth().currentUser);
  return !!getAuth().currentUser;
}

// Adds a size to Google Profile pics URLs.
function addSizeToGoogleProfilePic(url) {
  if (url.indexOf("googleusercontent.com") !== -1 && url.indexOf("?") === -1) {
    return url + "?sz=150";
  }
  return url;
}
export function sendMessageToApp(user) {
  const [signIn, setSignIn] = useState(false);
  if (signIn === false && user) {
    setSignIn(true);
  } else {
    setSignIn(false);
  }
  return signIn;
}

function authStateObserver(user) {
  if (user) {
    // User is signed in!
    console.log("user is signed in");
    // sendMessageToApp(user);
    // Get the signed-in user's profile pic and name.
    const profilePicUrl = getProfilePicUrl();
    const userName = getUserName();

    // Set the user's profile pic and name.
    userPicElement.style.backgroundImage =
      "url(" + addSizeToGoogleProfilePic(profilePicUrl) + ")";
    userNameElement.textContent = userName;
    console.log(userName);
    // Show user's profile and sign-out button.
    userNameElement.removeAttribute("hidden");
    userPicElement.removeAttribute("hidden");
    signOutButtonElement.removeAttribute("hidden");

    // Hide sign-in button.
    signInButtonElement.setAttribute("hidden", "true");
  } else {
    // User is signed out!
    // Hide user's profile and sign-out button.
    userNameElement.setAttribute("hidden", "true");
    userPicElement.setAttribute("hidden", "true");
    signOutButtonElement.setAttribute("hidden", "true");

    // Show sign-in button.
    signInButtonElement.removeAttribute("hidden");
  }
}

// Shortcuts to DOM Elements.
const userPicElement = document.getElementById("user-pic");
const userNameElement = document.getElementById("user-name");
const signInButtonElement = document.getElementById("sign-in");
const signOutButtonElement = document.getElementById("sign-out");
const signInSnackbarElement = document.getElementById("must-signin-snackbar");

signInButtonElement.addEventListener("click", signIn);
signOutButtonElement.addEventListener("click", signOutUser);
