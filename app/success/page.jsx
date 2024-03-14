import React from "react";
import Link from "next/link";
const page = () => {
  return (
    <div className="flex items-center justify-center mt-32">
      <div className="flex flex-col items-center space-y-4 border p-8 rounded-lg">
        <div className="flex space-x-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="32"
            width="32"
            viewBox="0 0 512 512"
          >
            <path
              fill="#42b540"
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
            />
          </svg>
          <p>You have successfully entered the Contest</p>
        </div>
        <div className="bg-indigo-700 max-w-fit px-3 py-1.5 rounded-md text-white">
          <Link href={"/"} className="text-xs">
            Back to feed
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
