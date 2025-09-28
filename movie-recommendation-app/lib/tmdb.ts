import { Movie } from "@/interfaces";
const API_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY =
  process.env.NEXT_PUBLIC_TMDB_KEY || "4bac100a5963573ae9d1cc75548b936d";
import {
  TMDBMovie,
  TMDBResponse,
  TMDBGenre,
  TMDBMovieDetails,
} from "@/interfaces";

const buildApiUrl = (
  endpoint: string,
  params: Record<string, string | number> = {}
) => {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  url.searchParams.append("api_key", TMDB_API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value.toString());
  });

  return url.toString();
};

const fetchFromTMDB = async <T>(url: string): Promise<T> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `TMDB API Error: ${response.status} - ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("TMDB API fetch error:", error);
    throw error;
  }
};

const genreMap: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

export const convertTMDBToMovie = (tmdbMovie: TMDBMovie): Movie => {
  return {
    id: tmdbMovie.id,
    title: tmdbMovie.title,
    year: new Date(tmdbMovie.release_date || "").getFullYear() || 0,
    duration: 120,
    // quality: "HD",
    image: tmdbMovie.poster_path
      ? `https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}`
      : "/placeholder-movie.jpg",
    description: tmdbMovie.overview || "No description available",
    genre: Array.isArray(tmdbMovie.genre_ids)
      ? tmdbMovie.genre_ids
          .map((id) => genreMap[id] || "Unknown")
          .filter(Boolean)
      : Array.isArray(tmdbMovie.genres) // if it's the details endpoint
        ? tmdbMovie.genres.map((g: { id: number; name: string }) => g.name)
        : [],
    cast: [],
    likes: Math.floor(tmdbMovie.vote_count / 100),
    comments: [],
    rating: Math.round(tmdbMovie.vote_average * 10) / 10,
  };
};

export const tmdbApi = {
  getPopularMovies: async (page: number = 1): Promise<TMDBResponse> => {
    const url = buildApiUrl("/movie/popular", { page });
    return fetchFromTMDB<TMDBResponse>(url);
  },

  getPopularMoviesConverted: async (page: number = 1): Promise<Movie[]> => {
    const response = await tmdbApi.getPopularMovies(page);
    return response.results.map(convertTMDBToMovie);
  },

  getTopRatedMovies: async (page: number = 1): Promise<TMDBResponse> => {
    const url = buildApiUrl("/movie/top_rated", { page });
    return fetchFromTMDB<TMDBResponse>(url);
  },

  getTopRatedMoviesConverted: async (page: number = 1): Promise<Movie[]> => {
    const response = await tmdbApi.getTopRatedMovies(page);
    return response.results.map(convertTMDBToMovie);
  },

  getNowPlayingMovies: async (page: number = 1): Promise<TMDBResponse> => {
    const url = buildApiUrl("/movie/now_playing", { page });
    return fetchFromTMDB<TMDBResponse>(url);
  },

  getNowPlayingMoviesConverted: async (page: number = 1): Promise<Movie[]> => {
    const response = await tmdbApi.getNowPlayingMovies(page);
    return response.results.map(convertTMDBToMovie);
  },

  getUpcomingMovies: async (page: number = 1): Promise<TMDBResponse> => {
    const url = buildApiUrl("/movie/upcoming", { page });
    return fetchFromTMDB<TMDBResponse>(url);
  },

  getUpcomingMoviesConverted: async (page: number = 1): Promise<Movie[]> => {
    const response = await tmdbApi.getUpcomingMovies(page);
    return response.results.map(convertTMDBToMovie);
  },

  getMovieDetails: async (movieId: number): Promise<TMDBMovieDetails> => {
    const url = buildApiUrl(`/movie/${movieId}`);
    return fetchFromTMDB<TMDBMovieDetails>(url);
  },

  getMovieDetailsConverted: async (movieId: number): Promise<Movie> => {
    const tmdbMovie = await tmdbApi.getMovieDetails(movieId);
    return {
      ...convertTMDBToMovie(tmdbMovie),
      duration: tmdbMovie.runtime || 120,
      genre: tmdbMovie.genres.map((g) => g.name),
    };
  },

  searchMovies: async (
    query: string,
    page: number = 1
  ): Promise<TMDBResponse> => {
    const url = buildApiUrl("/search/movie", { query, page });
    return fetchFromTMDB<TMDBResponse>(url);
  },

  searchMoviesConverted: async (
    query: string,
    page: number = 1
  ): Promise<Movie[]> => {
    const response = await tmdbApi.searchMovies(query, page);
    return response.results.map(convertTMDBToMovie);
  },

  getMovieRecommendations: async (
    movieId: number,
    page: number = 1
  ): Promise<TMDBResponse> => {
    const url = buildApiUrl(`/movie/${movieId}/recommendations`, { page });
    return fetchFromTMDB<TMDBResponse>(url);
  },

  getSimilarMovies: async (
    movieId: number,
    page: number = 1
  ): Promise<TMDBResponse> => {
    const url = buildApiUrl(`/movie/${movieId}/similar`, { page });
    return fetchFromTMDB<TMDBResponse>(url);
  },

  getGenres: async (): Promise<{ genres: TMDBGenre[] }> => {
    const url = buildApiUrl("/genre/movie/list");
    return fetchFromTMDB<{ genres: TMDBGenre[] }>(url);
  },

  discoverMovies: async (
    filters: {
      page?: number;
      with_genres?: number;
      primary_release_year?: number;
      sort_by?: string;
      "vote_average.gte"?: number;
    } = {}
  ): Promise<TMDBResponse> => {
    const url = buildApiUrl("/discover/movie", filters);
    return fetchFromTMDB<TMDBResponse>(url);
  },
};

export const movieUtils = {
  getPosterUrl: (posterPath: string | null, size: string = "w500"): string => {
    if (!posterPath) return "/placeholder-movie.jpg";
    return `https://image.tmdb.org/t/p/${size}${posterPath}`;
  },

  getBackdropUrl: (
    backdropPath: string | null,
    size: string = "w1280"
  ): string => {
    if (!backdropPath) return "/placeholder-backdrop.jpg";
    return `https://image.tmdb.org/t/p/${size}${backdropPath}`;
  },

  formatReleaseDate: (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  },

  getReleaseYear: (dateString: string): number => {
    return new Date(dateString).getFullYear();
  },

  formatRating: (rating: number): string => {
    return rating.toFixed(1);
  },

  formatRuntime: (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  },
};

export const easyApi = {
  getPopularMovies: async (): Promise<Movie[]> => {
    return tmdbApi.getPopularMoviesConverted();
  },

  searchMovies: async (query: string): Promise<Movie[]> => {
    return tmdbApi.searchMoviesConverted(query);
  },

  getMovieDetails: async (id: number): Promise<Movie> => {
    return tmdbApi.getMovieDetailsConverted(id);
  },

  getTopRatedMovies: async (): Promise<Movie[]> => {
    return tmdbApi.getTopRatedMoviesConverted();
  },
  getNowPlayingMovies: async (): Promise<Movie[]> => {
    return tmdbApi.getNowPlayingMoviesConverted();
  },
};

export default tmdbApi;
