"use client";

import { useUser } from "@clerk/nextjs";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export const UserButton = () => {
  const { isSignedIn, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  if (!isLoaded) {
    return <Button disabled>Loading</Button>;
  }
  return (
    <div className="flex items-center">
      <div
        onClick={() => {
          signOut(() => router.push("/sign-in"));
        }}
        className="w-full justify-start hover:bg-indigo-600 hover:text-white flex items-center hover:rounded-2xl px-4 py-3 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          width="20"
          viewBox="0 0 512 512"
          className="fill-indigo-700"
          style={{ fill: "currentColor", transition: "fill 0.2s ease" }}
          onMouseOver={(e) => e.target.setAttribute("fill", "white")}
          onMouseOut={(e) => e.target.setAttribute("fill", "currentColor")}
        >
          <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
        </svg>
        <p className="ml-2">Log out</p>
      </div>
    </div>
  );
};
