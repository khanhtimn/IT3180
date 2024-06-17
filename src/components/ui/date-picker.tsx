"use client";
import { format, parse, isValid } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { forwardRef } from "react";

export const DatePicker = forwardRef<
  HTMLDivElement,
  {
    date?: string;
    setDate: (date?: string) => void;
    className?: string;
    disabled?: boolean;
  }
>(function DatePickerCmp({ date, setDate, className, disabled }, ref) {
  const handleDateChange = (selectedDate?: Date) => {
    if (selectedDate) {
      setDate(format(selectedDate, "yyyy-MM-dd"));
    } else {
      setDate(undefined);
    }
  };

  const parsedDate = date ? parse(date, "yyyy-MM-dd", new Date()) : undefined;
  const isValidDate = parsedDate && isValid(parsedDate);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            disabled && "pointer-events-none",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {isValidDate ? format(parsedDate, "dd/MM/yyyy") : <span>Chọn thời điểm...</span>}
        </Button>
      </PopoverTrigger>
      {!disabled && (
        <PopoverContent className="w-auto p-0" ref={ref}>
          <Calendar
            mode="single"
            selected={parsedDate}
            onSelect={handleDateChange}
            initialFocus
          />
        </PopoverContent>
      )}
    </Popover>
  );
});
