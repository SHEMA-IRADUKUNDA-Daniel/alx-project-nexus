import React from "react";
import { SearchProps } from "@/interfaces";

export default function Search({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  rightContent,
}: SearchProps) {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full bg-white text-gray-900 placeholder-gray-400 pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {rightContent && (
        <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer">
          {rightContent}
        </span>
      )}
    </div>
  );
}
