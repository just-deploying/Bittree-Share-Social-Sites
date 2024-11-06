"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

const GenerateComponent = () => {
  const searchParams = useSearchParams();
  const [links, setLinks] = useState([{ link: "", linktext: "" }]);
  const [handle, setHandle] = useState(searchParams.get("handle"));
  const [pic, setPic] = useState("");
  const [desc, setDesc] = useState("");

  const handleChange = (index, link, linktext) => {
    setLinks((initialLinks) => {
      return initialLinks.map((item, i) => (i === index ? { link, linktext } : item));
    });
  };

  const addLink = () => {
    setLinks(links.concat([{ link: "", linktext: "" }]));
  };

  const submitLinks = async () => {
    const myHeaders = new Headers({ "Content-Type": "application/json" });
    const raw = JSON.stringify({ links, handle, pic, desc });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch("https://bittree-share-social-sites.vercel.app/api/add", requestOptions);
    const result = await response.json();

    if (result.success) {
      toast.success(result.message);
      setHandle("");
      setLinks([]);
      setPic("");
      setDesc("");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="bg-[#D6A336] min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Column */}
      <div className="flex justify-center mt-28 p-10">
        <ToastContainer />
        <div className="text-gray-900 space-y-10 max-w-lg w-full">
          <h1 className="text-4xl font-bold text-center md:text-left">
            Create your Bittree
          </h1>

          {/* Step 1 */}
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold">Step 1: Claim your handle</h2>
            <input
              value={handle || ""}
              onChange={(e) => setHandle(e.target.value)}
              className="w-full px-4 py-3 rounded-full focus:outline-none focus:ring focus:ring-purple-500 placeholder-gray-500"
              type="text"
              placeholder="Choose a handle"
            />
          </div>

          {/* Step 2 */}
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold">Step 2: Add Links</h2>
            {links.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  value={item.linktext || ""}
                  onChange={(e) => handleChange(index, item.link, e.target.value)}
                  className="w-full px-4 py-3 rounded-full focus:outline-none focus:ring focus:ring-purple-500 placeholder-gray-500"
                  type="text"
                  placeholder="Enter Link Text"
                />
                <input
                  value={item.link || ""}
                  onChange={(e) => handleChange(index, e.target.value, item.linktext)}
                  className="w-full px-4 py-3 rounded-full focus:outline-none focus:ring focus:ring-purple-500 placeholder-gray-500"
                  type="text"
                  placeholder="Enter Link"
                />
              </div>
            ))}
            <button
              onClick={()=>addLink()}
              className="w-full mt-3 py-2 px-4 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
            >
              + Add Link
            </button>
          </div>

          {/* Step 3 */}
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold">Step 3: Add Pictures and Description</h2>
            <input
              value={pic || ""}
              onChange={(e) => setPic(e.target.value)}
              className="w-full px-4 py-3 rounded-full focus:outline-none focus:ring focus:ring-purple-500 placeholder-gray-500"
              type="text"
              placeholder="Enter Link to your Picture"
            />
            <input
              value={desc || ""}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full px-4 py-3 rounded-full focus:outline-none focus:ring focus:ring-purple-500 placeholder-gray-500"
              type="text"
              placeholder="Enter Description"
            />
            <button
              disabled={!handle || !pic}
              onClick={submitLinks}
              className="w-full mt-3 py-2 px-4 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition disabled:bg-purple-500"
            >
              Create your BitLink
            </button>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="hidden md:flex justify-center bg-[#D6A336]">
        <Image
          src="/generate.png"
          height={500}
          width={700}
          className="h-5/6 object-contain"
          alt="Generate your links"
        />
      </div>
    </div>
  );
};

const Generate = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <GenerateComponent />
  </Suspense>
);

export default Generate;
