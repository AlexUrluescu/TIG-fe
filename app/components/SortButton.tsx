"use client";

import React from "react";

interface SortButtonProps {
  sortOrder: "newest" | "oldest";
  onToggle: () => void;
  className?: string;
}

export const SortButton: React.FC<SortButtonProps> = ({
  sortOrder,
  onToggle,
  className = "",
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex mr-1 cursor-pointer items-center gap-1 text-[14px] font-normal leading-none tracking-[-0.3px] text-[#454545] ${className}`}
    >
      <span className="font-medium">Sort by</span>{" "}
      <span className="font-bold">
        {sortOrder === "newest" ? "Newest" : "Oldest"}
      </span>
      <span
        aria-hidden="true"
        className="flex items-center justify-center"
        style={{ width: 8, height: 5 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="5"
          viewBox="0 0 8 5"
          fill="none"
          style={{
            transform:
              sortOrder === "newest" ? "rotate(0deg)" : "rotate(180deg)",
            transition: "transform 0.15s ease-out",
          }}
        >
          <path
            d="M0.5 0.5L4 4L7.5 0.5"
            stroke="#808181"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
};
