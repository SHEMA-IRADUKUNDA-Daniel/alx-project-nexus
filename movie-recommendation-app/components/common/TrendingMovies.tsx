"use client";
import useMovieStore from "./store";
import React from "react";
import Image from "next/image";

import Link from "next/link";
export default function MovieCard() {
  const movies = useMovieStore((state) => state.movies);
  console.log(movies);

  return (
    <div className="flex flex-wrap justify-center sm:justify-start">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className=" my-2 mx-2 max-w-40  relative cursor-pointer "
        >
          <Link href={`/movie/${movie.id}`} className="relative  group">
            <Image
              src={movie.image}
              alt="poster"
              width={200}
              height={250}
              className="object-fill  rounded-sm"
            />
            <p className="absolute top-1 right-1 bg-yellow-300  font-bold rounded-sm text-xs p-1">
              {movie.quality}
            </p>
            <div className="absolute  inset-0 hidden group-hover:flex items-center justify-center">
              <Image
                src="/PlayButton.svg"
                alt="Play"
                width={40}
                height={40}
                className="pointer-events-none"
              />
            </div>
          </Link>
          <h2 className=" font-bold text-gray-800 mt-3">{movie.title}</h2>
          <div className="flex gap-2 text-xs  text-gray-700 font-medium items-center mt-3">
            <p>{movie.year}</p>
            <p>-</p>
            <p>{movie.duration} min</p>
          </div>
        </div>
      ))}
    </div>
  );
}
