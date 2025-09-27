import Button from "@/components/common/Button";
// import Search from "@/components/common/Search";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const goToHome = () => {
    setTimeout(() => {
      router.push("/home");
    }, 1000);
  };
  return (
    <main className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col items-center justify-center  text-gray-600  ">
        <h1 className="text-4xl font-bold mb-6 mt-20 text-blue-500">
          Movie App
        </h1>
        {/* 
        <Search
          className="w-80 border border-blue-500  rounded-full focus-within:border-blue-500 overflow-hidden flex"
          placeholder="Search movies..."
          rightContent={
            <button className=" hover:bg-blue-600 absolute inset-y-0 right-[-13] px-3 py-1 bg-blue-500 text-white flex-1 rounded-r-full h-full flex items-center justify-center cursor-pointer">
              Search
            </button>
          }
        /> */}
        <p className="text-gray-600 mt-10 text-xl font-bold text-center">
          Movieapp.com - Your better place to discover movies you’ll love.
        </p>
        <Button
          className="bg-blue-500 py-2 mt-10 px-10 rounded-full font-bold text-white hover:bg-blue-600 cursor-pointer"
          title="Go To Home Page"
          onClick={goToHome}
        />

        <div className="mt-10  px-3 flex flex-col justify-left">
          <p className="text-blue-500 font-bold">
            {" "}
            Movie App - Discover Free Movies Online | movieapp.com
          </p>
          <p className="text-gray-600 mb-20">
            Cord-cutting is becoming a huge thing these days. People around the
            world are tired of paying the massive bills associated with cable TV
            and the subscriptions of Netflix and other streaming platforms. The
            good news is that sites like Movie App are making cord-cutting
            possible. They offer free movies and TV shows for all people around
            the world. But as you can imagine, things have not been smooth.
            Movie App and others like it have been targeted by relevant
            authorities for piracy and copyright infringement. But nonetheless,
            they still offer a great streaming option.
          </p>
        </div>
      </div>
    </main>
  );
}
