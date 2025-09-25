"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import useMovieStore from "@/components/common/store";
import Image from "next/image";
import Link from "next/link";

export default function MovieDetails() {
  const params = useParams();
  const movieId = Number(params?.id);
  const {
    movies,
    toggleLike,
    commentMovie,
    likedMovies,
    favorites,
    toggleFavorite,
  } = useMovieStore();
  const movie = movies.find((m) => m.id === movieId);
  const [commentText, setCommentText] = useState("");
  // const isLiked = likedMovies.includes(movie.id);
  // // const { favorites, toggleFavorite } = useMovieStore();
  // const isFavorite = favorites.includes(movieId);

  if (!movie) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-3xl font-medium mb-5">Movie not found</h1>
        <Link
          href="/home"
          className="bg-blue-500 py-2 mt-10 px-10 rounded-full font-bold text-white hover:bg-blue-600"
        >
          Go Back Home
        </Link>
      </div>
    );
  }

  const handleLike = () => {
    toggleLike(movie.id);
  };
  const isLiked = likedMovies.includes(movie.id);
  const isFavorite = favorites.includes(movie.id);
  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      commentMovie(movie.id, commentText.trim());
      setCommentText("");
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="relative h-72 w-full shadow">
        <Image
          src={movie.image}
          alt={movie.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
        </div>
      </div>

      <div className=" flex items-center max-w-5xl mx-auto p-6 md:flex md:gap-10">
        <div className=" mb-6 md:mb-0">
          <Image
            src={movie.image}
            alt={movie.title}
            width={150}
            height={250}
            className="rounded-xl shadow-lg object-cover w-full"
          />
        </div>

        <div className="md:w-2/3 space-y-6">
          <div className="space-y-2">
            <p>
              <span>{movie.description}</span>
            </p>
            <p>
              <strong>Genre:</strong>
              {""}{" "}
              <span>
                {Array.isArray(movie.genre)
                  ? movie.genre.join(", ")
                  : movie.genre}
              </span>
            </p>
            <p>
              <strong>Released year:</strong> <span>{movie.year}</span>
            </p>
            <p>
              <strong>Duration:</strong> <span>{movie.duration}</span> min
            </p>
            <p>
              <strong>Casts:</strong>{" "}
              <span>
                {Array.isArray(movie.cast) ? movie.cast.join(", ") : movie.cast}
              </span>{" "}
              min
            </p>
          </div>
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-5 cursor-pointer py-2 rounded-full font-semibold transition-colors ${
              isLiked
                ? "bg-gray-400 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {isLiked ? "  Liked 👍" : " 👍 Like"} {movie.likes || 0}
          </button>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-2">Comments</h2>
            <ul className="space-y-2 mb-4">
              {movie.comments.map((c, i) => (
                <li key={i} className="bg-white p-3 rounded shadow">
                  {c}
                </li>
              ))}
            </ul>

            <form onSubmit={handleComment} className="flex gap-2">
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment…"
                className="flex-1 rounded border p-2"
              />
              <button
                type="submit"
                className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
              >
                Post
              </button>
            </form>
          </div>

          <button
            onClick={() => toggleFavorite(movieId)}
            className={`px-5 py-2 rounded-full font-semibold  transition-colors ${
              isFavorite
                ? "bg-blue-500 text-white  hover:bg-blue-600"
                : "bg-gray-200 cursor-pointer text-gray-700 hover:bg-gray-300"
            }`}
          >
            {isFavorite ? "★ Remove from Favorites" : "+ Add to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
}
