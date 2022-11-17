/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
/* eslint-disable n/handle-callback-err */
import React, { useEffect, useState } from "react";
import "./stylesheets/App.css";
import RouteSwitch from "./RouteSwitch";
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
import db from "./firebase.config";
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
import {
  addFilmToWatchlistAPI,
  fetchWatchlistFromAPI,
  removeFilmToWatchlistAPI,
} from "./api_helpers/watchlist";
import {
  followUserFromAPI,
  getUserDataAPI,
  unfollowUserFromAPI,
} from "api_helpers/users";
import { addCommentToPostAPI, addPostToFeedAPI } from "api_helpers/post";
import { fetchFeedAPI } from "api_helpers/feed";
import {
  addSizeToGoogleProfilePic,
  getProfilePicUrl,
} from "api_helpers/google_helpers/pic";
import { addUserToDocsAPI } from "api_helpers/google_helpers/addToDocs";
import { getUserName } from "api_helpers/google_helpers/user";

function App() {
  // state variables
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [watchlist, setWatchlist] = useState([]);
  const [feed, setFeed] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState([]);
  const [userSignedIn, setUserSignedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [signInClicked, setSignInClicked] = useState(false);
  const [signOutClicked, setSignOutClicked] = useState(false);
  const [following, setFollowing] = useState([]);
  const [movieForMoviePage, setMovieForMoviePage] = useState([]);

  // sign in functions
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const signIn = () => {
    setSignInClicked(true);
    setSignOutClicked(false);
  };

  const handleSignOut = () => {
    setSignOutClicked(true);
    setSignInClicked(false);
  };

  useEffect(() => {
    if (signInClicked) {
      signInWithRedirect(auth, provider);
    }
  }, [signInClicked]);

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (!result) {
          return;
        }
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        addUserToDocs(user);
        // change state to signed in
      })

      .catch((error) => {
        console.log(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }, []);

  useEffect(() => {
    if (signOutClicked) {
      signOut(auth)
        .then(() => {
          setUserSignedIn(false);
          setFeed([]);
          setWatchlist([]);
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
        });
    }
  }, [signOutClicked]);

  const addUserToDocs = async (user) => {
    try {
      await addUserToDocsAPI(user);
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  // Initialize firebase auth
  function initFirebaseAuth() {
    // Listen to auth state changes.
    onAuthStateChanged(getAuth(), authStateObserver);
  }

  function authStateObserver(user) {
    if (user) {
      setUserSignedIn(true);
      // Get the signed-in user's profile pic and name.
      const profilePicUrl = getProfilePicUrl();
      const userName = getUserName();
      // Set the user's profile pic and name.
      userPicElement.style.backgroundImage =
        "url(" + addSizeToGoogleProfilePic(profilePicUrl) + ")";
      userNameElement.textContent = userName;
      // Show user's profile and sign-out button.
      userNameElement.removeAttribute("hidden");
      userPicElement.removeAttribute("hidden");
      signOutButtonElement.removeAttribute("hidden");
      // Hide sign-in button.
      signInButtonElement.setAttribute("hidden", "true");
      fetchFeed();
      fetchWatchlist();
      fetchUsers();
    } else {
      // User is signed out!
      // Hide user's profile and sign-out button.
      userNameElement.setAttribute("hidden", "true");
      userPicElement.setAttribute("hidden", "true");
      signOutButtonElement.setAttribute("hidden", "true");

      // Show sign-in button.
      signInButtonElement.removeAttribute("hidden");

      setFeed([]);
      setWatchlist([]);
      setUsers([]);
    }
  }

  // Shortcuts to DOM Elements.
  const userPicElement = document.getElementById("user-pic");
  const userNameElement = document.getElementById("user-name");
  const signInButtonElement = document.getElementById("sign-in");
  const signOutButtonElement = document.getElementById("sign-out");
  signInButtonElement.addEventListener("click", signIn);
  signOutButtonElement.addEventListener("click", handleSignOut);

  // initialize firebase
  useEffect(() => {
    initFirebaseAuth();
  }, []);

  // function to add film to watchlist in firebase plus set state variable to load on page
  const addFilmToWatchList = async (film) => {
    try {
      await addFilmToWatchlistAPI(film);
    } catch (err) {
      setError(true);
      console.log(err);
    }
    setWatchlist([...watchlist, film]);
  };

  const removeFilmFromWatchList = async (film) => {
    try {
      await removeFilmToWatchlistAPI(film);
    } catch (err) {
      setError(true);
      console.log(err);
    }
    const index = watchlist.indexOf(film);
    setWatchlist([...watchlist.slice(0, index), ...watchlist.slice(index + 1)]);
  };

  const setFilmToShow = (film) => {
    setMovieForMoviePage([film]);
  };

  // function to follow user and add follower to object in firebase
  const followUser = async (user) => {
    try {
      await followUserFromAPI(user);
    } catch (err) {
      setError(true);
      console.log(err);
    }
    fetchFeed();
  };

  const unfollowUser = async (user) => {
    try {
      await unfollowUserFromAPI(user);
    } catch (err) {
      setError(true);
      console.log(err);
    }
    fetchFeed();
  };

  // function to add a post to a posts object in firebase plus add to a state variable to load
  const addPostToFeed = async (post) => {
    try {
      await addPostToFeedAPI(post);
    } catch (err) {
      setError(true);
      console.log(err);
    }
    fetchFeed();
  };

  // helper function for posts
  const addFilmToPost = (film) => {
    setSelectedMovie([film]);
  };

  const addCommentToPost = async (singlePost, comment) => {
    try {
      await addCommentToPostAPI(singlePost, comment);
    } catch (err) {
      setError(true);
      console.log(err);
    }
    fetchFeed();
  };

  // sets a users state variable to load on page
  const fetchUsers = () => {
    getUserDataAPI()
      .then((result) => setUsers(result))
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  };

  // function loads
  const fetchFeed = async () => {
    try {
      const feed = await fetchFeedAPI();
      setFeed(feed.timeSortedFeed);
      setFollowing(feed.followingData);
      setIsLoaded(true);
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  const fetchWatchlist = async () => {
    try {
      const watchlist = await fetchWatchlistFromAPI();
      setIsLoaded(true);
      setWatchlist(watchlist);
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  if (error) {
    return <div> Error: {error.message}</div>;
  } else {
    return (
      <div className="App">
        {/* <img className="logo" src={Logo} /> */}
        <RouteSwitch
          watchlist={watchlist}
          addFilmToWatchList={addFilmToWatchList}
          feed={feed}
          fetchFeed={fetchFeed}
          setFeed={setFeed}
          addPostToFeed={addPostToFeed}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          addFilmToPost={addFilmToPost}
          users={users}
          followUser={followUser}
          unfollowUser={unfollowUser}
          following={following}
          addCommentToPost={addCommentToPost}
          addSizeToGoogleProfilePic={addSizeToGoogleProfilePic}
          setFilmToShow={setFilmToShow}
          movieForMoviePage={movieForMoviePage}
          removeFilmFromWatchList={removeFilmFromWatchList}
        />
      </div>
    );
  }
}

export default App;
