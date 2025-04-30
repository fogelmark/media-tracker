"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DescriptionDropdownProps {
  description: string;
}

export default function DescriptionDropdown({
  description,
}: DescriptionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <h3 className="font-semibold mb-1">Description</h3>
      <div
        className={cn("relative h-10 overflow-hidden flex flex-col gap-4", {
          "h-fit": isOpen,
        })}
      >
        {!isOpen && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ash-surface" />
        )}
        {description.split(/\n\n/).map((line: string, index: number) => (
          <div key={index}>
            <p className="text-neutral-200">{line}</p>
          </div>
        ))}
      </div>
      <Button
        onClick={handleToggle}
        className="p-0 h-9 flex text-neutral-200"
        variant="link"
      >
        {isOpen ? "Show less" : "Show more"}
        <ChevronDown
          className={cn("transition-transform duration-200", {
            "rotate-180": isOpen,
          })}
        />
      </Button>
    </div>
  );
}
