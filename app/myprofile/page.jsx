import { auth, currentUser } from "@clerk/nextjs";
import React from "react";
import { getMyPosts } from "../action";
import PostGrid from "@/components/PostGrid";
import ProfileCard from "@/components/ProfileCard";
import { Separator } from "@/components/ui/separator";

const page = async () => {
  const { userId } = auth();
  const username = (await currentUser()).username;
  const myposts = await getMyPosts(userId);
  return (
    <div className="p-8">
      <ProfileCard userId={userId} username={username} />
      <p className="font-semibold text-center text-sm mt-6 mb-3">Posts</p>
      <div className="mb-6">
        <Separator />
      </div>
      {myposts.length > 0 ? (
        <PostGrid myposts={myposts} />
      ) : (
        <p className="text-center font-semibold">Yet no posts created</p>
      )}
    </div>
  );
};

export default page;
