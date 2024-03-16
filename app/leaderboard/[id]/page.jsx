import { getPostData } from "@/app/action";
import React from "react";
import { DataTable } from "./participant-table";
import { participantColumns } from "./participant-columns";
import { Separator } from "@/components/ui/separator";

const page = async ({ params }) => {
  const contestId = params.id;
  const postData = await getPostData(contestId);
  return (
    <div className="lg:p-8 p-2">
      <p className="font-semibold text-base text-gray-800">
        Contest Id:{" "}
        <span className="text-muted-foreground text-sm">#{contestId}</span>
      </p>
      <div className="mt-4">
        <Separator />
      </div>
      <div className="max-w-5xl">
        <DataTable columns={participantColumns} data={postData} />
      </div>
    </div>
  );
};

export default page;
