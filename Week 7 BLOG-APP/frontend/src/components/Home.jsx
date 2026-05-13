import React from "react";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* Left Content */}
        <div className="flex-1">
          <p className="text-blue-600 font-semibold mb-3">
            Welcome to MyBlog
          </p>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Share Your Thoughts
          </h1>

          <p className="text-gray-600 text-lg leading-8 mb-8 max-w-lg">
            A simple platform to share your ideas, stories and inspiration
            with the world.
          </p>

          <div className="flex gap-4 flex-wrap">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-300">
              Get Started
            </button>

            <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg transition duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="blog"
            className="w-72 md:w-96"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
