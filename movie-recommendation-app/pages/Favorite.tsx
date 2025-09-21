import React from "react";
import Image from "next/image";
export default function Favorite() {
  return (
    <main className=" max-w-7xl mx-auto px-6 ">
      <h2 className="py-10 text-xl font-bold">Favorite</h2>
      <div className=" my-2 mx-2 max-w-40 relative">
        <Image
          src="/movie.jpg"
          alt="poster"
          width={200}
          height={250}
          className="object-fill rounded-sm"
        />
        <p className="absolute top-1 right-1 bg-white rounded-sm text-xs p-1">
          HD
        </p>
        <p className="absolute top-1 left-1 bg-red-500 rounded-sm text-xs py-1 px-3 font-bold cursor-pointer text-white">
          X
        </p>
        <h2 className=" font-bold text-black mt-3">The Dark Knight</h2>
        <div className="flex gap-2 text-xs  text-gray-900 font-medium items-center mt-3">
          <p>2008</p>
          <p>-</p>
          <p>157 min</p>
        </div>
      </div>
    </main>
  );
}
