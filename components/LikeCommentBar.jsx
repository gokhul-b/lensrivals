"use client";
import Liked from "./Liked";
import NotLiked from "./NotLiked";
import CommentSection from "./CommentSection";
import { useState } from "react";

const LikeCommentBar = ({
  postId,
  likeStatus,
  likesCount,
  currentUserName,
}) => {
  const [commentCount, setCommentCount] = useState(0);

  const handleDataFromChild = (data) => {
    console.log(data);
    setCommentCount(data);
  };
  return (
    <div className="flex items-center space-x-4 ">
      <div className="flex space-x-2 items-center">
        <div className="mt-1">{likeStatus ? <Liked /> : <NotLiked />}</div>{" "}
        <p>{likesCount}</p>
      </div>
      <div className="mt-1.5 flex items-center space-x-2">
        <CommentSection
          postId={postId}
          currentUserName={currentUserName}
          onData={handleDataFromChild}
        />
        <p className="mb-1.5">{commentCount}</p>
      </div>
    </div>
  );
};

export default LikeCommentBar;
