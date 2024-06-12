// components/page-component/example/example-02/ApartmentSelector.tsx
"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api"; // Đảm bảo import đúng module

type Apartment = {
  apartmentNo: number;
};

export function ApartmentSelector() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Apartment[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const router = useRouter();

  const { data: apartments = [], isLoading } = api.resident.getApartmentsWithResidents.useQuery();

  const handleUnselect = React.useCallback((apartment: Apartment) => {
    setSelected((prev) => prev.filter((s) => s.apartmentNo !== apartment.apartmentNo));
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

  const selectables = apartments.filter(
    (apartment) => !selected.some((s) => s.apartmentNo === apartment.apartmentNo)
  );

  const handleConfirm = () => {
    // Điều hướng đến trang VehicleAndHouseForm
    router.push("/example/example-02/vehicle-and-house-form");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
        <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <div className="flex flex-wrap gap-1">
            {selected.map((apartment) => (
              <Badge key={apartment.apartmentNo} variant="secondary">
                {`Phòng ${apartment.apartmentNo}`}
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
            ))}
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
                {selectables.map((apartment) => (
                  <CommandItem
                    key={apartment.apartmentNo}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      setInputValue("");
                      setSelected((prev) => [...prev, apartment]);
                    }}
                    className="cursor-pointer"
                  >
                    {`Phòng ${apartment.apartmentNo}`}
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          ) : null}
        </div>
      </Command>
      <div className="flex justify-end">
        <Button size="sm" onClick={handleConfirm}>
          Xác nhận
        </Button>
      </div>
    </div>
  );
}
