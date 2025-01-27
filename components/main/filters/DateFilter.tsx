"use client";

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
    <div className="flex items-center gap-2  border rounded-lg p-1 shadow bg-white">
      {/* Ícone e Título */}
      <div className="flex items-center gap-2 text-gray-600">
        <TbCalendar className="w-7 h-7" />
      </div>
        <div className="flex items-center gap-2">
        <button
            onClick={() => handleSortChange("asc")}
            className={`flex items-center justify-center bg-gray-100 p-1 border border-gray-400 rounded-lg shadow ${
            sortOrder === "asc" ? "bg-violet-200 text-blue-700" : "bg-white hover:bg-violet-50"
            }`}
        >
            <TbArrowUp className="w-5 h-5" />
        </button>
        <button
            onClick={() => handleSortChange("desc")}
            className={`flex items-center justify-center bg-gray-100 p-1 border border-gray-400 rounded-lg shadow ${
            sortOrder === "desc" ? "bg-violet-100 text-blue-700" : "bg-white hover:bg-violet-50"
            }`}
        >
            <TbArrowDown className="w-5 h-5" />
        </button>  
        </div>

    </div>
  );
};

export default DateFilter;
