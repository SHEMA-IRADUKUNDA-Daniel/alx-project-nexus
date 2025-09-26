"use client";

import React, { useState } from "react";
import Link from "next/link";
import useMovieStore from "@/components/common/store";

export default function Profile() {
  const [username, setUsername] = useState("Shema Daniel");

  const email = "daniel@example.com";

  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [message, setMessage] = useState("");
  const { likedMovies } = useMovieStore();
  // const { movies } = useMovieStore();
  const totalLikedMovies = likedMovies.length;

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPwd || !newPwd || !confirmPwd) {
      setMessage("Please fill all fields.");
      return;
    }
    if (newPwd !== confirmPwd) {
      setMessage("New passwords do not match.");
      return;
    }
    setMessage("✅ Password changed successfully (demo only).");
    setCurrentPwd("");
    setNewPwd("");
    setConfirmPwd("");
  };

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl text-gray-800 font-bold mb-6">Profile</h1>

      <section className="bg-white rounded shadow p-6 mb-8 space-y-4">
        <div>
          <label className="block font-medium text-gray-600">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 w-full border border-gray-700 rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium text-gray-600">Email</label>
          <input
            type="email"
            value={email}
            readOnly
            className="mt-1 w-full border rounded p-2 bg-gray-100 border-gray-700 cursor-not-allowed"
          />
        </div>
      </section>

      <section className="bg-white rounded shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Change Password
        </h2>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <input
            type="password"
            placeholder="Current password"
            value={currentPwd}
            onChange={(e) => setCurrentPwd(e.target.value)}
            className="w-full border-gray-800 border rounded p-2"
          />
          <input
            type="password"
            placeholder="New password"
            value={newPwd}
            onChange={(e) => setNewPwd(e.target.value)}
            className="w-full border border-gray-800 rounded p-2"
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPwd}
            onChange={(e) => setConfirmPwd(e.target.value)}
            className="w-full border border-gray-800 rounded p-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Password
          </button>
          {message && <p className="text-sm mt-2 text-gray-700">{message}</p>}
        </form>
      </section>

      <section className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Movie Stats
        </h2>

        <p className="text-gray-600 mb-4">
          Total Likes of Liked Movies: <strong>{totalLikedMovies}</strong>
        </p>
        <Link
          href="/favorite"
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          View Favorites
        </Link>
      </section>
    </main>
  );
}
