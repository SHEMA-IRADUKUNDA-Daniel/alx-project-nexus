"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import Search from "../common/Search";
import { useRouter } from "next/router";
import { HeaderProps } from "@/interfaces";
import { searchTMDBMovies } from "@/lib/tmdbSearch";
import { Movie } from "@/interfaces";

import useMovieStore from "../common/store";

export default function Header({ onLoginClick }: HeaderProps) {
  const search = useMovieStore((state) => state.searchMovie);
  const movies = useMovieStore((state) => state.movies);
  const setSearchMovie = useMovieStore((state) => state.setSearchMovie);
  const router = useRouter();
  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useMovieStore((state) => state.user);
  // const setUser = useMovieStore((state) => state.setUser);
  const logout = useMovieStore((state) => state.logout);
  const [apiResults, setApiResults] = useState<Movie[]>([]); // 🔑
  const [loading, setLoading] = useState(false);

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
  const profileRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (search.trim().length === 0) {
        setApiResults([]);
        return;
      }
      try {
        setLoading(true);
        const results = await searchTMDBMovies(search);
        setApiResults(results);
      } catch (e) {
        console.error(e);
        setApiResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

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
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      )
        setProfile(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-gray-800 text-white shadow-lg z-10">
      <p className="bg-red-500 text-center">
        If you are seeing this, that means my backend peer did not give me the
        API in time, I had to use another, if everything is not working check
        the video(deadline in 1h left).
      </p>
      <div className="flex flex-row items-center justify-between px-6 py-4 max-w-7xl mx-auto gap-10">
        <button className="flex-shrink-0 cursor-pointer" onClick={goToWelcome}>
          <h1 className="md:text-2xl text-xl font-bold text-blue-500">
            Movie App
          </h1>
        </button>
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex flex-row space-x-8">
            <li>
              <Link
                onClick={goToWelcome}
                href="/"
                className="hover:text-blue-500 font-bold transition-colors duration-200 cursor-pointer"
              >
                Home
              </Link>
            </li>

            <li className="relative" ref={countryRef}>
              <button
                onMouseEnter={() => setCountryOpen(true)}
                onMouseLeave={() => setCountryOpen(false)}
                className="hover:text-blue-500 font-bold transition-colors duration-200 cursor-pointer"
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
                className="hover:text-blue-500 font-bold transition-colors duration-200 cursor-pointer"
              >
                Movies
              </button>
              {moviesOpen && (
                <ul className="absolute top-full  mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-lg">
                  <li className="px-4 py-2 text-gray-500 cursor-not-allowed">
                    Loading...
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>

        <div className="relative w-50 ">
          <Search
            value={search}
            onChange={setSearchMovie}
            className="w-full"
            placeholder="Search movies..."
          />

          {!loading && apiResults.length > 0 && (
            <div className="absolute right-0 mt-2 md:w-full w-60 bg-white text-gray-800  rounded-lg shadow-lg max-h-60 overflow-y-auto z-30">
              {!loading &&
                apiResults.map((movie) => (
                  <Link
                    key={movie.id}
                    href={`/movie/${movie.id}`}
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setSearchMovie("")}
                  >
                    <p className="font-medium">{movie.title}</p>
                    <p className="text-sm text-gray-500">{movie.year}</p>
                  </Link>
                ))}
            </div>
          )}

          {search && filteredMovies.length === 0 && (
            <div className="absolute left-0 mt-2 w-full bg-white text-gray-800 rounded-lg shadow-lg p-4 text-sm">
              No movies found.
            </div>
          )}
        </div>
        {!user ? (
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
            <span className="font-bold">Login</span>
          </button>
        ) : (
          <div className="relative hidden md:flex">
            <button
              onClick={() => setProfile(true)}
              className="bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-gray-400"
            >
              <h1 className="text-blue-500 text-2xl font-bold">
                {user.name[0].toUpperCase()}
              </h1>
            </button>

            {profile && (
              <div
                onMouseLeave={() => setProfile(false)}
                className="absolute mt-15 z-10 flex flex-col gap-6 bg-gray-800 border w-56 border-blue-500 right-0 rounded-lg p-6 font-bold"
              >
                <h1>Hello, {user.name}!</h1>
                <Link
                  href="/profile"
                  className="flex justify-start gap-5 bg-gray-700 rounded-lg p-2 hover:border border-blue-500 cursor-pointer"
                >
                  Profile
                </Link>
                <Link
                  href="/favorite"
                  className="flex justify-start gap-5 bg-gray-700 rounded-lg p-2 hover:border border-blue-500 cursor-pointer"
                >
                  Favorites
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setProfile(false);
                  }}
                  className="flex justify-center items-center rounded-lg p-2 cursor-pointer hover:border border-blue-500 mt-4 text-red-500"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-gray-800 text-white border-t border-gray-700 px-6 py-4 space-y-6">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="hover:text-blue-500"
            >
              Home
            </Link>
            <button className="text-left hover:text-blue-500" disabled>
              Country (coming soon)
            </button>
            <button className="text-left hover:text-blue-500" disabled>
              Movies (coming soon)
            </button>
          </nav>

          <div className="border-t border-gray-700 pt-4">
            {user ? (
              <>
                <button
                  onClick={() => setProfile((profile) => !profile)}
                  className="flex cursor-pointer items-center gap-2 hover:text-blue-500 w-full text-left"
                >
                  <span className="bg-white text-blue-500 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    {user.name[0].toUpperCase()}
                  </span>
                  {user.name}
                </button>

                {profile && (
                  <div className="  mt-4 z-10 flex flex-col gap-6 bg-gray-800 border w-56 border-blue-500 right-0 rounded-lg p-6 font-bold">
                    <h1>Hello, {user.name}!</h1>
                    <Link
                      href="/profile"
                      className="flex justify-start gap-5 bg-gray-700 rounded-lg p-2 hover:border border-blue-500 cursor-pointer"
                      onClick={() => setMobileOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/favorite"
                      className="flex justify-start gap-5 bg-gray-700 rounded-lg p-2 hover:border border-blue-500 cursor-pointer"
                      onClick={() => setMobileOpen(false)}
                    >
                      Favorites
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setProfile(false);
                        setMobileOpen(false);
                      }}
                      className="flex justify-center items-center rounded-lg p-2 cursor-pointer hover:border border-blue-500 mt-4 text-red-500"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={() => {
                  onLoginClick();
                  setMobileOpen(false);
                }}
                className="flex items-center gap-2 hover:text-blue-500 w-full text-left"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
  console.log(search);
}
