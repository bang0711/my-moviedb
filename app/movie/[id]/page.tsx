import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};
async function getData(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=5dc598a77b29f87b5779374195722103&language=en-US`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
async function MoviePage({ params: { id } }: Props) {
  const data = await getData(id);
  return (
    <>
      <div className="mx-auto mt-2 flex max-w-none flex-col items-center justify-center gap-4 px-3 py-2 sm:max-w-md md:mt-5 md:max-w-xl md:flex-row md:items-start md:gap-3 lg:max-w-4xl">
        <Image
          alt={data.title}
          src={`https://image.tmdb.org/t/p/w500/${data.poster_path}
            `}
          width={300}
          height={150}
          className="h-80 w-96"
        />
        <div className="flex flex-col gap-3 text-center md:text-start">
          <p className="text-lg font-medium md:text-xl lg:text-2xl">
            {data.title}
          </p>
          <h1 className="text-base font-bold">Overview</h1>
          <p>{data.overview}</p>
          <h1 className="text-base font-bold">Budget</h1>
          <p>{data.budget}$</p>
          <h1 className="text-base font-bold">Production Company</h1>
          <ul>
            {data.production_companies.map((company: any) => (
              <div key={company.id} className="flex items-center  gap-3">
                <li>{company.name}: </li>
                {company.logo_path !== null ? (
                  <li>
                    <Image
                      src={
                        company.logo_path &&
                        `https://image.tmdb.org/t/p/w500/${company.logo_path}
            `
                      }
                      width={100}
                      height={100}
                      alt={company.name}
                    />
                  </li>
                ) : (
                  <p>No Information</p>
                )}
              </div>
            ))}
          </ul>
          <h1 className="text-base font-bold">Product Country</h1>
          <ul>
            {data.production_countries.map((country: any) => (
              <li key={country.name}>{country.name}</li>
            ))}
          </ul>
          <h1 className="text-base font-bold">Release Date</h1>
          <p>{data.release_date}</p>
          <h1 className="text-base font-bold">Run time</h1>
          <p>{data.runtime} minutes</p>
          <h1 className="text-base font-bold">Languages</h1>
          <ul>
            {data.spoken_languages.map((language: any) => (
              <li key={language.name}>
                {language.name} ({language.english_name})
              </li>
            ))}
          </ul>
          <h1 className="text-base font-bold">Home Page</h1>
          <Link
            href={`${data.homepage}`}
            target="_blank"
            className="w-fit rounded-lg bg-blue-500 px-3 py-2 font-medium text-white opacity-80 transition-all duration-300 hover:opacity-100"
          >
            Click to see
          </Link>
        </div>
      </div>
    </>
  );
}

export default MoviePage;
