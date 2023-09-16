"use client";

import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const onTakeClick = () => {
    router.push("/dashboard");
  };
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen w-full space-y-4">
        <h2 className="text-blue-900"> Welcome to the My Blog World</h2>
        <button
          className="bg-blue-500 text-white p-2 rounded-md cursor-pointer"
          onClick={() => onTakeClick()}
        >
          Take me there
        </button>
      </div>
    </div>
  );
}
