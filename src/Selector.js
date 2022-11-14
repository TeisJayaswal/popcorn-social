/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { FieldValue, arrayUnion, arrayRemove } from "firebase/firestore/lite";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import firebase from "firebase/compat/app";
import { FacebookSelector, FacebookCounter } from "@charkour/react-reactions";
import PropTypes from "prop-types";
import { getAuth } from "firebase/auth";
import _ from "lodash";
import db from "./firebase.config";
import { async } from "@firebase/util";
import ReactIcon from "./surprise_react.png";
import "./feed.css";

ReactionSelector.propTypes = {
  feed: PropTypes.array.isRequired,
  post: PropTypes.object.isRequired,
  fetchFeed: PropTypes.func.isRequired,
};

function ReactionSelector({ post, feed, fetchFeed }) {
  const name = getAuth().currentUser.displayName;
  // const [counter, setCounter] = useState([]);
  const [showSelector, setShowSelector] = useState(false);
  // post has post.reactions, that is what you use
  // when updating, set in firebase reactions = [...post.reactions, new reaction] (or if user already has reaction, do the update thing you did with state)

  const writeToFireBase = async (emoji) => {
    const postRef = doc(db, "posts", `${post.id}`);
    console.log(postRef);
    await updateDoc(postRef, {
      reactions: firebase.firestore.FieldValue.arrayUnion({ emoji, by: name }),
    });
    fetchFeed();
  };
  const updateInFireBase = async (emoji, oldElement) => {
    console.log(oldElement);
    const postRef = doc(db, "posts", `${post.id}`);
    console.log(postRef);
    await updateDoc(postRef, {
      reactions: firebase.firestore.FieldValue.arrayRemove(oldElement),
      // .arrayUnion({ emoji, by: name }),
    });
    await updateDoc(postRef, {
      reactions: firebase.firestore.FieldValue.arrayUnion({ emoji, by: name }),
    });
    fetchFeed();
  };
  // const [user, setUser] = useState(name);
  const handleAdd = () => {
    if (showSelector === false) {
      setShowSelector(true);
    } else {
      setShowSelector(false);
    }
  };

  const handleClick = (emoji) => {
    // console.log(counter);
    console.log(`entering handle click for`);
    console.log(`${post.user}`);
    const index = _.findIndex(post.reactions, { by: name });
    console.log(index);
    console.log(emoji);
    if (index > -1) {
      const oldElement = post.reactions[index];
      console.log(oldElement);
      // console.log("setting counter from if");
      // setCounter([
      //   ...post.reactions.slice(0, index),
      //   { emoji, by: name },
      //   ...post.reactions.slice(index + 1),
      // ]);
      updateInFireBase(emoji, oldElement);
      setShowSelector(false);
    } else {
      console.log("setting counter from else");
      // console.log(counter);
      // setCounter([...post.reactions, { emoji, by: name }]);
      setShowSelector(false);
      writeToFireBase(emoji);
      console.log(feed);
    }
    // const newReaction = `emoji: ${reaction}, by: ${name}`;
    // setCounter({ reactions: [newReaction], user: name, showSelector: true });
    // console.log(reaction);
    // console.log(post);
    // console.log(feed);
    // console.log(counter);
    console.log(feed);
  };
  // useEffect(() => {
  //   console.log(counter);
  // }, [counter]);

  return (
    <div className="react-bar">
      <div className="facebook-counter">
        <FacebookCounter
          counters={post.reactions || []}
          user={name}
          bg="#fafafa"
          onClick={handleAdd}
        />

        {showSelector ? <FacebookSelector onSelect={handleClick} /> : null}
        <div className="comment-length">
          <p>{post.comments ? post.comments.length : "0"}</p>
          <p>comments</p>
        </div>
      </div>
      <button className="post-button" onClick={handleAdd}>
        <img className="post-icon" src={ReactIcon} />
      </button>
    </div>
  );
}

export default ReactionSelector;
