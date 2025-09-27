import React from "react";
import { ButtonProp } from "@/interfaces";
export default function Button({
  className,
  title,
  onClick,
  rightContent,
}: ButtonProp) {
  return (
    <button className={className} onClick={onClick}>
      {rightContent && <span>{rightContent}</span>}
      {title}
    </button>
  );
}
