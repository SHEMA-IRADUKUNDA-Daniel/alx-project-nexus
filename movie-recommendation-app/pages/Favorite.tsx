import React from "react";
import Image from "next/image";
import useMovieStore from "@/components/common/store";
import Link from "next/link";
export default function Favorite() {
  const { favorites, movies, toggleFavorite } = useMovieStore();
  const favoriteMovies = movies.filter((m) => favorites.includes(m.id));
  const CloseIcon = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      className={`w-5 h-5 ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  if (favoriteMovies.length === 0) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          No Favorites Yet
        </h1>
        <p className="mb-4 text-gray-600">Add some movies to your favorites!</p>
        <Link
          href="/home"
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
        >
          Browse Movies
        </Link>
      </div>
    );
  }
  return (
    <main className=" max-w-7xl mx-auto px-6 ">
      <h2 className="py-10 text-xl font-bold">Favorite</h2>
      <div className="flex gap-3 sm:flex-cols-2 md:flex-cols-3">
        {favoriteMovies.map((movie) => (
          <div key={movie.id}>
            <Link
              href={`/movie/${movie.id}`}
              className="bg-white rounded shadow hover:shadow-lg transition relative"
            >
              <p className="absolute top-1 right-1  bg-white rounded-sm text-xs p-1">
                {/* {movie.quality} */}
              </p>
              <Image
                src={movie.image}
                alt={movie.title}
                width={200}
                height={250}
                className="rounded-sm"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(movie.id);
                }}
                className="absolute top-1 left-1 cursor-pointer bg-red-400 hover:bg-red-600 text-white p-4 rounded-sm text-center font-bold"
              >
                <CloseIcon className="text-white" />
              </button>
            </Link>
            <div className="py-5">
              <h2 className="font-semibold text-lg max-w-44">{movie.title}</h2>
              <div className="flex gap-2 text-xs  text-gray-900 font-medium items-center mt-3">
                <p>{movie.year}</p>
                <p>-</p>
                <p>{movie.duration} min</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
