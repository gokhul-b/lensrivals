import ContestCard from "./ContestCard";
import { ScrollArea } from "@/components/ui/scroll-area";

const LiveCompList = ({ contestList }) => {
  const contests = contestList.compList;
  //console.log(contests);
  return (
    <div>
      <ScrollArea className="h-screen  w-[800px] rounded-md px-1 relative">
        <p className="py-3 font-semibold text-base text-center mb-8 bg-indigo-700 text-white mt-1 sticky top-1">
          Live contests
        </p>
        {contests.length > 0 ? (
          <div className="px-8">
            {contests.map((contest) => (
              <ContestCard
                key={contest.id}
                contest={contest.data}
                id={contest.id}
              />
            ))}
          </div>
        ) : (
          <p className="text-center font-semibold text-lg">No Live Contests</p>
        )}
      </ScrollArea>
    </div>
  );
};

export default LiveCompList;
