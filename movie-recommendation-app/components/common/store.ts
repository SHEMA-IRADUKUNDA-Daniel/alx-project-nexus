import { create } from "zustand";
import { MovieStore } from "@/interfaces";
const baseMovies = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    duration: 148,
    quality: "HD",
    image: "/movie.jpg",
  },
  {
    id: 2,
    title: "The Dark Knight",
    year: 2008,
    duration: 152,
    quality: "HD",
    image: "/movie.jpg",
  },
  {
    id: 3,
    title: "Interstellar",
    year: 2014,
    duration: 169,
    quality: "4K",
    image: "/movie.jpg",
  },
  {
    id: 4,
    title: "The Matrix",
    year: 1999,
    duration: 136,
    quality: "HD",
    image: "/movie.jpg",
  },
  {
    id: 5,
    title: "Gladiator",
    year: 2000,
    duration: 155,
    quality: "HD",
    image: "/movie.jpg",
  },
  {
    id: 6,
    title: "The Shawshank Redemption",
    year: 1994,
    duration: 142,
    quality: "HD",
    image: "/movie.jpg",
  },
  {
    id: 7,
    title: "Fight Club",
    year: 1999,
    duration: 139,
    quality: "HD",
    image: "/movie.jpg",
  },
  {
    id: 8,
    title: "Pulp Fiction",
    year: 1994,
    duration: 154,
    quality: "HD",
    image: "/movie.jpg",
  },
  {
    id: 9,
    title: "Forrest Gump",
    year: 1994,
    duration: 142,
    quality: "HD",
    image: "/movie.jpg",
  },
  {
    id: 10,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
    duration: 178,
    quality: "HD",
    image: "/movie.jpg",
  },
  {
    id: 11,
    title: "The Lord of the Rings: The Two Towers",
    year: 2002,
    duration: 179,
    quality: "HD",
    image: "/movie.jpg",
  },
  {
    id: 12,
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
    duration: 201,
    quality: "HD",
    image: "/movie.jpg",
  },
  {
    id: 13,
    title: "The Avengers",
    year: 2012,
    duration: 143,
    quality: "HD",
    image: "/movie.jpg",
  },
  {
    id: 14,
    title: "Avengers: Endgame",
    year: 2019,
    duration: 181,
    quality: "HD",
    image: "/movie.jpg",
  },
  {
    id: 15,
    title: "Iron Man",
    year: 2008,
    duration: 126,
    quality: "HD",
    image: "/movie.jpg",
  },
  {
    id: 16,
    title: "Black Panther",
    year: 2018,
    duration: 134,
    quality: "HD",
    image: "/movie.jpg",
  },
  {
    id: 17,
    title: "Doctor Strange",
    year: 2016,
    duration: 115,
    quality: "HD",
    image: "/movie.jpg",
  },
  {
    id: 18,
    title: "Guardians of the Galaxy",
    year: 2014,
    duration: 121,
    quality: "HD",
    image: "/movie.jpg",
  },
  {
    id: 19,
    title: "Captain Marvel",
    year: 2019,
    duration: 123,
    quality: "HD",
    image: "/movie.jpg",
  },
  {
    id: 20,
    title: "Thor: Ragnarok",
    year: 2017,
    duration: 130,
    quality: "HD",
    image: "/movie.jpg",
  },
  {
    id: 21,
    title: "Spider-Man: Homecoming",
    year: 2017,
    duration: 133,
    quality: "HD",
    image: "/movie.jpg",
  },
  {
    id: 22,
    title: "Spider-Man: No Way Home",
    year: 2021,
    duration: 148,
    quality: "HD",
    image: "/movie.jpg",
  },

  {
    id: 23,
    title: "Ant-Man",
    year: 2015,
    duration: 117,
    quality: "HD",
    image: "/movie.jpg",
  },
  {
    id: 24,
    title: "Ant-Man and the Wasp",
    year: 2018,
    duration: 118,
    quality: "HD",
    image: "/movie.jpg",
  },
].map((m) => ({
  ...m,
  likes: 0, // ✅ start with 0 likes
  comments: [] as string[], // ✅ empty comment list
}));
const useMovieStore = create<MovieStore>((set) => ({
  movies: baseMovies.map((m) => ({ ...m, likes: 0, comments: [] })), // ensure defaults
  searchMovie: "",
  likedMovies: [],

  setSearchMovie: (search) =>
    set((state) => ({
      searchMovie: search,
      movies: state.movies.map((m) => ({
        ...m,
        // filtering is typically done at selector level, but we can still filter here if desired
      })),
    })),

  likeMovie: (id) =>
    set((state) => {
      if (state.likedMovies.includes(id)) return state; // prevent multiple likes
      return {
        likedMovies: [...state.likedMovies, id],
        movies: state.movies.map((m) =>
          m.id === id ? { ...m, likes: (m.likes ?? 0) + 1 } : m
        ),
      };
    }),

  commentMovie: (movieId, text) =>
    set((state) => ({
      movies: state.movies.map((m) =>
        m.id === movieId ? { ...m, comments: [...(m.comments ?? []), text] } : m
      ),
    })),
}));
export default useMovieStore;
