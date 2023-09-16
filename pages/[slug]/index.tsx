"use client";

import React from "react";
import { useRouter } from "next/router";

const BlogDetails = ({ blogList }) => {
  const router = useRouter();
  const { slug } = router.query;
  console.debug("params", slug);

  return (
    <div className="flex flex-col items-center h-screen w-screen p-4">
      <h3 className="text-2xl font-semibold">
        this is the details page of {blogList[0]?.title}
      </h3>
      <div className="py-10">
        <p className="text-gray-400">{blogList[0]?.desc}</p>
      </div>
    </div>
  );
};

export default BlogDetails;
export async function getServerSideProps(ctx) {
  const slug = ctx.params.slug;
  console.debug("params", slug);
  let { DEV_URL } = process.env;
  let response = await fetch(`${DEV_URL}/api/blog/?id=${slug}`);
  let blogList = await response.json();
  console.debug("blog_list", blogList);
  return {
    props: { blogList },
  };
}
