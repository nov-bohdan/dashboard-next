import React, { use } from "react";
import Logout from "./Logout";
import Link from "next/link";

export default function Header({
  firstName,
}: {
  firstName: string | undefined;
}) {
  return (
    <header className="bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white p-6 rounded-lg shadow-xl flex flex-col md:flex-row justify-between items-center mb-5 rounded-t-none">
      <h1 className="text-3xl font-bold mb-4 md:mb-0">Dashboard</h1>
      <nav className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        {firstName && <p className="font-bold">Hello, {firstName}</p>}
        <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <li>
            <Link
              href="/dashboard"
              className="hover:text-yellow-400 transition-colors"
            >
              Tasks
            </Link>
          </li>
          <li>
            <Link
              href="/profile"
              className="hover:text-yellow-400 transition-colors"
            >
              Profile
            </Link>
          </li>
          <li>
            <Logout />
          </li>
        </ul>
      </nav>
    </header>
  );
}
