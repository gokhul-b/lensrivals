"use client";
import Liked from "./Liked";
import CommentIcon from "@/svg/CommentIcon";
import NotLiked from "./NotLiked";
import { getLikeStatus, updateLikeStatus } from "@/app/action";
import { useEffect, useState } from "react";

const LikeCommentBar = ({ postId, uid, likeStatus }) => {
  const [isLiked, setIsLIked] = useState(likeStatus);
  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await getLikeStatus(postId, uid);
    //     setIsLIked(response);
    //     console.log(isLiked);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };
    // fetchData();
    setIsLIked(likeStatus);
  }, [likeStatus]);

  // const disLike = async () => {
  //   try {
  //     const response = await updateLikeStatus(postId, uid, false);
  //     setLikeStatus(false);
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <div className="flex items-center space-x-4">
      <div className="cursor-pointer">{isLiked ? <Liked /> : <NotLiked />}</div>
      <CommentIcon />
    </div>
  );
};

export default LikeCommentBar;
