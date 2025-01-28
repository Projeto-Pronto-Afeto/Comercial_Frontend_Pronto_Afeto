"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const SearchFilter = ({
  placeholder = "Buscar...",
  baseRoute = "",
  queryParam = "search",
}: {
  placeholder?: string;
  baseRoute: string;
  queryParam?: string;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const query = searchTerm ? `?${queryParam}=${searchTerm}` : "";
    router.push(`/${baseRoute}${query}`);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center gap-2 border rounded-lg p-2 max-h-14 max-w-lg bg-white">
      <Search className="text-gray-500" onClick={handleSearch}/>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder={placeholder}
        className="outline-none w-full"
      />
    </div>
  );
};

export default SearchFilter;
