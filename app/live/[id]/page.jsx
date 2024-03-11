import React from "react";
import { auth, currentUser } from "@clerk/nextjs";
import JoinContestForm from "@/components/JoinContestForm";
import Link from "next/link";

const page = async ({ params }) => {
  const { userId } = auth();
  const user = await currentUser();
  console.log(params.id);

  return (
    <div className="py-8 px-8 space-y-8">
      <JoinContestForm
        contestId={params.id}
        username={user.username}
        userId={userId}
      />
    </div>
  );
};

export default page;
