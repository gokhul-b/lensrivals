import React from "react";
import ImageBlock from "./ImageBlock";

const PostGrid = ({ myposts }) => {
  //console.log(myposts);
  return (
    <div>
      <div className="flex space-x-4">
        {myposts.map((postId) => (
          <ImageBlock key={postId} postId={postId} />
        ))}
      </div>
    </div>
  );
};

export default PostGrid;
