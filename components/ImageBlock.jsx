import React from "react";
import Image from "next/image";
import { getImage } from "@/app/action";
const ImageBlock = async ({ postId }) => {
  //   console.log(postId, "postId from imageblock");
  const imageUrl = await getImage(postId);
  return (
    <div className="h-[220px] w-[220px] flex items-center justify-center relative">
      <div className="absolute inset-0 flex items-center justify-center border">
        <Image
          src={imageUrl}
          alt=""
          fill={true}
          style={{ objectFit: "cover" }}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default ImageBlock;
