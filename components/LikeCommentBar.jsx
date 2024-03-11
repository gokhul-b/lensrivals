"use client";
import Liked from "./Liked";
import CommentIcon from "@/svg/CommentIcon";
import NotLiked from "./NotLiked";
import { getLikeCount, getLikeStatus, updateLikeStatus } from "@/app/action";
import { useEffect, useState } from "react";

const LikeCommentBar = ({ postId, likeStatus, likesCount }) => {
  const [isLiked, setIsLIked] = useState(likeStatus);
  const [likesCnt, setLikesCnt] = useState(likesCount);
  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const cnt = await getLikeCount(postId);
    //     console.log(cnt);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };
    // fetchData();
    setLikesCnt(likesCount);
    setIsLIked(likeStatus);
  }, [likeStatus, likesCount]);
  return (
    <div className="flex items-center space-x-4">
      <div className="flex space-x-2 items-center">
        {isLiked ? <Liked /> : <NotLiked />} <span>{likesCnt}</span>
      </div>
      <CommentIcon />
    </div>
  );
};

export default LikeCommentBar;
