import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";

const SideBar = () => {
  return (
    <div className="flex h-screen">
      <div className="border-r w-[320px] py-8 px-2 flex flex-col justify-between">
        <div className="w-full">
          <p className="font-bold text-xl">
            Lens<span className="text-indigo-600">Rivals</span>
          </p>
          <div className="space-y-2 py-8 w-full">
            <div className="w-full hover:border hover:rounded-2xl  px-4 py-3 hover:bg-indigo-600 hover:text-white">
              <Link href="/">Feeds</Link>
            </div>
            <div className="w-full hover:border hover:rounded-2xl  px-4 py-3 hover:bg-indigo-600 hover:text-white">
              <Link href="/myposts">My Posts</Link>
            </div>
            <div className="w-full hover:border hover:rounded-2xl  px-4 py-3 hover:bg-indigo-600 hover:text-white">
              <Link href="/live">Live Contests</Link>
            </div>
            <div className="w-full hover:border hover:rounded-2xl  px-4 py-3 hover:bg-indigo-600 hover:text-white">
              <Link href="/mycontests">My Contests</Link>
            </div>
            <div className="w-full hover:border hover:rounded-2xl  px-4 py-3 hover:bg-indigo-600 hover:text-white">
              <Link href="/upcoming">Upcoming Contests</Link>
            </div>
          </div>
        </div>
        <div className="mb-5">
          <SignedIn>
            <div className="flex items-center">
              <UserButton />
              <p className="ml-2 font-bold">My Profile</p>
            </div>
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
