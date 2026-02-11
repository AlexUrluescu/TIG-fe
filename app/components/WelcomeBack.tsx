"use client";

import { Button, Input } from "antd";
import Image from "next/image";
import React from "react";

interface WelcomeHeaderProps {
  username: string;
}

export function WelcomeHeader({ username }: WelcomeHeaderProps) {
  return (
    <div
      style={{
        // background: "red",
        display: "flex",
        justifyContent: "space-between",
      }}
      className="mb-5"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
        }}
      >
        <div className="text-xs sm:text-sm text-[#333F49] mb-1">
          Welcome back,
        </div>
        <div className="text-xl sm:text-2xl md:text-[26px] font-bold text-[#333F49]">
          {username}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Input
          style={{ background: "#F7F7F8", borderRadius: 26 }}
          placeholder="Search"
        />
        <Button
          style={{
            border: "none",
            boxShadow: "none",
            padding: 0,
          }}
        >
          <Image
            src={"/plus-circle.svg"}
            height={34}
            width={34}
            alt="plus-circle-icon"
          />
        </Button>
      </div>
    </div>
  );
}
