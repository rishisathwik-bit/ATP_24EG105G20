import React from "react";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-black text-white">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10 backdrop-blur-md">
        <h1 className="text-3xl font-extrabold tracking-wide">
          Blog<span className="text-indigo-400">App</span>
        </h1>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-28">
        <h1 className="text-6xl md:text-7xl font-black leading-tight max-w-4xl">
          Share Your Ideas With The World 
        </h1>

        <p className="mt-6 text-gray-300 text-lg md:text-xl max-w-2xl">
          Create, publish, and explore amazing articles from talented writers.
          Your next favorite story starts here.
        </p>

        <div className="mt-10 flex gap-5">
          <button className="bg-indigo-500 hover:bg-indigo-600 px-7 py-3 rounded-xl text-lg font-semibold shadow-lg transition duration-300">
            Get Started
          </button>

          <button className="border border-white/20 hover:border-indigo-400 hover:text-indigo-400 px-7 py-3 rounded-xl text-lg font-semibold transition duration-300">
            Explore Blogs
          </button>
        </div>
      </section>



        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/10 hover:scale-105 transition duration-300 shadow-xl">
          <div className="text-5xl mb-4">🚀</div>
          <h2 className="text-2xl font-bold mb-3">Publish Instantly</h2>
          <p className="text-gray-300">
            Share your content with readers across the globe in seconds.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/10 hover:scale-105 transition duration-300 shadow-xl">
          <div className="text-5xl mb-4">💡</div>
          <h2 className="text-2xl font-bold mb-3">Discover Ideas</h2>
          <p className="text-gray-300">
            Explore creative articles, trending topics, and inspiring stories.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-white/10 text-gray-400">
        © 2026 BlogApp. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
