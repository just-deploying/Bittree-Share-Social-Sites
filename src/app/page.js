"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const router = useRouter();

  const createTree = () => {
    router.push(`/generate?handle=${text}`);
  };

  return (
    <main>
      <section className="bg-[#254f1a] min-h-[100vh] grid grid-cols-2">
        <div className="flex justify-center flex-col ml-[10vw] gap-3 mt-28">
          <p className="text-yellow-300 font-bold text-7xl">Everything you </p>
          <p className="text-yellow-300 font-bold text-7xl">are. In one, </p>
          <p className="text-yellow-300 font-bold text-7xl">
            simple link in bio.
          </p>
          <p className="text-yellow-300 text-xl my-4">
            Join 50M+ people using Linktree for their link in bio. One link to
            help you share everything you create, curate and sell from your
            Instagram, TikTok, Twitter, YouTube and other social media profiles.
          </p>

          <div>
            <div className="input flex gap-2">
              <input
                onChange={(e) => {
                  setText(e.target.value);
                }}
                type="text"
                className="p-2 focus:outline-green-800 rounded-md"
                placeholder="Enter your Handle"
              />
              <button
                onClick={() => {
                  createTree();
                }}
                className="bg-pink-300 rounded-full p-4 font-semibold"
              >
                Clain your BitTree
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center flex-col mr-[10vw]">
          <Image src="/home.png" alt="homepage image" height={500} width={500}/>
        </div>
      </section>
    </main>
  );
}
