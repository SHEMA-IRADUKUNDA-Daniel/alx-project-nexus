import Banner from "@/components/common/BannerCard";

import MovieCard from "@/components/common/TrendingMovies";

export default function Home() {
  return (
    <main>
      <Banner />
      <div className=" max-w-7xl mx-auto px-6 ">
        <h1 className="py-10 text-xl text-gray-700 font-bold">
          Playing Now Movies
        </h1>
        <MovieCard />
      </div>
    </main>
  );
}
