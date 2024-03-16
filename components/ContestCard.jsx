import Link from "next/link";

const ContestCard = ({ id, contest }) => {
  const { title, description, startDate, endDate, prize1, prize2, prize3 } =
    contest;
  //console.log(contest);
  return (
    <div className="w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-8 border">
      <div className="">
        <div className="w-full lg:p-8 p-2">
          <div className=" lg:text-sm text-xs text-indigo-500 font-semibold flex items-center justify-between">
            <p className="uppercase tracking-wide">#{id}</p>
            <div className="bg-indigo-700 lg:px-3 lg:py-2.5 px-2 py-1 rounded-md text-white hover:bg-indigo-500">
              <Link href={`live/${id}`} className="lg:text-sm text-xs">
                Join Contest
              </Link>
            </div>
          </div>
          <div className="lg:text-base text-xs">
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
    </div>
  );
};

export default ContestCard;
