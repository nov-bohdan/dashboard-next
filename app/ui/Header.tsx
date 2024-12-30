import React from "react";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white p-5 rounded-lg shadow-md flex justify-between items-center mb-5">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="hover:text-yellow-600 transition-colors">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-yellow-600 transition-colors">
              Tasks
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-yellow-600 transition-colors">
              Profile
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
