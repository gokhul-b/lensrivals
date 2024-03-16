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
        <div className="flex space-x-8 items-center">
          <div>
            <Avatar className="h-48 w-48">
              <AvatarImage src={imgUrl} />
              <AvatarFallback>{username}</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <p className="font-bold">Your Name</p>
            <div className="text-sm text-muted-foreground font-medium w-[480px]">
              <p>@{username}</p>
              <p>
                If you're new to Lensrivals, please update your profile by
                simply clicking the "Edit Profile" button.
              </p>
            </div>
            <div className="mt-6">
              <EditProfile userId={userId} userName={username} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex space-x-8 items-center">
          <div>
            <Avatar className="h-48 w-48">
              <AvatarImage src={profileData.imgUrl} />
              <AvatarFallback>{profileData.userName}</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <p className="font-bold">{profileData.name}</p>
            <div className="text-sm text-muted-foreground font-medium w-[480px]">
              <p>@{profileData.userName}</p>
              <p>{profileData.bio}</p>
            </div>
            <div className="mt-6">
              <EditProfile userId={userId} userName={username} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
