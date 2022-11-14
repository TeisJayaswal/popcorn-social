/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
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
import PropTypes from "prop-types";
import { getAuth } from "firebase/auth";
import _ from "lodash";
import db from "./firebase.config";
import { async } from "@firebase/util";
import CommentIcon from "./comment_icon2.png";
import "./feed.css";

function CommentField({ singlePost, addCommentToPost }) {
  const [showCommentField, setShowCommentField] = useState(false);
  const [comment, setComment] = useState({
    comment: "",
    by: getAuth().currentUser.displayName,
    userPic: `${getAuth().currentUser.photoURL}`,
  });

  const handleClick = () => {
    if (showCommentField === false) {
      setShowCommentField(true);
    } else {
      setShowCommentField(false);
    }
  };

  const handleCancel = () => setShowCommentField(false);
  const handleSubmission = (singlePost, comment) => {
    setShowCommentField(false);
    setComment({
      comment: "",
      by: getAuth().currentUser.displayName,
      userPic: `${getAuth().currentUser.photoURL}`,
    });
    addCommentToPost(singlePost, comment);
  };
  const newComment = { ...comment };
  const handleChange = (event) => {
    console.log(event);
    const { target } = event;
    console.log(target);
    const { value } = target;
    console.log(value);
    const { name } = target;
    console.log(name);
    newComment[name] = value;

    setComment(newComment);
    console.log(newComment);
  };

  return (
    <div>
      <button className="post-button" type="button" onClick={handleClick}>
        <img className="post-icon" src={CommentIcon} />
      </button>
      <div className="comment-area">
        {showCommentField ? (
          <>
            <textarea
              name="comment"
              form="usrform"
              value={comment.comment}
              onChange={(event) => handleChange(event)}
            >
              Comment Here!
            </textarea>
            <button
              type="button"
              onClick={(event) => handleSubmission(singlePost, comment)}
            >
              Comment!
            </button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default CommentField;
