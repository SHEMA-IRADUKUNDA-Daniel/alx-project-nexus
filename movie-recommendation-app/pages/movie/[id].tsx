"use client";
import { useParams } from "next/navigation";
import useMovieStore from "@/components/common/store";
import Image from "next/image";
import Link from "next/link";
import WatchButton from "@/components/common/WatchButton";

export default function MovieDetails() {
  const params = useParams();
  const id = params?.id as string;

  const movies = useMovieStore((state) => state.movies);
  const movie = movies.find((movie) => movie.id === Number(id));

  console.log("Movie ID:", id);
  console.log("Found movie:", movie);

  if (!movie) {
    return (
      <div className="p-6 text-center ">
        <h1 className=" text-3xl font-medium mb-5">Movie not found</h1>
        <Link
          className="bg-blue-500 py-2 mt-10 px-10 w-20% rounded-full font-bold text-white hover:bg-blue-600 cursor-pointer"
          href={"/home"}
        >
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="relative ">
        <Image
          src={movie.image}
          alt={movie.title}
          width={400}
          height={500}
          className="object-cover  w-full h-150"
          style={{
            borderBottomLeftRadius: "60px",
            borderBottomRightRadius: "60px",
          }}
        />
        <div
          style={{
            borderBottomLeftRadius: "60px",
            borderBottomRightRadius: "60px",
          }}
          className="absolute inset-0 bg-black opacity-70 flex items-center justify-center "
        >
          <Image
            src="/PlayButton.svg"
            alt="Play"
            width={100}
            height={100}
            className="cursor-pointer"
          />
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto flex justify-between  gap-10 align-center ">
        <div className=" max-w-40">
          <Image
            src={movie.image}
            alt=""
            width={200}
            height={250}
            className="object-cover rounded-lg w-full "
          />
          <p className="absolute top-2 right-2 bg-white rounded-sm text-xs p-2 font-semibold">
            {movie.quality}
          </p>
        </div>

        <div className="space-y-4">
          <WatchButton
            className="transition-colors duration-200 px-4 py-2 bg-blue-500 text-white cursor-pointer font-bold rounded hover:bg-blue-600"
            title="Watch Now"
            onClick={() => console.log("clicked")}
          />
          <div className="flex gap-5">
            <h1 className="text-xl font-bold text-black">{movie.title}</h1>
            <p className="bg-yellow-400 py-1 w-6 h-6 text-center text-black font-bold text-xs rounded-sm ">
              {movie.quality}
            </p>
          </div>
          <div className="font-bold text-sm text-gray-600">
            Released year: {movie.year}
          </div>

          <div className="flex gap-4 font-bold text-sm text-gray-600">
            <span>Duration: {movie.duration} min</span>
          </div>
        </div>
        <button className="cursor-pointer font-bold  bg-blue-500 h-10 hover:bg-blue-600 text-white font-bld px-5 rounded-full transition-colors duration-200">
          + Add to favorite
        </button>
      </div>
    </div>
  );
}
