import React from "react";

interface BellIconProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  fill?: string;
}

export const BellIcon: React.FC<BellIconProps> = ({
  className,
  width = 20,
  height = 20,
  fill,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 20"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_1515_2017)">
        <path d="M1.09121 16.3467H14.7576C15.4412 16.3467 15.8554 15.9357 15.8554 15.3231C15.8554 14.3519 15.014 13.5002 14.2974 12.6485C13.6532 11.864 13.5547 10.2652 13.4429 8.89802C13.3311 5.49121 12.47 3.08555 10.281 2.24131C9.99179 0.963766 9.13065 0 7.92771 0C6.72473 0 5.86358 0.963766 5.57437 2.24131C3.38537 3.08555 2.52424 5.49121 2.41249 8.89802C2.30074 10.2652 2.20214 11.864 1.55793 12.6485C0.834839 13.5002 0 14.3519 0 15.3231C0 15.9357 0.414133 16.3467 1.09121 16.3467ZM7.92771 20C9.32786 20 10.327 18.8495 10.4651 17.5346H5.39031C5.52178 18.8495 6.52752 20 7.92771 20Z" />
      </g>
      <defs>
        <clipPath id="clip0_1515_2017">
          <rect width="16" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
