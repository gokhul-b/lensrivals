import { auth } from "@clerk/nextjs";
import React from "react";
import { getMyContests } from "../action";
import { ScrollArea } from "@/components/ui/scroll-area";
import MyContestCard from "@/components/MyContestCard";

const page = async () => {
  const { userId } = auth();
  const mycontests = await getMyContests(userId);
  // console.log(mycontests);
  return (
    <div>
      <ScrollArea className="h-screen w-[800px] px-1 relative pt-1">
        <p className="py-3 font-semibold text-base text-center mb-8 bg-indigo-700 text-white sticky z-10">
          My Contests
        </p>
        <div className="px-8">
          {mycontests.map((contestId, index) => (
            <MyContestCard key={index} contestId={contestId} idx={index} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default page;
