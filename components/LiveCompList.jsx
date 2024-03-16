import ContestCard from "./ContestCard";
import { ScrollArea } from "@/components/ui/scroll-area";

const LiveCompList = ({ contestList }) => {
  const contests = contestList.compList;
  //console.log(contests);
  return (
    <div>
      <ScrollArea className="lg:h-screen sm:h-full lg:w-[800px] sm:w-[360px] rounded-md px-1 relative">
        <p className="py-3 font-semibold text-sm lg:text-base text-center lg:mb-8 mb-4 bg-indigo-700 text-white mt-1 sticky top-1">
          Live contests
        </p>
        {contests.length > 0 ? (
          <div className="lg:px-8 px-1">
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
