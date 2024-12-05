import React from "react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white flex items-center justify-center py-10">
      <div className="bg-gray-800 dark:bg-gray-700 shadow-lg rounded-lg p-8 max-w-md text-center relative">
        <h1 className="text-6xl font-extrabold text-red-500 mb-4 animate-pulse">
          Oops! 404
        </h1>
        <p className="text-xl text-gray-300 dark:text-gray-400 mb-6">
          The page you're trying to access does not exist. It might have been
          moved or deleted. You might be lost in the game world!
        </p>

        <a
          href="/"
          className="inline-block bg-yellow-500 text-black px-6 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition transform hover:scale-105"
        >
          Go Back to Home
        </a>

        <div className="absolute top-0 right-0 p-4 text-gray-300 dark:text-gray-500 text-sm">
          <p>404 Error</p>
        </div>

        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
          <div className="text-lg text-gray-200 animate-bounce">🕹️</div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
