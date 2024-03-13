import Link from "next/link";

const ContestCard = ({ id, contest }) => {
  const { title, description, startDate, endDate, prize1, prize2, prize3 } =
    contest;
  //console.log(contest);
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-8 border">
      <div className="md:flex">
        <div className="w-full p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold flex items-center justify-between">
            <p>#{id}</p>
            <div className="bg-indigo-700 px-3 py-2.5 rounded-md text-white text-xs hover:bg-indigo-500">
              <Link href={`live/${id}`}>Join Contest</Link>
            </div>
          </div>
          <p className="mt-2">
            Title: <span className="text-muted-foreground">{title}</span>
          </p>
          <p className="mt-2">
            Description:{" "}
            <span className="text-muted-foreground ">{description}</span>
          </p>
          <div className="flex mt-2 space-x-6">
            <div>
              <span className="">Start Date: </span>
              <span className="text-muted-foreground">{startDate}</span>
            </div>
            <div>
              <span className="">End Date: </span>
              <span className="text-muted-foreground">{endDate}</span>
            </div>
          </div>
          <div className="mt-2">
            <p className="">Prizes:</p>
            <p className=" text-muted-foreground">
              First place: ₹{prize1}, Second place: ₹{prize2}, Third place: ₹
              {prize3}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;
