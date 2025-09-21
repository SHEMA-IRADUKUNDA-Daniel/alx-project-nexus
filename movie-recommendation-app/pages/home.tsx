import Banner from "@/components/common/BannerCard";
import MovieCard from "@/components/common/TrendingMovies";
export default function Home() {
  return (
    <main>
      <Banner />
      <div className=" max-w-7xl mx-auto px-6 ">
        <h1 className="py-10 text-xl font-bold">Trending</h1>
        <MovieCard />
        <h1 className="py-10 text-xl font-bold">Movies</h1>
      </div>
    </main>
  );
}
