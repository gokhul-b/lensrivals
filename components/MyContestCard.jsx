"use client";
import { getContestById } from "@/app/action";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

const MyContestCard = ({ contestId, idx }) => {
  const [contestData, setContestData] = useState({});
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
    <div className="w-[640px] border p-4 rounded-xl space-y-6 bg-gray-800 text-white mb-4">
      <div className="flex justify-between items-end">
        <p className="text-lg font-semibold">
          <span className="text-xs text-muted-foreground ">#{idx + 1} </span>
          {title}
        </p>
        <Button variant="outline" size="sm" className="text-xs text-gray-900">
          Leaderboard
        </Button>
      </div>
      <div className="flex items-end justify-between">
        <div className="flex space-x-4 text-sm font-semibold text-gray-800">
          <div className="bg-[#FFD43B] px-3 py-1 rounded-lg">
            <p>₹ {prize1}</p>
          </div>
          <div className="bg-[#C0C0C0] px-3 py-1 rounded-lg">
            <p>₹ {prize2}</p>
          </div>
          <div className="bg-[#CD7F32] px-3 py-1 rounded-lg">
            <p>₹ {prize3}</p>
          </div>
        </div>

        <div className="flex space-x-4">
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
