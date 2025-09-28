import { create } from "zustand";
import { MovieStore } from "@/interfaces";
export const baseMovies = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    duration: 148,
    quality: "HD",
    rating: 8.8,
    image: "/movie.jpg",
    description:
      "A skilled thief enters dreams to steal secrets and faces the challenge of planting an idea.",
    genre: ["Sci-Fi", "Thriller"],
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
  },
  {
    id: 2,
    title: "The Dark Knight",
    year: 2008,
    duration: 152,
    quality: "HD",
    rating: 9.0,
    image: "/movie.jpg",
    description:
      "Batman battles the Joker, who seeks to plunge Gotham into chaos.",
    genre: ["Action", "Crime", "Drama"],
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
  },
  {
    id: 3,
    title: "Interstellar",
    year: 2014,
    duration: 169,
    quality: "4K",
    rating: 8.6,
    image: "/movie.jpg",
    description:
      "Explorers travel through a wormhole to find a new home for humanity.",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
  },
  {
    id: 4,
    title: "The Matrix",
    year: 1999,
    duration: 136,
    quality: "HD",
    rating: 8.7,
    image: "/movie.jpg",
    description:
      "A hacker discovers reality is a simulation and joins a rebellion against machines.",
    genre: ["Sci-Fi", "Action"],
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
  },
  {
    id: 5,
    title: "Gladiator",
    year: 2000,
    duration: 155,
    quality: "HD",
    rating: 8.5,
    image: "/movie.jpg",
    description:
      "A betrayed Roman general fights for revenge and honor in the arena.",
    genre: ["Action", "Drama"],
    cast: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"],
  },
  {
    id: 6,
    title: "The Shawshank Redemption",
    year: 1994,
    duration: 142,
    quality: "HD",
    rating: 9.3,
    image: "/movie.jpg",
    description:
      "Two imprisoned men bond over years, finding solace and eventual freedom.",
    genre: ["Drama"],
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
  },
  {
    id: 7,
    title: "Fight Club",
    year: 1999,
    duration: 139,
    quality: "HD",
    rating: 8.8,
    image: "/movie.jpg",
    description:
      "An insomniac and a soap maker form an underground fight club with unexpected consequences.",
    genre: ["Drama", "Thriller"],
    cast: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"],
  },
  {
    id: 8,
    title: "Pulp Fiction",
    year: 1994,
    duration: 154,
    quality: "HD",
    rating: 8.9,
    image: "/movie.jpg",
    description:
      "Interwoven stories of crime and redemption in Los Angeles’ underworld.",
    genre: ["Crime", "Drama"],
    cast: ["John Travolta", "Samuel L. Jackson", "Uma Thurman"],
  },
  {
    id: 9,
    title: "Forrest Gump",
    year: 1994,
    duration: 142,
    quality: "HD",
    rating: 8.8,
    image: "/movie.jpg",
    description:
      "A man with a kind heart witnesses key moments in American history.",
    genre: ["Drama", "Romance"],
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
  },
  {
    id: 10,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
    duration: 178,
    quality: "HD",
    rating: 8.8,
    image: "/movie.jpg",
    description:
      "A hobbit sets out with allies to destroy a powerful ring of evil.",
    genre: ["Fantasy", "Adventure"],
    cast: ["Elijah Wood", "Ian McKellen", "Viggo Mortensen"],
  },
  {
    id: 11,
    title: "The Lord of the Rings: The Two Towers",
    year: 2002,
    duration: 179,
    quality: "HD",
    rating: 8.7,
    image: "/movie.jpg",
    description:
      "The Fellowship is scattered as the battle for Middle-earth intensifies.",
    genre: ["Fantasy", "Adventure"],
    cast: ["Elijah Wood", "Viggo Mortensen", "Ian McKellen"],
  },
  {
    id: 12,
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
    duration: 201,
    quality: "HD",
    rating: 8.9,
    image: "/movie.jpg",
    description:
      "The final confrontation against Sauron decides the fate of Middle-earth.",
    genre: ["Fantasy", "Adventure"],
    cast: ["Elijah Wood", "Viggo Mortensen", "Ian McKellen"],
  },
  {
    id: 13,
    title: "The Avengers",
    year: 2012,
    duration: 143,
    quality: "HD",
    rating: 8.0,
    image: "/movie.jpg",
    description:
      "Earth’s mightiest heroes team up to stop Loki’s invasion of Earth.",
    genre: ["Action", "Sci-Fi"],
    cast: ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"],
  },
  {
    id: 14,
    title: "Avengers: Endgame",
    year: 2019,
    duration: 181,
    quality: "HD",
    rating: 8.4,
    image: "/movie.jpg",
    description:
      "The Avengers assemble once more to undo Thanos’ devastating snap.",
    genre: ["Action", "Sci-Fi"],
    cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"],
  },
  {
    id: 15,
    title: "Iron Man",
    year: 2008,
    duration: 126,
    quality: "HD",
    rating: 7.9,
    image: "/movie.jpg",
    description:
      "A billionaire builds a high-tech suit of armor to become a hero.",
    genre: ["Action", "Sci-Fi"],
    cast: ["Robert Downey Jr.", "Gwyneth Paltrow", "Jeff Bridges"],
  },
  {
    id: 16,
    title: "Black Panther",
    year: 2018,
    duration: 134,
    quality: "HD",
    rating: 7.3,
    image: "/movie.jpg",
    description:
      "T’Challa returns to Wakanda to claim the throne and face a powerful adversary.",
    genre: ["Action", "Adventure"],
    cast: ["Chadwick Boseman", "Michael B. Jordan", "Lupita Nyong'o"],
  },
  {
    id: 17,
    title: "Doctor Strange",
    year: 2016,
    duration: 115,
    quality: "HD",
    rating: 7.5,
    image: "/movie.jpg",
    description:
      "A surgeon learns the mystic arts after an accident changes his life.",
    genre: ["Action", "Fantasy"],
    cast: ["Benedict Cumberbatch", "Chiwetel Ejiofor", "Rachel McAdams"],
  },
  {
    id: 18,
    title: "Guardians of the Galaxy",
    year: 2014,
    duration: 121,
    quality: "HD",
    rating: 8.0,
    image: "/movie.jpg",
    description: "A group of misfits bands together to protect a powerful orb.",
    genre: ["Action", "Comedy", "Sci-Fi"],
    cast: ["Chris Pratt", "Zoe Saldana", "Dave Bautista"],
  },
  {
    id: 19,
    title: "Captain Marvel",
    year: 2019,
    duration: 123,
    quality: "HD",
    rating: 6.8,
    image: "/movie.jpg",
    description:
      "A former pilot gains cosmic powers and discovers her true identity.",
    genre: ["Action", "Sci-Fi"],
    cast: ["Brie Larson", "Samuel L. Jackson", "Ben Mendelsohn"],
  },
  {
    id: 20,
    title: "Thor: Ragnarok",
    year: 2017,
    duration: 130,
    quality: "HD",
    rating: 7.9,
    image: "/movie.jpg",
    description:
      "Thor must escape Sakaar and stop Hela from destroying Asgard.",
    genre: ["Action", "Adventure", "Comedy"],
    cast: ["Chris Hemsworth", "Tom Hiddleston", "Cate Blanchett"],
  },
  {
    id: 21,
    title: "Spider-Man: Homecoming",
    year: 2017,
    duration: 133,
    quality: "HD",
    rating: 7.4,
    image: "/movie.jpg",
    description:
      "Peter Parker balances high school life with being Spider-Man.",
    genre: ["Action", "Adventure"],
    cast: ["Tom Holland", "Michael Keaton", "Zendaya"],
  },
  {
    id: 22,
    title: "Spider-Man: No Way Home",
    year: 2021,
    duration: 148,
    quality: "HD",
    rating: 8.2,
    image: "/movie.jpg",
    description:
      "Peter seeks Doctor Strange’s help to restore his secret identity, causing multiverse chaos.",
    genre: ["Action", "Adventure", "Sci-Fi"],
    cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch"],
  },
  {
    id: 23,
    title: "Ant-Man",
    year: 2015,
    duration: 117,
    quality: "HD",
    rating: 7.3,
    image: "/movie.jpg",
    description:
      "A thief gains the ability to shrink in scale but increase in strength.",
    genre: ["Action", "Comedy", "Sci-Fi"],
    cast: ["Paul Rudd", "Evangeline Lilly", "Michael Douglas"],
  },
  {
    id: 24,
    title: "Ant-Man and the Wasp",
    year: 2018,
    duration: 118,
    quality: "HD",
    rating: 7.0,
    image: "/movie.jpg",
    description:
      "Ant-Man teams with the Wasp to uncover secrets of the quantum realm.",
    genre: ["Action", "Comedy", "Sci-Fi"],
    cast: ["Paul Rudd", "Evangeline Lilly", "Michael Peña"],
  },
].map((m) => ({
  ...m,
  likes: 0,
  comments: [] as string[],
}));
const useMovieStore = create<MovieStore>((set) => ({
  movies: baseMovies.map((m) => ({ ...m, likes: 0, comments: [] })),
  searchMovie: "",
  likedMovies: [],
  favorites: [],
  user: { name: "Shema Daniel" },
  loginModalOpen: false,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),

  setSearchMovie: (search) =>
    set((state) => ({
      searchMovie: search,
      movies: state.movies.map((m) => ({
        ...m,
      })),
    })),

  toggleLike: (id) =>
    set((state) => {
      const isLiked = state.likedMovies.includes(id);
      // if (state.likedMovies.includes(id)) return state;
      return {
        likedMovies: isLiked
          ? state.likedMovies.filter((mId) => mId !== id)
          : [...state.likedMovies, id],
        movies: state.movies.map((m) =>
          m.id === id
            ? {
                ...m,
                likes: isLiked ? (m.likes || 1) - 1 : (m.likes || 0) + 1,
              }
            : m
        ),
      };
    }),

  commentMovie: (movieId, text) =>
    set((state) => ({
      movies: state.movies.map((m) =>
        m.id === movieId ? { ...m, comments: [...(m.comments ?? []), text] } : m
      ),
    })),
  toggleFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((fav) => fav !== id)
        : [...state.favorites, id],
    })),
  openLoginModal: () => set({ loginModalOpen: true }),
  closeLoginModal: () => set({ loginModalOpen: false }),
}));
export default useMovieStore;
