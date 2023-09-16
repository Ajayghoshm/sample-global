"use client";

import React from "react";

const BlogCard = ({
  item,
  onReadMore,
  onEditModalChange,
  onDeleteModalChange,
}) => {
  return (
    <>
      <div className="px-4 py-2 overflow-hidden rounded-md border border-gray-200 shadow-md m-2 ">
        <div className="flex justify-between">
          <h2 className="font-bold text-lg py-2 truncate">{item.title}</h2>
          <div className="flex space-x-2 items-center">
            <div onClick={() => onEditModalChange(item)}>
              <img src={"/editIcon.svg"} className="w-3 cursor-pointer " />
            </div>
            <div onClick={() => onDeleteModalChange(item)}>
              <img src={"/deleteIcon.svg"} className="w-3 cursor-pointer" />
            </div>
          </div>
        </div>
        <p className="truncate text-gray-500 py-2">{item.desc}</p>
        <div className="flex justify-end text-sm py-2">
          {/* <p className="text-gray-400">12/12/12</p> */}
          <a
            href="#"
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => onReadMore(item.id)}
          >
            Read more
            <svg
              class="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
