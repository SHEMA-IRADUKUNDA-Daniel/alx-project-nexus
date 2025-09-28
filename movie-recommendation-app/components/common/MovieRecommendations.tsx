"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Movie, MovieRecommendationsProps } from "@/interfaces";
import useMovieStore from "@/components/common/store";
import { getTMDBRecommendations } from "@/lib/tmdbRecommendations";
import { TMDBMovieDetails } from "@/interfaces";

export default function MovieRecommendations({
  currentMovieId,
}: MovieRecommendationsProps) {
  const movies = useMovieStore((state) => state.movies);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!currentMovieId) return;
      try {
        setLoading(true);

        const results: TMDBMovieDetails[] =
          await getTMDBRecommendations(currentMovieId);

        const mapped: Movie[] = results.map((m) => ({
          id: m.id,
          title: m.title,
          image: m.poster_path
            ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
            : "/placeholder.jpg",
          rating: m.vote_average,
          year: m.release_date ? Number(m.release_date.slice(0, 4)) : 0,
          duration: m.runtime ?? 0, // Optional, TMDB may not return runtime here
          genre: m.genre_ids?.map(String) ?? [],
          description: m.overview || "",
          likes: m.vote_count,
          comments: [],
          cast: [],
        }));

        setRecommendations(mapped.slice(0, 6));
      } catch (e) {
        console.error("Failed to fetch recommendations:", e);
        setRecommendations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [currentMovieId]);

  if (movies.length <= 1) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          You may also like
        </h2>
        <div className="text-center py-8">
          <p className="text-gray-500">
            No other movies available for recommendations
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          You may also like
        </h2>
        <div className="text-center py-8">
          <p className="text-gray-500">Loading recommendations...</p>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null; // No recommendations
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">You may also like</h2>
        <span className="text-sm text-gray-500">
          Similar to the one you selected
        </span>
      </div>

      <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-6 md:overflow-visible pb-4">
        {recommendations.map((movie) => (
          <div
            key={movie.id}
            className="my-2 mx-2 md:max-w-45 max-w-40 relative cursor-pointer"
          >
            <Link href={`/movie/${movie.id}`} className="relative group">
              <Image
                src={movie.image}
                alt={movie.title}
                width={200}
                height={250}
                className="object-fill rounded-sm"
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
                    d="M12 2.25l2.955 6.066 6.695.974-4.845 4.72 1.144 6.665L12 17.77l-6.03 3.18 1.145-6.665-4.845-4.72 6.695-.974L12 2.25z"
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
            <h2 className="font-bold text-gray-800 mt-3">{movie.title}</h2>
            <div className="flex gap-2 text-xs text-gray-700 font-medium items-center mt-3">
              <p>{movie.year}</p>
              <p>-</p>
              <p>{movie.duration} min</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          href="/home"
          className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Browse All Movies
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
