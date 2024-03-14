import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getLiveCompList } from "../action";
import { Separator } from "@/components/ui/separator";

const page = async () => {
  const contestList = await getLiveCompList();
  let data = [];
  if (contestList.length > 0) {
    contestList.forEach((doc) => {
      let docData = doc.data;
      data.push({
        id: doc.id,
        title: docData.title,
        count: docData.participants.length,
        first: "₹ " + docData.prize1,
        second: "₹ " + docData.prize2,
        third: "₹ " + docData.prize3,
      });
    });
  }
  // console.log(data);
  return (
    <div className="py-8 px-8">
      <p className="font-semibold text-xl text-gray-800">Leaderboard</p>
      <div className="mt-4">
        <Separator />
      </div>
      <div className="max-w-5xl">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default page;
