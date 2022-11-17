import { getAuth } from "firebase/auth";

// Returns the signed-in user's display name.
export function getUserName() {
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
