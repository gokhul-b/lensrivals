"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { EditProfile } from "./EditProfile";
import { getProfileData } from "@/app/action";

const ProfileCard = ({ userId, username }) => {
  const [imgUrl, setImgUrl] = useState("https://github.com/shadcn.png");
  const [profileData, setProfileData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProfileData(userId);
        console.log(res);
        setProfileData(res);
      } catch (error) {
        console.error();
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {Object.keys(profileData).length == 0 ? (
        <div className="flex lg:space-x-8 space-x-2 items-center">
          <div>
            <Avatar className="lg:h-48 lg:w-48 w-20 h-20 lg:mb-0 mb-10">
              <AvatarImage src={imgUrl} />
              <AvatarFallback>{username}</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <p className="font-bold lg:text-base text-xs">Your Name</p>
            <div className="lg:text-sm text-[10px] text-muted-foreground font-medium lg:w-[480px] w-[280x]">
              <p>@{username}</p>
              <p>
                If you're new to Lensrivals, please update your profile by
                simply clicking the "Edit Profile" button.
              </p>
            </div>
            <div className="lg:mt-6 mt-2">
              <EditProfile userId={userId} userName={username} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex lg:space-x-8 space-x-2 items-center">
          <div>
            <Avatar className="lg:h-48 lg:w-48 w-20 h-20 lg:mb-0 mb-10">
              <AvatarImage src={profileData.imgUrl} />
              <AvatarFallback>{profileData.userName}</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <p className="font-bold lg:text-base text-xs">{profileData.name}</p>
            <div className="lg:text-sm text-[10px] text-muted-foreground font-medium lg:w-[480px] w-[280x]">
              <p>@{profileData.userName}</p>
              <p>{profileData.bio}</p>
            </div>
            <div className="lg:mt-6 mt-2">
              <EditProfile userId={userId} userName={username} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
