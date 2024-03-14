// "use server";
import { query, orderBy, limit, getDoc, setDoc } from "firebase/firestore";
import { db, storage } from "@/lib/firbase";
import { collection, where, getDocs, addDoc, doc } from "firebase/firestore";
import { revalidatePath, revalidateTag } from "next/cache";
import { runTransaction } from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export const getLiveCompList = async () => {
  try {
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split("T")[0];
    const docRefs = collection(db, "competitions");
    const q = query(docRefs, where("endDate", ">=", formattedCurrentDate));
    const querySnapshot = await getDocs(q);
    const liveComps = [];
    querySnapshot.forEach((doc) => {
      liveComps.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    return liveComps;
  } catch (error) {
    //console.error(error);
    return error;
  }
};

export const getUpcomingContest = async () => {
  try {
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split("T")[0];
    console.log(typeof formattedCurrentDate);
    const docRefs = collection(db, "competitions");
    const q = query(docRefs, where("startDate", ">=", formattedCurrentDate));
    const querySnapshot = await getDocs(q);
    const upComingContests = [];
    querySnapshot.forEach((doc) => {
      upComingContests.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    console.log("success");
    return upComingContests;
  } catch (error) {
    return error;
  }
};

export const generateRandomId = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const deleteImage = (filename) => {
  const desertRef = ref(storage, `images/${filename}`);
  deleteObject(desertRef)
    .then(() => {
      return "Removed Succefully";
    })
    .catch((error) => {
      return error;
    });
};

export const joinContest = async (form) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), form);
    //console.log(docRef.id);
    const postId = docRef.id;
    revalidatePath("/");
    return postId;
  } catch (e) {
    return e;
  }
};

export const updateContestParticipants = async (userId, contestId, postId) => {
  const sfDocRef = doc(db, "competitions", contestId);
  let updatedparticipants = [];
  let updatedPostIds = [];
  try {
    await runTransaction(db, async (transaction) => {
      const sfDoc = await transaction.get(sfDocRef);
      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }
      updatedparticipants = sfDoc.data().participants;
      updatedPostIds = sfDoc.data().postIds;
      updatedPostIds.push(postId);
      updatedparticipants.push(userId);
      transaction.update(sfDocRef, {
        participants: updatedparticipants,
        postIds: updatedPostIds,
      });
    });
    //console.log("Transaction successfully committed!");
    return "Participant is joined the Contest";
  } catch (e) {
    //console.log("Transaction failed: ", e);
    return e;
  }
};

export const getFeeds = async () => {
  try {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("timestamp", "desc"), limit(10));
    const querySnapshot = await getDocs(q);
    const feeds = [];
    querySnapshot.forEach((doc) => {
      //console.log(doc.data());
      feeds.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    return feeds;
  } catch (e) {
    return e;
  }
};

export const updateLikeStatus = async (docId, userId, val) => {
  const sfDocRef = doc(db, "posts", docId);
  let updatedLikes = {};
  try {
    await runTransaction(db, async (transaction) => {
      const sfDoc = await transaction.get(sfDocRef);
      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }
      updatedLikes = sfDoc.data().likes;
      updatedLikes[userId] = val;
      transaction.update(sfDocRef, { likes: updatedLikes });
    });
    //console.log("Transaction successfully committed!");
    return "Like updated successfullty";
  } catch (e) {
    //console.log("Transaction failed: ", e);
    return e;
  }
};

export const getLikeStatus = async (postId, uid) => {
  const docRef = doc(db, "posts", postId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let likeStatus = docSnap.data().likes[uid];
    //console.log("Document data:", docSnap.data());
    //console.log(likeStatus);
    return likeStatus;
  } else {
    // docSnap.data() will be undefined in this case
    //console.log("No such document!");
    return "No such document!";
  }
};

export const getLikeCount = async (postId) => {
  const docRef = doc(db, "posts", postId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let likes = docSnap.data().likes;
    let count = 0;
    for (const key in likes) {
      if (likes[key] === true) {
        count++;
      }
    }
    return count;
  } else {
    return "No such document!";
  }
};

export const getComments = async (postId) => {
  const docRef = doc(db, "posts", postId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let comments = docSnap.data().comments;
    return comments;
  } else {
    return "No such document!";
  }
};

export const addToMyPosts = async (userId, postId) => {
  try {
    const userRef = doc(db, "myposts", userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const updatedPosts = [...userData.posts, postId];

      await setDoc(userRef, { posts: updatedPosts });
      //console.log(`Post ${postId} added to user ${userId}`);
      return `Post ${postId} added to user ${userId}`;
    } else {
      // If the user document doesn't exist, create a new one
      // await userRef.set({ posts: [postId] });
      await setDoc(userRef, { posts: [postId] });
      //console.log(`User ${userId} created with post ${postId}`);
      return `User ${userId} created with post ${postId}`;
    }
  } catch (error) {
    //console.error("Error updating posts:", error);
    return error;
  }
};

export const addToMyContest = async (userId, contestId) => {
  try {
    const userRef = doc(db, "mycontests", userId);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const updatedPosts = [...userData.contests, contestId];

      await setDoc(userRef, { contests: updatedPosts });
      //console.log(`Post ${postId} added to user ${userId}`);
      revalidatePath("/myposts");
      return `Contest ${contestId} added to user ${userId}`;
    } else {
      // If the user document doesn't exist, create a new one
      // await userRef.set({ posts: [postId] });
      await setDoc(userRef, { contests: [contestId] });
      //console.log(`User ${userId} created with post ${postId}`);
      return `User ${userId} created with contest ${contestId}`;
    }
  } catch (error) {
    //console.error("Error updating posts:", error);
    return error;
  }
};

export const getJoinStatus = async (contestId, userId) => {
  const docRef = doc(db, "competitions", contestId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let participants = docSnap.data().participants;
    let isJoined = participants.includes(userId);
    //console.log(isJoined);
    return isJoined;
  } else {
    // docSnap.data() will be undefined in this case
    //console.log("No such document!");
    return "No such document!";
  }
};

export const getMyPosts = async (userId) => {
  const docRef = doc(db, "myposts", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let myposts = docSnap.data().posts;
    return myposts;
  } else {
    //console.log("No such document!");
    let noPosts = [];
    return noPosts;
  }
};

export const getMyContests = async (userId) => {
  const docRef = doc(db, "mycontests", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let mycontests = docSnap.data().contests;
    return mycontests;
  } else {
    //console.log("No such document!");
    let noContests = [];
    return noContests;
  }
};

export const getImage = async (postId) => {
  //console.log(postId);
  const docRef = doc(db, "posts", postId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let imgUrl = docSnap.data().imgUrl;
    return imgUrl;
  } else {
    //console.log("No such document!");
    return "No such document!";
  }
};

export const addComment = async (postId, currentUser, comment) => {
  const sfDocRef = doc(db, "posts", postId);
  let updatedComments = {};
  try {
    await runTransaction(db, async (transaction) => {
      const sfDoc = await transaction.get(sfDocRef);
      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }
      updatedComments = sfDoc.data().comments;
      updatedComments[currentUser] = comment;
      transaction.update(sfDocRef, { comments: updatedComments });
    });
    //console.log("Transaction successfully committed!");
    return "Comment added successfullty";
  } catch (e) {
    //console.log("Transaction failed: ", e);
    return e;
  }
};

export const getContestById = async (contestId) => {
  const contestRef = doc(db, "competitions", contestId);
  const docSnap = await getDoc(contestRef);
  if (docSnap.exists()) {
    let data = docSnap.data();
    return data;
  } else {
    //console.log("No such document!");
    return "No such document!";
  }
};
