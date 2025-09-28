export async function getTMDBRecommendations(movieId: number) {
  if (!movieId) return [];
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&language=en-US&page=1`
  );
  if (!res.ok) throw new Error("TMDB recommendations failed");
  const data = await res.json();
  return data.results || [];
}
