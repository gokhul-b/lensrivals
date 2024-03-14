import React from "react";

const UpcomingCard = ({ contest, idx }) => {
  const { title, description, startDate, endDate, prize1, prize2, prize3 } =
    contest;
  return (
    <div className="space-y-2 mb-4 border p-4 rounded-xl bg-gray-900 text-white">
      <p className="text-xs text-muted-foreground">#{idx + 1} </p>
      <p>
        Title: <span className="text-muted-foreground">{title}</span>
      </p>
      <p className="text-sm">
        Description:{" "}
        <span className="text-muted-foreground">{description}</span>
      </p>
      <div className="flex space-x-4 text-sm">
        <p>
          Start date: <span className="text-muted-foreground">{startDate}</span>
        </p>
        <p>
          Last date: <span className="text-muted-foreground">{endDate}</span>
        </p>
      </div>
      <div className="flex space-x-4 text-sm">
        <p>
          First: <span className="text-muted-foreground">₹ {prize1}</span>
        </p>
        <p>
          Second: <span className="text-muted-foreground">₹ {prize2}</span>
        </p>
        <p>
          Third: <span className="text-muted-foreground">₹ {prize3}</span>
        </p>
      </div>
    </div>
  );
};

export default UpcomingCard;
