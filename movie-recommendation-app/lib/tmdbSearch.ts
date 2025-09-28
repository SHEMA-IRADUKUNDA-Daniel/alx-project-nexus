export async function searchTMDBMovies(query: string) {
  if (!query) return [];
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=en-US&query=${encodeURIComponent(
      query
    )}&page=1&include_adult=false`
  );
  if (!res.ok) throw new Error("TMDB search failed");
  const data = await res.json();
  return data.results || [];
}
