import Link from "next/link";
import React from "react";

export default function Story() {
  return (
    <div className="min-h-svh w-full bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 text-white text-center flex flex-col items-center justify-center">
      <div className="text-lg md:text-xl p-2">Coming Soon!</div>
      <Link
        href={"/reading"}
        className="px-4 py-2 rounded-full bg-white text-black"
      >
        Back
      </Link>
    </div>
  );
}
