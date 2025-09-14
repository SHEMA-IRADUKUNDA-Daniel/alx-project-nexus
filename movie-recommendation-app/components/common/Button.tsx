import React from "react";
import { ButtonProp } from "@/interfaces";
export default function Button({ className, title, onClick }: ButtonProp) {
  return (
    <button className={className} onClick={onClick}>
      {title}
    </button>
  );
}
