import Image from "next/image";
import Button from "./Button";
import useMovieStore from "./store";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
export default function Banner() {
  const router = useRouter();
  const movies = useMovieStore((state) => state.movies);
  const bannerMovies = movies.slice(0, 5);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % bannerMovies.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [bannerMovies.length]);

  const current = bannerMovies[index];
  return (
    <div className="relative h-[400px] overflow-hidden">
      <Image
        key={current.id}
        src={current.image}
        alt={current.title}
        fill
        className="object-cover transition-opacity duration-700 ease-in-out"
        priority
      />

      <div
        className="absolute inset-0 z-9 
    bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_80%,rgba(0,0,0,0.9)_100%)]
    before:absolute before:inset-0 before:bg-black/40 before:content-['']"
      />

      <div
        className="absolute inset-0 mt-30 z-10
                      text-white max-w-7xl mx-auto px-6"
      >
        <h2 className="text-3xl font-bold mb-3">{current.title}</h2>

        <ul className="flex gap-4 mb-3 text-gray-200 font-bold items-center bg-bla">
          <li className="bg-yellow-300 text-black font-bold text-xs rounded-sm p-1">
            {current.quality}
          </li>
          <li>⭐ {current.rating}</li>
          <li>{current.duration} </li>
          <li>{current.genre.join(", ")}</li>
        </ul>

        <p className="max-w-md mb-4 font-medium">{current.description}</p>

        <Button
          title="See More Details"
          onClick={() => router.push(`/movie/${current.id}`)}
          className="px-4 py-2 bg-blue-500 text-white cursor-pointer font-bold rounded hover:bg-blue-600"
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
