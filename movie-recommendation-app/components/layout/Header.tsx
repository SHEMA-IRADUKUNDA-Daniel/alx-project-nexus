"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import Search from "../common/Search";
import { useRouter } from "next/router";
import { HeaderProps } from "@/interfaces";

import useMovieStore from "../common/store";

export default function Header({ onLoginClick }: HeaderProps) {
  const search = useMovieStore((state) => state.searchMovie);
  const setSearchMovie = useMovieStore((state) => state.setSearchMovie);
  const router = useRouter();

  function goToWelcome() {
    setTimeout(() => {
      router.push("/");
    }, 1000);
  }

  const [countryOpen, setCountryOpen] = useState(false);
  const [moviesOpen, setMoviesOpen] = useState(false);

  const [profile, setProfile] = useState(false);

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
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-gray-800 text-white shadow-lg z-10">
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
          </ul>
        </nav>
        <Search
          value={search}
          onChange={setSearchMovie}
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
          className="hidden md:flex items-center  gap-2 text-white font-semibold cursor-pointer"
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
        <div>
          <button
            onClick={() => setProfile(!profile)}
            className="bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-gray-400"
          >
            <h1 className="text-blue-500 text-2xl font-bold">S</h1>
          </button>
          {profile && (
            <div className=" absolute z-10 flex flex-col gap-6 bg-gray-800 border border-blue-500 right-27 rounded-lg mt-5 p-6 font-bold">
              <h1>Hello, Shema Daniel!</h1>
              <Link
                href={"/profile"}
                className="flex  justify-start gap-5  bg-gray-700  rounded-lg p-2  hover:border border-blue-500 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6 transition-colors text-blue-500 duration-200"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 14c1.333 0 4 1.333 4 4v1H4v-1c0-2.667 2.667-4 4-4m4-8a4 4 0 100 8 4 4 0 000-8z"
                  />
                </svg>
                <h1>Profile</h1>
              </Link>
              <Link
                href={"/favorite"}
                className="flex justify-start gap-5  bg-gray-700   hover:border border-blue-500 rounded-lg p-2 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-6 w-6 text-blue-500 transition-colors duration-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.014-4.5-4.5-4.5
       -1.74 0-3.41.99-4.5 2.55
       -1.09-1.56-2.76-2.55-4.5-2.55
       C5.014 3.75 3 5.765 3 8.25
       c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>

                <h1>Favorites</h1>
              </Link>
              <div className="flex justify-center align-center rounded-lg p-2 cursor-pointer  hover:border border-blue-500 mt-9">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-6 w-6 text-red-500 transition-colors duration-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 12l-3-3m3 3l-3 3m3-3H9"
                  />
                </svg>

                <h1>Log out</h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
  console.log(search);
}
