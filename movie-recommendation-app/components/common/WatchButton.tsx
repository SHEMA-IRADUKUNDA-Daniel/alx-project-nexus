import React from "react";
import { WatchButtonProp } from "@/interfaces";
export default function WatchButton({
  title,
  onClick,
  className,
}: WatchButtonProp) {
  return (
    <button className={className} onClick={onClick}>
      {title}
    </button>
  );
}
