"use client";
import { getContestById } from "@/app/action";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const MyContestCard = ({ contestId, idx }) => {
  const [contestData, setContestData] = useState({});
  const router = useRouter();

  useEffect(() => {
    const getContestData = async () => {
      try {
        const ContestData = await getContestById(contestId);
        console.log(ContestData);
        setContestData(ContestData);
      } catch (error) {
        console.error(error);
      }
    };
    getContestData();
  }, []);
  const { title, description, startDate, endDate, prize1, prize2, prize3 } =
    contestData;
  return (
    <div className="lg:w-[640px] sm:w-[360px] border p-4 rounded-xl lg:space-y-6 space-y-3 bg-gray-800 text-white mb-4">
      <div className="flex justify-between items-end">
        <p className="text-lg font-semibold">
          <span className="text-xs text-muted-foreground ">#{idx + 1} </span>
          {title}
        </p>
        <Button
          variant="outline"
          className="text-xs text-gray-900"
          onClick={(e) => {
            router.push(`/leaderboard/${contestId}`);
          }}
          size="sm"
        >
          Leaderboard
        </Button>
      </div>
      <div className="lg:flex lg:items-end lg:justify-between">
        <div className="flex space-x-4 lg:text-sm text-xs font-semibold text-gray-800">
          <div className="bg-[#FFD43B] px-1.5 py-1 rounded-lg">
            <p>₹ {prize1}</p>
          </div>
          <div className="bg-[#C0C0C0] px-3 py-1 rounded-lg">
            <p>₹ {prize2}</p>
          </div>
          <div className="bg-[#CD7F32] px-3 py-1 rounded-lg">
            <p>₹ {prize3}</p>
          </div>
        </div>

        <div className="flex space-x-4 lg:mt-0 mt-2">
          <p className="text-xs">
            <span className=" text-muted-foreground">Start Date: </span>
            {startDate}
          </p>
          <p className="text-xs">
            <span className=" text-muted-foreground">Last Date: </span>
            {endDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyContestCard;
