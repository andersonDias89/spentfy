import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import clsx from "clsx";
import React from "react";

interface CustomDropdownProps {
  label?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export const CustomDropdown = ({
  label,
  error,
  children,
  className,
}: CustomDropdownProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm text-gray-400 mb-1 ml-1">{label}</label>
      )}
      <Select.Root>
        <Select.Trigger
          className={clsx(
            "flex items-center px-4 py-3 rounded-xl border transition-all",
            "bg-[#1e1e2f] text-white focus-within:ring-2",
            error
              ? "border-red-400 focus-within:ring-red-500"
              : "border-gray-600 focus-within:ring-blue-500",
            className
          )}
        >
          <Select.Value />
          <Select.Icon>
            <ChevronDown className="text-gray-400" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className={clsx(
              "overflow-hidden bg-[#1e1e2f] rounded-xl border border-gray-600",
              "shadow-lg"
            )}
          >
            <Select.ScrollUpButton className="flex items-center justify-center py-2 text-gray-400">
              <ChevronUp />
            </Select.ScrollUpButton>
            <Select.Viewport className="p-2">{children}</Select.Viewport>
            <Select.ScrollDownButton className="flex items-center justify-center py-2 text-gray-400">
              <ChevronDown />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      {error && (
        <span className="text-xs text-red-400 mt-1 ml-1 block">{error}</span>
      )}
    </div>
  );
};

interface CustomDropdownItemProps {
  children: React.ReactNode;
  value: string;
}

export const CustomDropdownItem = ({
  children,
  value,
}: CustomDropdownItemProps) => {
  return (
    <Select.Item
      value={value}
      className={clsx(
        "flex items-center px-4 py-2 rounded-lg cursor-pointer",
        "hover:bg-gray-600 transition-colors",
        "data-[highlighted]:bg-gray-600"
      )}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="ml-auto text-gray-400">
        <Check size={16} />
      </Select.ItemIndicator>
    </Select.Item>
  );
};
