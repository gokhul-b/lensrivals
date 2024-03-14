"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "count",
    header: "Participants",
  },
  {
    accessorKey: "first",
    header: "First",
  },
  {
    accessorKey: "second",
    header: "Second",
  },
  {
    accessorKey: "third",
    header: "Third",
  },
];
