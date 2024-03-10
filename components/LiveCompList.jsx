import ContestCard from "./ContestCard";
import { ScrollArea } from "@/components/ui/scroll-area";

const LiveCompList = ({ contestList }) => {
  const contests = contestList.compList;
  // console.log(contests);
  return (
    <div>
      <ScrollArea className="h-screen  w-[720px] rounded-md p-4">
        <p className="font-bold text-2xl text-center mb-8">Live Contests</p>
        <div className="px-8">
          {contests.map((contest) => (
            <ContestCard
              key={contest.id}
              contest={contest.data}
              id={contest.id}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default LiveCompList;
