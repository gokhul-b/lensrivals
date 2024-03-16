"use client";
import { Button } from "@/components/ui/button";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { useState, useEffect } from "react";
import { storage } from "@/lib/firbase";
import { deleteImage, generateRandomId, updateProfile } from "@/app/action";
import RemoveIcon from "@/svg/RemoveIcon";

export function EditProfile({ userId, userName }) {
  const [uploadState, setUploadState] = useState("");
  const [progressState, setProgressState] = useState(0);
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    bio: "",
    imgUrl: "",
    userName: userName,
  });
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
            console.log(form);
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
      setForm({ ...form, imgUrl: "" });
      deleteImage(fileName);
    }
    setFileName("");
    setImageUrl("");
    setUploadState("");
    setProgressState(0);
  };

  const handleProfileUpdate = async () => {
    if (form.name === "" || form.bio === "" || form.imgUrl === "") {
      alert("Some of the inputs are unfilled");
      return;
    }
    try {
      setIsLoading(true);
      const res = await updateProfile(userId, form);
      console.log(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setForm({
        name: "",
        bio: "",
        imgUrl: "",
        userName: userName,
      });
      setImageUrl("");
      setOpen(false);
      setUploadState("");
    }
  };
  const handleClose = () => {
    // Reset the form to its initial state when closing the dialog
    setForm({
      name: "",
      bio: "",
      imgUrl: "",
      userName: userName,
    });
    setImageUrl("");
    setOpen(false);
    setUploadState("");
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        handleClose();
        setOpen(newOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="lg:text-xs text-[10px] font-bold lg:h-8 h-6"
        >
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:w-[425px] w-screen">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="w-full flex justify-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src={imageUrl} />
              <AvatarFallback className="text-xs">Profile Image</AvatarFallback>
            </Avatar>
            <div onClick={hanleRemove}>
              <RemoveIcon />
            </div>
          </div>
          <div className="w-full">
            <Button
              onClick={() => document.getElementById("fileInput").click()}
              className="bg-indigo-600 hover:bg-indigo-500 w-full"
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
          {uploadState === "running" && <Progress value={progressState} />}
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              placeholder="Name"
              value={form.name}
              onChange={(e) => {
                setForm({ ...form, name: e.target.value });
                console.log(form);
              }}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              className="h-10"
              placeholder="Add your bio.."
              value={form.bio}
              onChange={(e) => {
                setForm({ ...form, bio: e.target.value });
                console.log(form);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleProfileUpdate}>
            {isLoading ? "Saving" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
