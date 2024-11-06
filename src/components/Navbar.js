"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();
  const showNavbar = ["/", "/generate"].includes(pathname);

  return (
    <>
      {showNavbar && (
        <nav className="bg-white w-[80vw] fixed flex justify-between top-10 right-[10vw] rounded-full px-7 py-4">
          <div className="flex gap-20 items-center">
            <Link href={"/"}>
              <Image src="logo.svg" alt="logo" width={128} height={128} />
            </Link>

            <ul className="flex gap-10">
              <li>Templates</li>
              <li>Marketplace</li>
              <li>Discover</li>
              <li>Pricing</li>
              <li>Learn</li>
            </ul>
          </div>

          <div className="flex gap-3 font-bold">
            <button className="login bg-gray-400 p-4 rounded-lg">Log in</button>
            <button className="signup bg-gray-900 p-4 rounded-full text-white">
              SignUp free
            </button>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
