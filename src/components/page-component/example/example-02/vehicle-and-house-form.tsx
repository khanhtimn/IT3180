"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

type VehicleType = Record<"value" | "label", string>;

const VEHICLES = [
  {
    value: "car",
    label: "Xe ôtô",
  },
  {
    value: "motorcycle",
    label: "Xe môtô/ xe gắn máy",
  },
  {
    value: "bicycle",
    label: "Xe đạp",
  },
  {
    value: "none",
    label: "Không có",
  },
] satisfies VehicleType[];

export function VehicleAndHouseForm() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<VehicleType[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const [houseArea, setHouseArea] = React.useState("");
  const [internet, setInternet] = React.useState("");
  const [electricity, setElectricity] = React.useState("");
  const [water, setWater] = React.useState("");
  const [notes, setNotes] = React.useState("");

  const handleUnselect = React.useCallback((vehicle: VehicleType) => {
    setSelected((prev) => prev.filter((s) => s.value !== vehicle.value));
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

  const selectables = VEHICLES.filter((vehicle) => {
    if (selected.some((s) => s.value === "none")) {
      // If "none" is selected, hide all other options
      return vehicle.value === "none";
    }
    // Hide already selected vehicles and "none" if any other option is selected
    return !selected.some((s) => s.value === vehicle.value) && vehicle.value !== "none";
  });

  return (
    <div className="space-y-4">
      <label htmlFor="houseArea" className="block text-sm font-medium text-black-700">
        Chọn phương tiện:
      </label>
      <Command
        onKeyDown={handleKeyDown}
        className="overflow-visible bg-transparent"
      >
        <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <div className="flex flex-wrap gap-1">
            {selected.map((vehicle) => (
              <Badge key={vehicle.value} variant="secondary">
                {vehicle.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(vehicle);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(vehicle)}
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
              placeholder="Chọn phương tiện..."
              className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>
        <div className="relative mt-2">
          {open && selectables.length > 0 ? (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((vehicle) => (
                  <CommandItem
                    key={vehicle.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      setInputValue("");
                      setSelected((prev) => [...prev, vehicle]);
                    }}
                    className="cursor-pointer"
                  >
                    {vehicle.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          ) : null}
        </div>
      </Command>
      <label htmlFor="houseArea" className="block text-sm font-medium text-black-700">
        Nhập diện tích nhà:
      </label>
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <input
          type="number"
          id="houseArea"
          value={houseArea}
          onChange={(e) => setHouseArea(e.target.value)}
          placeholder="e.g. 120"
          className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
        />
      </div>
      <label htmlFor="internet" className="block text-sm font-medium text-black-700">
        Internet:
      </label>
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <input
          type="text"
          id="internet"
          value={internet}
          onChange={(e) => setInternet(e.target.value)}
          placeholder="e.g. 50 Mbps"
          className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
        />
      </div>
      <label htmlFor="electricity" className="block text-sm font-medium text-black-700">
        Điện:
      </label>
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <input
          type="text"
          id="electricity"
          value={electricity}
          onChange={(e) => setElectricity(e.target.value)}
          placeholder="e.g. 220V"
          className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
        />
      </div>
      <label htmlFor="water" className="block text-sm font-medium text-black-700">
        Nước:
      </label>
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <input
          type="text"
          id="water"
          value={water}
          onChange={(e) => setWater(e.target.value)}
          placeholder="e.g. 100 liters/day"
          className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
        />
      </div>
      <label htmlFor="notes" className="block text-sm font-medium text-black-700">
        Ghi chú thêm:
      </label>
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Ghi chú..."
          className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
        />
      </div>
      <div className="flex justify-end">
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
          Xác nhận
        </button>
      </div>
    </div>
  );
}
