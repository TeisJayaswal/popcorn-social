import { getAuth } from "firebase/auth";
import db from "../firebase.config";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function fetchFeedAPI() {
  const email = getAuth().currentUser.email;
  const response = await db.collection("users").doc(`${email}`);
  const data = await response.get();
  const followingData = await data.data().following;
  const compiledFeed = [];
  // find posts for each of these people in posts
  const allFollowing = followingData.map(async (person) => {
    const q = query(collection(db, "posts"), where("userEmail", "==", person));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const postObject = doc.data();
      postObject.id = doc.id;
      compiledFeed.push(postObject);
    });
  });

  await Promise.all(allFollowing);

  const timeSortedFeed = compiledFeed.sort(
    (objA, objB) => objB.timestamp.toDate() - objA.timestamp.toDate()
  );

  return { timeSortedFeed, followingData };
}
