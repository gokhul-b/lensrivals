import { auth } from "@clerk/nextjs";
import React from "react";
import { getMyPosts } from "../action";
import PostGrid from "@/components/PostGrid";

const page = async () => {
  const { userId } = auth();
  const myposts = await getMyPosts(userId);
  return (
    <div className="p-8">
      <p className="font-bold text-center text-lg mb-6">My Posts</p>
      {myposts.length > 0 ? (
        <PostGrid myposts={myposts} />
      ) : (
        <p className="text-center font-semibold">Yet no posts created</p>
      )}
    </div>
  );
};

export default page;
