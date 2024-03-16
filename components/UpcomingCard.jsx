import React from "react";

const UpcomingCard = ({ contest, idx }) => {
  const { title, description, startDate, endDate, prize1, prize2, prize3 } =
    contest;
  return (
    <div className="space-y-2 mb-4 border p-4 rounded-xl bg-gray-900 text-white lg:text-base text-sm">
      <p className="text-xs text-muted-foreground">#{idx + 1} </p>
      <p>
        Title: <span className="text-slate-300">{title}</span>
      </p>
      <p className="lg:text-sm text-xs">
        Description: <span className="text-slate-300">{description}</span>
      </p>
      <div className="flex space-x-4 lg:text-sm text-xs">
        <p>
          Start date: <span className="text-slate-300">{startDate}</span>
        </p>
        <p>
          Last date: <span className="text-slate-300">{endDate}</span>
        </p>
      </div>
      <div className="flex space-x-4 lg:text-sm text-xs">
        <p>
          First: <span className="text-slate-300">₹ {prize1}</span>
        </p>
        <p>
          Second: <span className="text-slate-300">₹ {prize2}</span>
        </p>
        <p>
          Third: <span className="text-slate-300">₹ {prize3}</span>
        </p>
      </div>
    </div>
  );
};

export default UpcomingCard;
