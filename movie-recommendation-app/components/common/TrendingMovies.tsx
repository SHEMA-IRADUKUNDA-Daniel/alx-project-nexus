"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { easyApi } from "@/lib/tmdb";
// import { Movie } from "@/interfaces";
import { useState, useEffect } from "react";
import { Movie } from "@/interfaces";
export default function MovieCard() {
  // const movies = useMovieStore((state) => state.movies);
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const apiMovies = await easyApi.getNowPlayingMovies();
        setMovies(apiMovies);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load movies:", error);
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  if (loading) return <div>Loading movies...</div>;
  console.log(movies);

  return (
    <div className="flex flex-wrap justify-center sm:justify-start">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className=" my-2 mx-2 md:max-w-45 max-w-40 relative cursor-pointer "
        >
          <Link href={`/movie/${movie.id}`} className="relative  group">
            <Image
              src={movie.image}
              alt="poster"
              width={200}
              height={250}
              className="object-fill  rounded-sm"
            />
            <p className="absolute top-2 right-2 flex items-center gap-1 bg-black bg-opacity-70 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-yellow-400"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25l2.955 6.066 6.695.974-4.845 4.72 1.144 6.665L12 17.77l-6.0
       3.18 1.145-6.665-4.845-4.72 6.695-.974L12 2.25z"
                  clipRule="evenodd"
                />
              </svg>
              {movie.rating}
            </p>
            <div className="absolute bg-black/50 inset-0 hidden group-hover:flex items-center justify-center">
              <p className="bg-blue-500 text-white p-3 rounded-lg font-bold">
                View details
              </p>
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
