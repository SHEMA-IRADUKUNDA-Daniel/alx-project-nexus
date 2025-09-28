import Image from "next/image";
import Button from "./Button";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Movie } from "@/interfaces";
import { easyApi } from "@/lib/tmdb";
export default function Banner() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const bannerMovies = movies.slice(0, 5);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const loadMovies = async () => {
      try {
        const apiMovies = await easyApi.getPopularMovies();
        setMovies(apiMovies);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load movies:", error);
        setLoading(false);
      }
    };

    loadMovies();
  }, []);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % bannerMovies.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [bannerMovies.length]);

  if (loading) return <div>Loading movies...</div>;
  console.log(movies);

  const current = bannerMovies[index];

  return (
    <div className="relative h-[500px] overflow-hidden">
      <Image
        key={current.id}
        src={current.image}
        alt={current.title}
        fill
        className="object-cover  object-center transition-opacity duration-700 ease-in-out"
        priority
        sizes="100vw"
        onError={(e) => {
          e.currentTarget.src = "/placeholder-movie.jpg";
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      <div
        className="absolute inset-0 mt-30 z-9
                      text-white max-w-7xl mx-auto px-6"
      >
        <h2 className="text-3xl font-bold mb-3">{current.title}</h2>

        <ul className="flex gap-3 mb-3 text-gray-200 font-bold items-center">
          <li className="flex gap-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-yellow-400"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25l2.955 6.066 6.695.974-4.845 4.72 1.144 6.665L12 17.77l-6.0
       3.18 1.145-6.665-4.845-4.72 6.695-.974L12 2.25z"
                clipRule="evenodd"
              />
            </svg>
            {current.rating}
          </li>
          <li>{current.duration} </li>
          <li>{current.genre.join(", ")}</li>
        </ul>

        <p className="max-w-md mb-4 font-medium">{current.description}</p>

        <Button
          onClick={() => router.push(`/movie/${current.id}`)}
          className="px-4 flex items-center justify-between gap-1 py-2 bg-blue-500 text-white cursor-pointer font-bold rounded hover:bg-blue-600"
          rightContent={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z
               M12 16v-4 m0-4h.01"
              />
            </svg>
          }
          title="View Details"
        />
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {bannerMovies.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === index ? "bg-white" : "bg-gray-400/50"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
