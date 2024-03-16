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
    <div className="lg:p-8 p-2">
      <ProfileCard userId={userId} username={username} />
      <p className="font-semibold text-center lg:text-sm text-xs lg:mt-6 lg:mb-3 mb-1">
        Posts
      </p>
      <div className="lg:mb-4">
        <Separator />
      </div>
      {myposts.length > 0 ? (
        <PostGrid myposts={myposts} />
      ) : (
        <p className="text-sm text-center">Yet you have not posted any post.</p>
      )}
    </div>
  );
};

export default page;
