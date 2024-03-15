import Link from "next/link";
import { SignedIn } from "@clerk/nextjs";
import { UserButton } from "./UserButton";

const SideBar = () => {
  return (
    <div className="flex h-screen">
      <div className="border-r w-[270px] py-8 px-2 flex flex-col justify-between">
        <div className="w-full">
          <p className="font-bold text-xl">
            Lens<span className="text-indigo-600">Rivals</span>
          </p>
          <div className="space-y-2 py-8 w-full">
            <div className="w-full hover:border hover:rounded-2xl  px-4 py-3 hover:bg-indigo-600 hover:text-white">
              <Link href="/">Home</Link>
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
            <div className="w-full hover:border hover:rounded-2xl  px-4 py-3 hover:bg-indigo-600 hover:text-white">
              <Link href="/leaderboard">Leaderboard</Link>
            </div>
            <div className="w-full hover:border hover:rounded-2xl  px-4 py-3 hover:bg-indigo-600 hover:text-white">
              <Link href="/myprofile">My Profile</Link>
            </div>
          </div>
        </div>
        <div>
          {/* <SignedIn>
            <div className="flex items-center">
              <UserButton />
              <p className="ml-2 font-bold">My Profile</p>
            </div>
          </SignedIn> */}
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
