"use client";

import { Button } from "antd";

export default function LoginButton() {
  return (
    <Button onClick={() => console.log("test")} type="primary">
      Login
    </Button>
  );
}
