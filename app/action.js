// "use server";
import { query, orderBy, limit, getDoc, setDoc } from "firebase/firestore";
import { db, storage } from "@/lib/firbase";
import { collection, where, getDocs, addDoc, doc } from "firebase/firestore";
import { revalidateTag } from "next/cache";
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
    const q = query(
      collection(db, "competitions"),
      where("endDate", ">=", formattedCurrentDate)
    );
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
    console.error(error);
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
    console.log(docRef.id);
    const postId = docRef.id;
    return postId;
  } catch (e) {
    return e;
  }
};

export const updateContestParticipants = async (userId, contestId) => {
  const sfDocRef = doc(db, "competitions", contestId);
  let updatedparticipants = [];
  try {
    await runTransaction(db, async (transaction) => {
      const sfDoc = await transaction.get(sfDocRef);
      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }
      updatedparticipants = sfDoc.data().participants;
      updatedparticipants.push(userId);
      transaction.update(sfDocRef, { participants: updatedparticipants });
    });
    console.log("Transaction successfully committed!");
    return "Transaction successfully committed!";
  } catch (e) {
    console.log("Transaction failed: ", e);
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
      // console.log(doc.data());
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
    console.log("Transaction successfully committed!");
    return "Transaction successfully committed!";
  } catch (e) {
    console.log("Transaction failed: ", e);
    return e;
  }
};

export const getLikeStatus = async (postId, uid) => {
  const docRef = doc(db, "posts", postId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let likeStatus = docSnap.data().likes[uid];
    // console.log("Document data:", docSnap.data());
    console.log(likeStatus);
    return likeStatus;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
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

      await userRef.update({ posts: updatedPosts });
      console.log(`Post ${postId} added to user ${userId}`);
    } else {
      // If the user document doesn't exist, create a new one
      // await userRef.set({ posts: [postId] });
      await setDoc(userRef, { posts: [postId] });
      console.log(`User ${userId} created with post ${postId}`);
    }
  } catch (error) {
    console.error("Error updating posts:", error);
  }
};
