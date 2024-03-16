import React from "react";
import ImageBlock from "./ImageBlock";

const PostGrid = ({ myposts }) => {
  //console.log(myposts);
  return (
    <div>
      <div className="flex flex-wrap">
        {myposts.map((postId) => (
          <ImageBlock key={postId} postId={postId} />
        ))}
      </div>
    </div>
  );
};

export default PostGrid;
