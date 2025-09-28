"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import useMovieStore from "@/components/common/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Movie } from "@/interfaces";
import { easyApi } from "@/lib/tmdb";
import MovieRecommendations from "@/components/common/MovieRecommendations";

export default function MovieDetails() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
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
  // const movie = movies.find((m) => m.id === movieId);
  const [commentText, setCommentText] = useState("");
  const user = useMovieStore((state) => state.user);
  const { openLoginModal } = useMovieStore();
  useEffect(() => {
    const loadMovieDetails = async () => {
      if (!movieId) return;

      try {
        setLoading(true);
        setError(null);

        // First, try to find movie in store
        const storeMovie = movies.find((m) => m.id === movieId);

        if (storeMovie) {
          setMovie(storeMovie);
          setLoading(false);
        } else {
          // If not in store, fetch from TMDB API
          const movieDetails = await easyApi.getMovieDetails(movieId);
          setMovie(movieDetails);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error loading movie details:", err);
        setError("Failed to load movie details");
        setLoading(false);
      }
    };

    loadMovieDetails();
  }, [movieId, movies]);
  const LikeIcon = ({ className }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`w-5 h-5 ${className}`}
    >
      <path
        d="M2 21h4V9H2v12zM22 10c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32
             c0-.41-.17-.79-.44-1.06L13.17 2 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0
             1.1.9 2 2 2h7c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1z"
      />
    </svg>
  );
  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading movie details...</p>
        </div>
      </div>
    );
  }
  if (error || !movie) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-3xl font-medium mb-5">
          {error || "Movie not found"}
        </h1>
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
    if (!user) {
      openLoginModal();
    }
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
        <div className="absolute inset-0 bg-black/40 gap-5 flex flex-row items-center align-center justify-center">
          <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
          <p className=" flex items-center gap-1 bg-black bg-opacity-20 text-white text-sm font-semibold px-2 py-1 rounded-full ">
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
        </div>
      </div>

      <div className=" flex items-center justify-center flex-col md:flex-row max-w-5xl mx-auto p-6 md:flex md:gap-10">
        <div className=" mb-6 md:mb-0">
          <button
            onClick={() => router.push("/home")}
            className="absolute md:hidden left-6 bg-blue-500 p-2 rounded-full top-22 z-5 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth={2}
              className="w-6 h-6 text-gray-800 cursor-pointer hover:text-blue-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>

        <div className="md:w-2/3 space-y-6">
          <div className="space-y-2">
            <p>
              <span className="font-medium text-gray-600 py-2">
                {movie.description}
              </span>
            </p>

            <p>
              <strong className="text-gray-800">Genre:</strong>
              {""}{" "}
              <span className="text-gray-600">
                {Array.isArray(movie.genre)
                  ? movie.genre.join(", ")
                  : movie.genre}
              </span>
            </p>
            <p>
              <strong className="text-gray-800">Released year:</strong>{" "}
              <span className="text-gray-600">{movie.year}</span>
            </p>
            <p>
              <strong className="text-gray-800">Duration:</strong>{" "}
              <span className="text-gray-600">{movie.duration} min</span>
            </p>
            <p>
              <strong className="text-gray-800">Casts:</strong>{" "}
              <span className="text-gray-600">
                {Array.isArray(movie.cast) ? movie.cast.join(", ") : movie.cast}
              </span>{" "}
            </p>
          </div>

          <div>
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-5 cursor-pointer py-2 rounded-full font-semibold transition-colors ${
                isLiked
                  ? "bg-gray-400 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {isLiked ? (
                <>
                  Liked <LikeIcon className="text-white" />
                </>
              ) : (
                <>
                  <LikeIcon className="text-white" /> Like
                </>
              )}{" "}
              {movie.likes || 0}
            </button>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-2">Comments</h2>
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
                  className="flex-1 rounded border-gray-600 border p-2"
                />
                <button
                  type="submit"
                  className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
                >
                  Post
                </button>
              </form>
            </div>
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
      <div className="flex flex-row items-center justify-between px-6 py-4 max-w-7xl mx-auto gap-10">
        <MovieRecommendations
          currentMovieId={0} // Use 0 or -1 as placeholder
          currentMovieGenres={[]}
        />
      </div>
    </div>
  );
}
