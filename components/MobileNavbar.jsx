"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignedIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

const MobileNavbar = () => {
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <div className="flex justify-between p-2 items-center">
      <Sheet>
        <SheetTrigger>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="14"
            width="12.25"
            viewBox="0 0 448 512"
            className="fill-indigo-700"
          >
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="space-y-2 lg:py-8 py-4 w-full">
            <div className="w-full hover:border hover:rounded-2xl  lg:px-4 lg:py-3 px-2 py-1.5 hover:bg-indigo-600 hover:text-white">
              <Link href="/">Home</Link>
            </div>
            <div className="w-full hover:border hover:rounded-2xl  lg:px-4 lg:py-3 px-2 py-1.5 hover:bg-indigo-600 hover:text-white">
              <Link href="/live">Live Contests</Link>
            </div>
            <div className="w-full hover:border hover:rounded-2xl  lg:px-4 lg:py-3 px-2 py-1.5 hover:bg-indigo-600 hover:text-white">
              <Link href="/mycontests">My Contests</Link>
            </div>
            <div className="w-full hover:border hover:rounded-2xl  lg:px-4 lg:py-3 px-2 py-1.5 hover:bg-indigo-600 hover:text-white">
              <Link href="/upcoming">Upcoming Contests</Link>
            </div>
            <div className="w-full hover:border hover:rounded-2xl  lg:px-4 lg:py-3 px-2 py-1.5 hover:bg-indigo-600 hover:text-white">
              <Link href="/leaderboard">Leaderboard</Link>
            </div>
            <div className="w-full hover:border hover:rounded-2xl  lg:px-4 lg:py-3 px-2 py-1.5 hover:bg-indigo-600 hover:text-white">
              <Link href="/myprofile">My Profile</Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <p className="font-bold text-base">
        Lens<span className="text-indigo-600">Rivals</span>
      </p>
      <div
        onClick={() => {
          signOut(() => router.push("/sign-in"));
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          width="16"
          viewBox="0 0 512 512"
          className="fill-indigo-700"
        >
          <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
        </svg>
      </div>
    </div>
  );
};

export default MobileNavbar;
