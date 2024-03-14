"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export const participantColumns = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "likesCnt",
    header: "Likes Count",
  },
  {
    accessorKey: "commentsCnt",
    header: "Comments Count",
  },
  {
    accessorKey: "totalCredit",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Credit
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
