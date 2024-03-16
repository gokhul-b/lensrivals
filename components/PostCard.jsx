"use client";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LikeCommentBar from "./LikeCommentBar";
import { getLikeCount, getLikeStatus, updateLikeStatus } from "@/app/action";
import { useEffect, useState } from "react";

const PostCard = ({ feed, docId, currentUser, currentUserName }) => {
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
  const [likesCount, setLikesCount] = useState("");
  const [taps, setTaps] = useState(0);

  const handleTouchStart = () => {
    setTaps((prevTaps) => prevTaps + 1);
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setTaps(0);
    }, 200);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLikeStatus(docId, currentUser);
        const cnt = await getLikeCount(docId);
        setLikeStatus(response);
        setLikesCount(cnt);
        //console.log(likeStatus);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const handleDoubleClick = async () => {
    try {
      setLikeStatus(!likeStatus);
      if (!likeStatus == true) {
        setLikesCount(likesCount + 1);
      } else {
        setLikesCount(likesCount - 1);
      }
      const response = await updateLikeStatus(docId, currentUser, !likeStatus);
      //console.log("while liking", likes);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col lg:space-y-4 space-y-2 mb-4">
      <div className="flex space-x-2">
        <div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <p className="font-semibold lg:text-base text-sm">{userName}</p>
          <p className=" text-muted-foreground lg:text-xs text-[10px] ">
            {timestamp}
          </p>
        </div>
      </div>
      <div>
        <p className="lg:text-base text-xs">{caption}</p>
      </div>
      <div className="lg:w-[720px] lg:h-[576px] w-[345px] h-[276px] flex items-center justify-center relative">
        <div
          className="absolute inset-0 flex items-center justify-center border"
          onDoubleClick={handleDoubleClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={() => {
            if (taps === 2) {
              handleDoubleClick();
            }
          }}
        >
          <Image
            src={imgUrl}
            alt=""
            fill={true}
            style={{ objectFit: "contain" }}
            priority={false}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={100}
          />
        </div>
      </div>
      <div>
        <LikeCommentBar
          postId={docId}
          likeStatus={likeStatus}
          likesCount={likesCount}
          currentUserName={currentUserName}
        />
      </div>
      <Separator />
    </div>
  );
};

export default PostCard;
