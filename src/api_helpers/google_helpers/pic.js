import { getAuth } from "firebase/auth";

// Adds a size to Google Profile pics URLs.
export function addSizeToGoogleProfilePic(url) {
  if (url.indexOf("googleusercontent.com") !== -1 && url.indexOf("?") === -1) {
    return url + "?sz=150";
  }
  return url;
}

// Returns the signed-in user's profile Pic URL.
export function getProfilePicUrl() {
  return getAuth().currentUser.photoURL || "/images/profile_placeholder.png";
}
