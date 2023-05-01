"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useParams } from "next/navigation";
type Props = {};

function Pagination({}: Props) {
  const [currentPage, setCurrentPage] = useState(() => {
    const storedPage = parseInt(localStorage.getItem("currentPage") || "1");
    return Number.isNaN(storedPage) ? 1 : storedPage;
  });

  const router = useRouter();
  const params = useParams();
  console.log(params.page);
  function handlePageClick(data: any) {
    if (data.selected === undefined) {
      return;
    }

    setCurrentPage(data.selected);
    localStorage.setItem("currentPage", data.selected.toString());
    router.push(`/page/${data.selected + 1}`);
  }

  const totalPages = Math.ceil(10000 / 20);
  const width = window.innerWidth;
  return (
    <div className="px-2 py-4">
      <ReactPaginate
        previousLabel={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        }
        previousClassName="text-xl "
        nextLabel={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        }
        breakLabel={"..."}
        pageCount={totalPages}
        pageRangeDisplayed={width < 640 ? 3 : 5}
        activeClassName={`${
          Object.keys(params).length === 0
            ? ""
            : "w-12 h-12 text-white bg-black transition-all duration-300 "
        }`}
        containerClassName="flex items-center justify-center gap-3 font-bold flex-wrap"
        pageClassName=" text-lg  text-center flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer "
        onPageChange={handlePageClick}
        forcePage={Number.parseInt(params.page ?? "1", 10) - 1}
      />
    </div>
  );
}

export default Pagination;
