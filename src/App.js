/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from "react";
import "./App.css";
import RouteSwitch from "./RouteSwitch";
import Logo from "./popcorn-logo.png";
/* eslint-disable no-unused-vars */
/* eslint-disable n/handle-callback-err */
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

function App() {
  // state variables
  const apiKey = `0452af7a26b17e3bde1121a0ca08fb46`;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [upcoming, setUpcoming] = useState([]);
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
    } else {
      console.log("user is not signed in");
    }
  }, [signInClicked]);

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (!result) {
          return;
        }
        console.log(result);
        console.log("inside get redirect result");
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // ...
        addUserToDocs(user);
        // change state to signed in
        setUserSignedIn(true);
      })

      .catch((error) => {
        console.log(error);
        console.log("error");
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
          console.log("logged out");
          setUserSignedIn(false);
          setFeed([]);
          setWatchlist([]);
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
        });
    } else {
      console.log("sign out not clicked");
    }
  }, [signOutClicked]);

  const addUserToDocs = async (user) => {
    console.log("inside addusers to docs");
    const email = getAuth().currentUser.email;
    console.log(getAuth().currentUser.email);
    const pic = getProfilePicUrl();
    const name = getAuth().currentUser.displayName;

    // await db.collection("users").doc(`${email}`).set();
    // addPicToUser(user);
    const userData = { userName: name, userPic: pic, userEmail: email };
    const personRef = await db
      .collection("users")
      .doc(`${email}`)
      .set(userData, { merge: true });

    // const res = await db
    //   .collection("users")
    //   .doc(`${email}`)
    //   .update({ userName: name, userPic: pic, userEmail: email }); // const res = await personRef.set(
    // //   {
    //     userName: name,
    //     userPic: pic,
    //     userEmail: email,
    //   },
    //   { merge: true }
    // );

    // const res = await cityRef.set({
    //   capital: true
    // }, { merge: true });
    // addPicToUser(user);
    // const personRef = await doc(db, "users", `${name}`);
    // console.log(personRef);
    // setDoc(personRef, { userPic: pic }, { merge: true });
    // const res = await db.collection("users").doc(`${name}`);
  };

  // const addPicToUser = async (user) => {
  //   const pic = getProfilePicUrl();
  //   const name = getAuth().currentUser.displayName;
  //   const email = getAuth().currentUser.email;
  //   const res = await db
  //     .collection("users")
  //     .doc(`${email}`)
  //     .update({ userName: name, userPic: pic, userEmail: email });
  // };
  //

  // Initialize firebase auth
  function initFirebaseAuth() {
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
  function isUserSignedIn() {
    console.log(getAuth().currentUser);
    console.log("logging whether user is signed in");
    console.log(!!getAuth().currentUser);
    return !!getAuth().currentUser;
  }

  // Adds a size to Google Profile pics URLs.
  function addSizeToGoogleProfilePic(url) {
    if (
      url.indexOf("googleusercontent.com") !== -1 &&
      url.indexOf("?") === -1
    ) {
      return url + "?sz=150";
    }
    return url;
  }

  function authStateObserver(user) {
    if (user) {
      console.log("inside auth state observer");
      console.log(user);
      setUserSignedIn(true);
      // addUserToDocs(user);
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

      // if user is signed in, we want to fetch feed and watchlist
      // fetchFollowing();
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

      // reset feed and watchlist is user is signed out
      console.log("clearing feed");
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
  const signInSnackbarElement = document.getElementById("must-signin-snackbar");

  signInButtonElement.addEventListener("click", signIn);
  signOutButtonElement.addEventListener("click", handleSignOut);

  // initialize firebase
  useEffect(() => {
    initFirebaseAuth();
  }, []);

  // function to add film to watchlist in firebase plus set state variable to load on page
  const addFilmToWatchList = async (film) => {
    const email = getAuth().currentUser.email;
    const res = await db
      .collection("users")
      .doc(`${email}`)
      .update({ watch_list: firebase.firestore.FieldValue.arrayUnion(film) });
    const newElement = film;
    setWatchlist([...watchlist, newElement]);
    // fetchWatchlist();
  };
  const setFilmToShow = (film) => {
    console.log("logging film from app");
    console.log(film);
    setMovieForMoviePage([film]);
    // console.log(movieForMoviePage);
  };

  const removeFilmFromWatchList = async (film) => {
    const email = getAuth().currentUser.email;
    const res = await db
      .collection("users")
      .doc(`${email}`)
      .update({ watch_list: firebase.firestore.FieldValue.arrayRemove(film) });

    const index = watchlist.indexOf(film);
    setWatchlist([...watchlist.slice(0, index), ...watchlist.slice(index + 1)]);
    // if (index > -1) {
    //   // only splice array when item is found
    //   watchlist.splice(index, 1); // 2nd parameter means remove one item only
    // }

    console.log(watchlist);
  };

  // function to follow user and add follower to object in firebase
  const followUser = async (user) => {
    console.log(user);
    const email = getAuth().currentUser.email;
    const res = await db
      .collection("users")
      .doc(`${email}`)
      .update({
        following: firebase.firestore.FieldValue.arrayUnion(user.email),
      });
    const res2 = await db
      .collection("users")
      .doc(`${user.email}`)
      .update({ followers: firebase.firestore.FieldValue.arrayUnion(email) });
    fetchFeed();
  };

  const unfollowUser = async (user) => {
    const email = getAuth().currentUser.email;
    const res = await db
      .collection("users")
      .doc(`${email}`)
      .update({
        following: firebase.firestore.FieldValue.arrayRemove(user.email),
      });
    const res2 = await db
      .collection("users")
      .doc(`${user.email}`)
      .update({ followers: firebase.firestore.FieldValue.arrayRemove(email) });
    fetchFeed();
  };

  // function to add a post to a posts object in firebase plus add to a state variable to load
  const addPostToFeed = async (post) => {
    console.log("adding post");
    // const name = getAuth().currentUser.displayName;
    const postRef = await addDoc(collection(db, "posts"), post);
    console.log(postRef);
    await updateDoc(postRef, {
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // const res = await postRef.update({
    //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    // });
    fetchFeed();
    // console.log(`document written with ID: ${postRef}`);
    // console.log(postRef);
    // const newPost = { ...post, id: postRef.id };
    // // newPost = { user: name, ...newPost };
    // console.log(newPost);

    // setFeed([...feed, newPost]);
  };

  // helper function for posts
  const addFilmToPost = (film) => {
    setSelectedMovie([film]);
  };

  const addCommentToPost = async (singlePost, comment) => {
    const postRef = doc(db, "posts", `${singlePost.id}`);
    console.log(postRef);
    await updateDoc(postRef, {
      comments: firebase.firestore.FieldValue.arrayUnion(comment),
    });
    fetchFeed();
  };
  // function that loads all the users from firebase
  const getUserData = async () => {
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
  };

  // sets a users state variable to load on page
  const fetchUsers = () => {
    getUserData().then((result) => setUsers(result));
    console.log(users);
  };

  // just checks to see if users is loading correctly
  useEffect(() => {
    console.log("users");
    console.log(users);
  }, [users]);

  // const fetchFollowing = async () => {
  //   "inside fetch for following";
  //   const user = await getAuth().currentUser.displayName;
  //   const response = await db.collection("users").doc(`${user}`);
  //   const data = await response.get();
  //   const followingToSet = data.data().following;
  //   console.log(followingToSet);
  //   followingToSet.then((result) => setFollowing(result));
  //   console.log("all im following");
  //   console.log(following);
  // };
  const fetchUserData = async (user) => {
    const response = await db.collection("users").doc(`${user}`);
    const data = await response.get();
    const postData = await data.data();
    // .posts;
    // const followersData = await data.data().followers;
    // const followingData = await data.data().following;

    // const dataToShare = [postData, followersData, followingData];

    // await Promise.all(dataToShare);

    return postData;
  };

  // const updateFeed = () => {
  //   fetchFeed();
  // };
  // function loads
  const fetchFeed = async () => {
    console.log("inside fetch for feed");
    const email = getAuth().currentUser.email;
    const response = await db.collection("users").doc(`${email}`);
    console.log("logging response");
    console.log(response);
    const data = await response.get();
    console.log(data);
    console.log(data.data());
    const followingData = await data.data().following;
    console.log("logging following");
    console.log(followingData);
    const followingArray = [];
    const compiledFeed = [];
    // find posts for each of these people in posts
    const allFollowing = followingData.map(async (person) => {
      console.log(person);
      const q = query(
        collection(db, "posts"),
        where("userEmail", "==", person)
      );
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        const postObject = doc.data();
        postObject.id = doc.id;
        console.log(postObject);
        // const postObject = { ...doc.data(), doc.id }

        // doc.data() is never undefined for query doc snapshots
        compiledFeed.push(postObject);
      });
      // const personCollection = await db.collection("users").doc(`${person}`);
      // console.log(personCollection);
      // const dataFromPerson = await (await personCollection.get()).data().posts;
      // // const dataFromPersonArray = Object.entries(dataFromPerson);
      // // console.log(dataFromPersonArray);
      // dataFromPerson.forEach((post) => {
      //   const postWithPersonName = { user: person, ...post };
      //   compiledFeed.push(postWithPersonName);
      // });
      // followingArray.push(person);
    });

    await Promise.all(allFollowing);
    // return compiledFeed
    console.log(followingArray);
    setFeed(compiledFeed);
    setFollowing(followingData);
    console.log(feed);
    console.log(following);
    // console.log(JSON.stringify(compiledFeed));
  };

  // const getFeed = () => {
  //   fetchFeed().then((result) => setFeed(result))
  // }

  // useEffect(() => {
  //   fetchFeed();
  // }, []);

  const fetchWatchlist = async () => {
    const email = getAuth().currentUser.email;
    const response = db.collection("users").doc(`${email}`);
    const data = await response.get();
    console.log("fetching watchlist");
    console.log(data.data());
    const userWatchlist = data.data().watch_list;
    console.log(userWatchlist);
    const newWatchList = [...watchlist];
    userWatchlist.forEach((item) => {
      const newFilm = item;
      if (
        watchlist.filter((element) => element.title === newFilm.title).length >
        0
      ) {
        console.log("skipping film");
      } else {
        newWatchList.push(newFilm);
        setWatchlist(newWatchList);
      }
    });
  };

  // useEffect(() => {
  //   console.log("inside useeffect for watchlist");
  //   console.log(userSignedIn);
  //   fetchWatchlist();
  //   console.log(watchlist);
  // }, [userSignedIn]);

  // function to fetch upcoming films and set array to display
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`,
      { mode: "cors" }
    )
      .then((response) => response.json())
      .then(
        (result) => {
          // console.log(result);
          setIsLoaded(true);
          setUpcoming(result.results);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div> Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="App">
        {/* <img className="logo" src={Logo} /> */}
        <RouteSwitch
          upcoming={upcoming}
          id={upcoming.id}
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
          fetchUserData={fetchUserData}
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

{
  /*      
      <div className="item-grid">
          {upcoming.map((film) => (
            <>
              <div className="item-box">
                <h2>{film.title}</h2>
                <img
                  key={film.id}
                  className="item-image"
                  src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${film.poster_path}`}
                  alt={film.title} />
              </div>
            </>
          ))}
        </div></> */
}
//     );
//   }
// }
{
  /* //   const updateUpcoming = () => { */
}

{
  /* //   }
//   const movieArray = []
//   const movieResults = getMovieData()

//   movieResults.forEach(movie => {
//     movieArray.push(movie)
  // }); */
}

{
  /* // return (
  //   <div className="App">
  //     <div className="item-grid">
  //       {console.log(movieArray)}
  //       {movieArray.map((movie) => ( */
}
{
  /* //         <> */
}
{
  /* //           <div className="item-box">
  //             <h2>{movie.title}</h2>
  //             <img */
}
{
  /* //               key={movie.id}
  //               className="item-image"
  //               src={movie.poster_path}
  //               alt={movie.title}
//               />
//             </div> */
}
{
  /* //             {console.log(`${movie.title}`)} */
}
{
  /* //           </> */
}

{
  /* //         ))}
//       </div>
//     </div> */
}
{
  /* //   );
// } */
}
