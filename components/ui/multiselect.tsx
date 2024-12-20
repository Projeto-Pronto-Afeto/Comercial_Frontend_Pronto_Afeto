import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Control, UseFormGetValues, UseFormSetValue } from "react-hook-form";
import useDropdown from "@/hooks/useDropdown";
import { LuSearch, LuX } from "react-icons/lu";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Option {
  key: number;
  value: string;
}

interface MultiSelectProps {
  getValues: UseFormGetValues<any>;
  setValue: UseFormSetValue<any>;
  name: string;
  options: Option[];
  placeholder: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  getValues,
  setValue,
  name,

  placeholder,
  options,
}) => {
  const [selectedItems, setSelectedItems] = React.useState<Option[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedValues = getValues(name);
    if (savedValues) {
      const savedOptions = options.filter((option) =>
        savedValues.includes(option.key)
      );
      // Só atualiza se os itens realmente mudaram
      if (
        savedOptions.length !== selectedItems.length ||
        !savedOptions.every(
          (item, index) => item.key === selectedItems[index]?.key
        )
      ) {
        setSelectedItems(savedOptions);
      }
    }
  }, [getValues, name, options, selectedItems, setSelectedItems]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredOptions = options.filter((option) =>
    option.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const {
    isOpen,
    isContentVisible,
    toggleDropdown,
    dropdownRef,
    setIsContentVisible,
  } = useDropdown();

  const toggleSelection = (item: Option) => {
    const index = selectedItems.findIndex(
      (selectedItem) => selectedItem.key === item.key
    );
    const newSelectedItems = [...selectedItems];
    if (index > -1) {
      newSelectedItems.splice(index, 1); // Remove item if already selected
    } else {
      newSelectedItems.push(item); // Add item if not selected
    }
    setSelectedItems(newSelectedItems);

    setValue(
      name,
      newSelectedItems.map((item) => item.key)
    );

    console.log(getValues(name));
  };

  return (
    <div ref={dropdownRef} className="relative">
      <FormControl>
        <div onClick={toggleDropdown}>
          <div className="relative">
            <LuSearch className="absolute top-[0.70rem] left-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={placeholder}
              value={searchTerm}
              onChange={handleSearchChange}
              className="px-10 flex h-10 w-full rounded-xl border border-[#E9E9E9] bg-background py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-yellow-400 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
      </FormControl>
      {isContentVisible && (
        <div
          className={` dropdown-content bg-white z-50 max-h-50  overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 absolute w-full transition-opacity duration-100 ${
            isOpen ? "opacity-100" : "opacity-0"
          } ${isContentVisible ? "visible" : "invisible"}`}
          onTransitionEnd={() => !isOpen && setIsContentVisible(false)}
        >
          {filteredOptions.map((option, index) => (
            <div
              key={option.key}
              onClick={() => toggleSelection(option)}
              className={`relative m-2 flex hover:bg-yellow-50 cursor-default select-none items-center rounded-sm py-1.5 px-3 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 
               `}
            >
              <span className="flex h-3.5 w-3.5 mr-3  items-center justify-center">
                {selectedItems.some((item) => item.key === option.key) && (
                  <Check className="h-4 w-4 text-yellow-600" />
                )}
              </span>
              {option.value}
            </div>
          ))}
        </div>
      )}
      <div className="mt-2">
        {selectedItems.map((item) => (
          <Badge key={item.key} variant={"outline"} className="mr-2 mb-2">
            {item.value}
            <LuX
              className="h-3 w-3 ml-1 text-slate-400"
              onClick={() => toggleSelection(item)}
            />
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default MultiSelect;
