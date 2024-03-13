"use client";
import {
  addToMyPosts,
  deleteImage,
  generateRandomId,
  getJoinStatus,
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
  const [isJoined, setIsJoined] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    const fetchData = async () => {
      const res = await getJoinStatus(contestId, userId);
      setIsJoined(res);
    };
    fetchData();
  }, []);

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
        //console.error(error);
        setUploadState(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setImageUrl(downloadURL);
            setForm({ ...form, imgUrl: downloadURL });
            //console.log(form);
            setUploadState("completed");
          })
          .catch((error) => {
            //console.error(error);
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
    if (imageUrl === "" || form.caption === "" || form.location === "") {
      alert("Some inputs are unfilled");
      return;
    }
    setForm({ ...form, timestamp: dateTime });
    try {
      setIsLoading(true);
      //console.log(form);
      const postId = await joinContest(form);
      console.log("postId => ", postId);
      const responseForContestUpdate = await updateContestParticipants(
        userId,
        contestId,
        postId
      );
      console.log("responseForContestUpdate => ", responseForContestUpdate);
      const responseForMyPosts = await addToMyPosts(userId, postId);
      console.log(responseForMyPosts);
    } catch (error) {
      //console.error(error);
    } finally {
      setIsLoading(false);
      router.push("/success");
    }
  };

  return (
    <div>
      {isJoined ? (
        <p>Already Joined</p>
      ) : (
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
                By uploading your image, you're joining the contest! Your photo
                will be showcased to the community, and its success depends on
                the likes it receives. Are you ready to make your mark?
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
                          priority={false}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          quality={100}
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
                        onClick={() =>
                          document.getElementById("fileInput").click()
                        }
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
                <div className="w-full flex flex-col space-y-12">
                  <form className="flex flex-col w-full space-y-12">
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
                  </form>
                  <Button
                    onClick={handleFormSubmit}
                    className="bg-indigo-600 hover:bg-indigo-500"
                  >
                    {isLoading ? "Joining..." : "Join"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default JoinContestForm;
