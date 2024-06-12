// components/page-component/example/example-02/ApartmentSelector.tsx
"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Apartment = Record<"value" | "label", string>;

const APARTMENTS = [
  { value: "101", label: "Phòng 101" },
  { value: "102", label: "Phòng 102" },
  { value: "103", label: "Phòng 103" },
  { value: "201", label: "Phòng 201" },
  { value: "202", label: "Phòng 202" },
  { value: "203", label: "Phòng 203" },
  // Thêm các phòng khác nếu cần
] satisfies Apartment[];

export function ApartmentSelector() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Apartment[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const router = useRouter();

  const handleUnselect = React.useCallback((apartment: Apartment) => {
    setSelected((prev) => prev.filter((s) => s.value !== apartment.value));
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  const selectables = APARTMENTS.filter(
    (apartment) =>
      !selected.some((slect_apartment) => apartment.value === slect_apartment.value)
  );

  const handleConfirm = () => {
    // Điều hướng đến trang VehicleAndHouseForm
    router.push("/example/example-02/vehicle-and-house-form");
  };

  return (
    <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((apartment) => {
            return (
              <Badge key={apartment.value} variant="secondary">
                {apartment.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(apartment);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(apartment)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Chọn phòng chung cư..."
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 ? (
          <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              {selectables.map((apartment) => {
                return (
                  <CommandItem
                    key={apartment.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={(value) => {
                      setInputValue("");
                      setSelected((prev) => [...prev, apartment]);
                    }}
                    className={"cursor-pointer"}
                  >
                    {apartment.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
        ) : null}
      </div>
        <div className="flex justify-end">
      <Button onClick={handleConfirm} className="ml-auto">
        Xác nhận
      </Button>
        </div>
    </Command>
  );
}
