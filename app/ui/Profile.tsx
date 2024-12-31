"use client";

import React, { useActionState } from "react";
import { UserSettings } from "../lib/types";
import { updateUserName } from "../lib/actions";

export default function Profile({
  userSettings,
}: {
  userSettings: UserSettings;
}) {
  const [state, action] = useActionState(updateUserName, undefined);
  return (
    <div className="p-6 bg-gradient-to-r from-gray-700 via-gray-900 to-black text-white rounded-xl shadow-xl flex flex-col">
      <h2 className="text-3xl font-bold mb-4">Profile</h2>
      <div className="mb-4">
        <p className="text-green-400 mt-2">{state?.message}</p>
        <p className="text-red-400 mt-2">{state?.error}</p>
        <form action={action}>
          <label
            className="block text-lg font-semibold mb-2"
            htmlFor="firstname"
          >
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            defaultValue={userSettings.first_name}
            className="bg-transparent text-lg font-bold w-full border-2 border-orange-400 outline-none p-2"
          />
          <button className="mt-4 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-300">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
