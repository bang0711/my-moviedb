import Pagination from "@/app/component/Pagination";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  params: {
    page: string;
  };
};
async function getData(page: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=5dc598a77b29f87b5779374195722103&page=${page}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
async function PaginationPage({ params: { page } }: Props) {
  const data = await getData(page);
  return (
    <>
      <ul className="grid items-center justify-around gap-2 border-2 p-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-6 ">
        {data.results.map((result: any) => (
          <div
            key={result.id}
            className="flex flex-col items-center justify-center border px-2 py-4"
          >
            <Image
              alt={result.title}
              src={`https://image.tmdb.org/t/p/w500/${result.poster_path}
            `}
              width={200}
              height={200}
            />
            <li className="line-clamp-1 px-2 py-1 text-lg font-medium">
              {result.title}
            </li>
            <Link
              href={`/movie/${result.id}`}
              className="flex w-fit items-center justify-center gap-2 rounded-lg border-2 border-black px-3 py-2 font-bold transition-all duration-300 hover:bg-black hover:text-white"
            >
              <p>Read more</p>{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6  w-6"
              >
                <path
                  fillRule="evenodd"
                  d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        ))}
      </ul>
      <Pagination />
    </>
  );
}

export default PaginationPage;
