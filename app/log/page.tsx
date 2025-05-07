import { BookText, Film, Tv } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="flex flex-col gap-20 justify-center items-center min-h-[calc(100vh-4rem)]">
      <div>
        <h2 className="text-5xl font-bold">What do you want to log?</h2>
      </div>
      <div className="flex gap-20">
        {items.map((item) => (
          <Link href={item.url} key={item.url}>
            <item.icon className="size-12" />
          </Link>
        ))}
      </div>
    </div>
  );
}

const items = [
  {
    icon: BookText,
    url: "/log/books",
  },
  {
    icon: Film,
    url: "/log/movies",
  },
  {
    icon: Tv,
    url: "/log/series",
  },
];
