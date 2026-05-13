import React from "react";

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      
      <div className="text-center max-w-2xl">
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Welcome to MyBlog
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
          A modern blogging platform where users can read articles, share thoughts,
          and engage through comments. Authors can publish and manage articles,
          while admins manage users and platform access.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">

          <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
            Explore Articles
          </button>

          <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
            Learn More
          </button>

        </div>

        <p className="mt-8 text-xs sm:text-sm text-gray-400">
          Built with React, Node.js, Express & MongoDB
        </p>

      </div>

    </div>
  );
}

export default Home;
