import React from "react";
import Image from "next/image";
import { getImage } from "@/app/action";
const ImageBlock = async ({ postId }) => {
  //   //console.log(postId, "postId from imageblock");
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
          priority={false}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={100}
        />
      </div>
    </div>
  );
};

export default ImageBlock;
