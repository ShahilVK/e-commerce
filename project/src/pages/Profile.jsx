import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600 font-semibold">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-20 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">User Profile</h1>

      <div className="space-y-4">
        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold text-gray-600">Username:</span>
          <span className="text-gray-800">{user.username}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold text-gray-600">Email:</span>
          <span className="text-gray-800">{user.email}</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="font-semibold text-gray-600">Role:</span>
          <span className="text-gray-800 capitalize">{user.role}</span>
        </div>
      </div>

      {/* You can expand with more details */}
      <div className="mt-6">
        <button className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;
