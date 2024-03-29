import React from "react";
import { auth, currentUser } from "@clerk/nextjs";
import JoinContestForm from "@/components/JoinContestForm";
import Link from "next/link";

const page = async ({ params }) => {
  const { userId } = auth();
  const user = await currentUser();

  return (
    <div className="lg:p-8 p-1 space-y-8">
      <JoinContestForm
        contestId={params.id}
        username={user.username}
        userId={userId}
      />
    </div>
  );
};

export default page;
