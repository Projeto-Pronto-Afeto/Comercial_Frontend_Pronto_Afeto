"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { TbArrowDown, TbArrowUp, TbCalendar } from "react-icons/tb";

const DateFilter = ({
  baseRoute = "",
  queryParam = "direction",
}: {
  baseRoute: string;
  queryParam?: string;
}) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const router = useRouter();

  const handleSortChange = (order: "asc" | "desc") => {
    setSortOrder(order);
    router.push(`${baseRoute}?${queryParam}=${order}`);
  };

  return  (
  
   
      <Button variant='outline' className="flex items-center gap-2 text-gray-600" onClick={() => handleSortChange(sortOrder === "asc" ? "desc" : "asc")}>
        <TbCalendar className="w-6 h-6" />
        {sortOrder === "asc" ? ('Mais antigos'):("Mais recentes")}
      </Button>
       

  
  );
};

export default DateFilter;
