import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import Search from "../common/Search";
import { useRouter } from "next/router";
import { HeaderProps } from "@/interfaces";

export default function Header({ onLoginClick }: HeaderProps) {
  const router = useRouter();

  function goToWelcome() {
    setTimeout(() => {
      router.push("/");
    }, 1000);
  }

  // States for each dropdown
  const [countryOpen, setCountryOpen] = useState(false);
  const [moviesOpen, setMoviesOpen] = useState(false);
  const [tvOpen, setTvOpen] = useState(false);

  // Refs to close dropdowns on outside click
  const countryRef = useRef<HTMLLIElement>(null);
  const moviesRef = useRef<HTMLLIElement>(null);
  const tvRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        countryRef.current &&
        !countryRef.current.contains(event.target as Node)
      )
        setCountryOpen(false);
      if (
        moviesRef.current &&
        !moviesRef.current.contains(event.target as Node)
      )
        setMoviesOpen(false);
      if (tvRef.current && !tvRef.current.contains(event.target as Node))
        setTvOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-gray-800 text-white shadow-lg">
      <div className="flex flex-row items-center justify-between px-6 py-4 max-w-7xl mx-auto gap-10">
        <button className="flex-shrink-0 cursor-pointer" onClick={goToWelcome}>
          <h1 className="text-2xl font-bold text-blue-500">Movie App</h1>
        </button>

        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex flex-row space-x-8">
            <li>
              <Link
                onClick={goToWelcome}
                href="/"
                className="hover:text-blue-500 transition-colors duration-200 cursor-pointer"
              >
                Home
              </Link>
            </li>

            <li className="relative" ref={countryRef}>
              <button
                onMouseEnter={() => setCountryOpen(true)}
                onMouseLeave={() => setCountryOpen(false)}
                className="hover:text-blue-500 transition-colors duration-200 cursor-pointer"
              >
                Country
              </button>
              {countryOpen && (
                <ul className="absolute top-full mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-lg">
                  <li className="px-4 py-2 text-gray-500 cursor-not-allowed">
                    Loading...
                  </li>
                </ul>
              )}
            </li>

            <li className="relative" ref={moviesRef}>
              <button
                onMouseEnter={() => setMoviesOpen(true)}
                onMouseLeave={() => setMoviesOpen(false)}
                className="hover:text-blue-500 transition-colors duration-200 cursor-pointer"
              >
                Movies
              </button>
              {moviesOpen && (
                <ul className="absolute top-full mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-lg">
                  <li className="px-4 py-2 text-gray-500 cursor-not-allowed">
                    Loading...
                  </li>
                </ul>
              )}
            </li>

            <li className="relative" ref={tvRef}>
              <button
                onMouseEnter={() => setTvOpen(true)}
                onMouseLeave={() => setTvOpen(false)}
                className="hover:text-blue-500 transition-colors duration-200 cursor-pointer"
              >
                TV-Series
              </button>
              {tvOpen && (
                <ul className="absolute top-full mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-lg">
                  <li className="px-4 py-2 text-gray-500 cursor-not-allowed">
                    Loading...
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link
                href="/Favorite"
                className="hover:text-blue-500 transition-colors duration-200 cursor-pointer"
              >
                Favorites
              </Link>
            </li>
          </ul>
        </nav>

        <Search
          className="w-64 relative hidden md:flex"
          placeholder="Search movies..."
          rightContent={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="#3B82F6"
              className="h-6 w-6 absolute inset-y2 right-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
              />
            </svg>
          }
        />

        <button
          onClick={onLoginClick}
          className="hidden md:flex items-center gap-2 text-white font-semibold cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="white"
            className="h-6 w-6 transition-colors duration-200 group-hover:stroke-blue-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 14c1.333 0 4 1.333 4 4v1H4v-1c0-2.667 2.667-4 4-4m4-8a4 4 0 100 8 4 4 0 000-8z"
            />
          </svg>
          <span>Login</span>
        </button>
      </div>
    </header>
  );
}
