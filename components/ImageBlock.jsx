import React from "react";
import Image from "next/image";
import { getImage } from "@/app/action";
const ImageBlock = async ({ postId }) => {
  //   //console.log(postId, "postId from imageblock");
  const imageUrl = await getImage(postId);
  return (
    <div className="lg:h-[160px] lg:w-[160px] h-[100px] w-[100px] flex items-center justify-center relative border lg:rounded-2xl rounded-lg lg:mr-2 lg:mt-2 mr-1 mt-1">
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src={imageUrl}
          alt=""
          fill={true}
          style={{ objectFit: "cover" }}
          loading="lazy"
          priority={false}
          // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={100}
          className="lg:rounded-2xl rounded-lg"
        />
      </div>
    </div>
  );
};

export default ImageBlock;
