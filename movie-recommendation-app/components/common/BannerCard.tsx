import Image from "next/image";
import Button from "./Button";

export default function Banner() {
  return (
    <div className="relative h-[400px]">
      <Image
        src="/banner.jpg"
        alt="Batman: The Dark Knight Rises poster"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_40%,rgba(0,0,0,4)_100%)]" />

      <div
        className="absolute inset-0 mt-30 
                      text-white max-w-7xl mx-auto px-6"
      >
        <h2 className="text-3xl font-bold mb-3">
          Batman: The Dark Knight Rises
        </h2>

        <ul className="flex gap-4 mb-3 text-gray-200 font-bold items-center">
          <li className="bg-yellow-400 text-black font-bold text-xs rounded-sm p-1">
            HD
          </li>
          <li>9.1</li>
          <li>120 min</li>
          <li>Action, Thriller</li>
        </ul>

        <p className="max-w-md mb-4 font-medium">
          The film promises to bring viewers many action situations revolving
          around the last fight of Batman in Gotham City to protect it from
          Bane—the main villain in this section.
        </p>

        <Button
          title="See More"
          onClick={() => console.log("clicked")}
          className="px-4 py-2 bg-blue-500 text-white cursor-pointer font-bold rounded hover:bg-blue-600"
        />
      </div>
    </div>
  );
}
