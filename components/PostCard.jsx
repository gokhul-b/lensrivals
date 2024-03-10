"use client";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LikeCommentBar from "./LikeCommentBar";
import { getLikeStatus, updateLikeStatus } from "@/app/action";
import { useEffect, useState } from "react";

const PostCard = ({ feed, docId }) => {
  const {
    userName,
    timestamp,
    caption,
    likes,
    imgUrl,
    comments,
    contestId,
    userId,
  } = feed;
  const [likeStatus, setLikeStatus] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLikeStatus(docId, userId);
        setLikeStatus(response);
        console.log(likeStatus);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const handleDoubleClick = () => {
    try {
      // setLikeStatus(!likeStatus);
      const response = updateLikeStatus(docId, userId, !likeStatus).then(() => {
        setLikeStatus(!likeStatus);
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col space-y-4 mb-4">
      <div className="flex space-x-2">
        <div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <p className="font-semibold">{userName}</p>
          <p className=" text-muted-foreground text-xs">{timestamp}</p>
        </div>
      </div>
      <div>
        <p>{caption}</p>
      </div>
      <div className="w-[600px] h-[480px] flex items-center justify-center relative">
        <div
          className="absolute inset-0 flex items-center justify-center border"
          onDoubleClick={handleDoubleClick}
        >
          <Image
            src={imgUrl}
            alt=""
            fill={true}
            style={{ objectFit: "contain" }}
            priority={false}
            loading="lazy"
          />
        </div>
      </div>
      <div>
        <LikeCommentBar postId={docId} uid={userId} likeStatus={likeStatus} />
      </div>
      <Separator />
    </div>
  );
};

export default PostCard;
