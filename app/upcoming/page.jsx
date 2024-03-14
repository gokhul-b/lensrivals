import React from "react";
import { getUpcomingContest } from "../action";
import UpcomingCard from "@/components/UpcomingCard";
import { ScrollArea } from "@/components/ui/scroll-area";

const page = async () => {
  const contests = await getUpcomingContest();
  return (
    <div>
      <ScrollArea className="h-screen w-[800px] rounded-md px-1 relative">
        <p className="py-3 font-semibold text-base text-center mb-8 bg-indigo-700 text-white sticky top-1 z-10">
          Upcoming Contests
        </p>
        <div className="px-8">
          {contests.map((contest, index) => (
            <UpcomingCard key={contest.id} contest={contest.data} idx={index} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default page;
