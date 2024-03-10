"use client";
import {
  addToMyPosts,
  deleteImage,
  generateRandomId,
  joinContest,
  updateContestParticipants,
} from "@/app/action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useState, useEffect } from "react";
import { storage } from "@/lib/firbase";
import ImgIcon from "@/svg/ImgIcon";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const JoinContestForm = ({ contestId, username, userId }) => {
  const [filename, setFileName] = useState("");
  const [uploadState, setUploadState] = useState("");
  const [progressState, setProgressState] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [dateTime, setDateTime] = useState(new Date().toISOString());
  const router = useRouter();
  const [form, setForm] = useState({
    caption: "",
    location: "",
    imgUrl: "",
    contestId: contestId,
    userId: userId,
    likes: {},
    comments: {},
    userName: username,
    timestamp: dateTime,
  });

  // console.log(form);

  useEffect(() => {
    if (uploadState === "running") {
      const timer = setTimeout(() => {
        if (progressState < 100) {
          setProgressState(progressState + 1);
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [uploadState, progressState]);

  const handleImageUpload = async (e) => {
    const selectedImage = e.target.files[0];
    const filename = generateRandomId(16);
    setFileName(filename);
    const storageRef = ref(storage, "images/" + filename);
    const uploadTask = uploadBytesResumable(storageRef, selectedImage);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgressState(progress);
        switch (snapshot.state) {
          case "paused":
            setUploadState("paused");
            break;
          case "running":
            setUploadState("running");
            break;
        }
      },
      (error) => {
        console.error(error);
        setUploadState(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setImageUrl(downloadURL);
            setForm({ ...form, imgUrl: downloadURL });
            console.log(form);
            setUploadState("completed");
          })
          .catch((error) => {
            console.error(error);
            setUploadState("error");
          });
      }
    );
  };

  const hanleRemove = () => {
    if (imageUrl !== "") {
      deleteImage(filename);
    }
    setFileName("");
    setImageUrl("");
    setUploadState("");
    setProgressState(0);
  };

  const handleFormSubmit = async () => {
    setForm({ ...form, timestamp: dateTime });
    try {
      console.log(form);
      const postId = await joinContest(form);
      const responseForContestUpdate = await updateContestParticipants(
        userId,
        contestId
      );
      console.log(responseForContestUpdate);
      console.log("postId => ", postId);
      const responseForMyPosts = await addToMyPosts(userId, postId);
      console.log(responseForMyPosts);
      router.push("/success");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <Button
          onClick={() => {
            hanleRemove(), router.push("/live");
          }}
          className="bg-indigo-700 hover:bg-indigo-600"
        >
          Back
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Enter the Contest with Your Best Shot!</CardTitle>
          <CardDescription>
            By uploading your image, you're joining the contest! Your photo will
            be showcased to the community, and its success depends on the likes
            it receives. Are you ready to make your mark?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full flex space-x-8 mt-4">
            <div>
              <div className="w-[400px] h-[400px] border rounded-lg shadow-md flex items-center justify-center relative">
                {imageUrl ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src={imageUrl}
                      alt=""
                      fill={true}
                      style={{ objectFit: "contain", padding: "24px" }}
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center px-8">
                    {uploadState === "running" ? (
                      <Progress value={progressState} />
                    ) : (
                      <ImgIcon />
                    )}
                  </div>
                )}
              </div>
              <div className="mt-8 flex items-center justify-between">
                <div>
                  <Button
                    onClick={() => document.getElementById("fileInput").click()}
                    className="bg-indigo-600 hover:bg-indigo-500"
                    disabled={uploadState === "completed"}
                  >
                    Add Image
                  </Button>
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                  />
                </div>
                <div>
                  <Button onClick={hanleRemove} variant="destructive">
                    Remove
                  </Button>
                </div>
              </div>
            </div>
            <form
              action={handleFormSubmit}
              className="flex flex-col w-full space-y-12"
            >
              <div className="space-y-4">
                <div className="flex flex-col w-full space-y-4">
                  <Label htmlFor="message">Caption</Label>
                  <Textarea
                    placeholder="Type your message here."
                    id="message"
                    onChange={(e) => {
                      setForm({ ...form, caption: e.target.value });
                    }}
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    type="location"
                    id="location"
                    placeholder="Type your location here."
                    onChange={(e) => {
                      setForm({ ...form, location: e.target.value });
                    }}
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500"
              >
                Join
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JoinContestForm;
