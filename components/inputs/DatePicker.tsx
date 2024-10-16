import React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ptBR } from "date-fns/locale";
import { Control } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { LuCalendar } from "react-icons/lu";

interface DatePickerProps {
  field: any;
  placeholder?: string;
}

const DatePicker = ({ placeholder, field }: DatePickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "w-72 text-left rounded-xl bg-background px-3 py-2 text-sm",
            !field.value && "text-muted-foreground"
          )}
        >
          {field.value ? (
            format(field.value, "dd 'de' MMMM 'de' yyyy", {
              locale: ptBR,
            })
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 bg-white dark:bg-dark-400"
        align="start"
      >
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          captionLayout="dropdown"
          fromYear={1960}
          toYear={2030}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
          showOutsideDays={false}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
