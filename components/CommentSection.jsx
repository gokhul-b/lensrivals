import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CommentIcon from "@/svg/CommentIcon";
import { Input } from "@/components/ui/input";
import { addComment, getComments } from "@/app/action";
import { auth } from "@clerk/nextjs";
import { Button } from "./ui/button";
import RightArrow from "@/svg/RightArrow";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";

const CommentSection = ({ postId, currentUserName, onData }) => {
  const [comment, setComment] = useState("");
  const [cmtCount, setCmtCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [userComments, setUserComments] = useState({});
  const [res, setRes] = useState("");
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getComments(postId);
        console.log("UserComments => ", response);
        setUserComments(response);
        setCmtCount(Object.keys(response).length);
        onData(Object.keys(response).length);
        console.log(cmtCount);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComments();
  }, [res]);

  const handleAddComment = async () => {
    try {
      setIsLoading(true);
      const response1 = await addComment(postId, currentUserName, comment);
      console.log(response1);
      setRes(response1);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setComment("");
    }
  };
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <CommentIcon />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              Comments{" "}
              <span className="text-muted-foreground text-sm ">
                ({cmtCount})
              </span>
            </SheetTitle>
            <SheetDescription>
              <div className="">
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                      console.log(comment);
                    }}
                  />
                  <Button
                    className="max-w-full rounded-full bg-indigo-700"
                    onClick={handleAddComment}
                  >
                    {isLoading ? "..." : <RightArrow />}
                  </Button>
                </div>
              </div>
              <div className="mt-6">
                <Separator />
              </div>
              <div>
                <ScrollArea>
                  {Object.keys(userComments).map((userId, index) => (
                    <div key={index}>
                      <p className="font-semibold text-black my-2">
                        {userId}:{" "}
                        <span className="font-normal text-black">
                          {userComments[userId]}
                        </span>
                      </p>
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CommentSection;
