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
      <ScrollArea className="lg:h-screen sm:h-full lg:w-[800px] w-screen px-1 relative pt-1">
        <p className="py-3 font-semibold text-sm lg:text-base text-center mb-8 bg-indigo-700 text-white sticky z-10">
          My Contests
        </p>
        {Object.keys(mycontests).length > 0 ? (
          <div className="lg:px-8">
            {mycontests.map((contestId, index) => (
              <MyContestCard key={index} contestId={contestId} idx={index} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-center">
            Yet you have not joined any contests.
          </p>
        )}
      </ScrollArea>
    </div>
  );
};

export default page;
