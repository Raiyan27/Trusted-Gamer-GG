import { useEffect, useState } from "react";
import GameCard from "../components/GameCard";

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [latestReviews, setLatestReviews] = useState([]);
  const [trendingGames, setTrendingGames] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    // Apply the dark mode class on initial load
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    fetch("http://localhost:5000/reviews")
      .then((res) => res.json())
      .then((data) => {
        setGames(data);

        const sortedReviews = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setLatestReviews(sortedReviews.slice(0, 3));

        const gameCounts = data.reduce((acc, game) => {
          acc[game.title] = (acc[game.title] || 0) + 1;
          return acc;
        }, {});
        const trendingGamesData = Object.entries(gameCounts)
          .map(([title, count]) => ({
            title,
            count,
          }))
          .sort((a, b) => b.count - a.count);
        setTrendingGames(trendingGamesData.slice(0, 3));
      });
  }, [darkMode]);

  const topRatedGames = games.sort((a, b) => b.rating - a.rating).slice(0, 6);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Home Page</h1>

        {/* Highest Rated Games */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Highest Rated Games
          </h2>
          {topRatedGames.length === 0 ? (
            <p className="text-center text-xl font-semibold text-gray-500">
              No top-rated games available.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {topRatedGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}
        </div>

        {/* Latest Reviews */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Latest Game Reviews
          </h2>
          {latestReviews.length === 0 ? (
            <p className="text-center text-xl font-semibold text-gray-500">
              No recent reviews available.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestReviews.map((review) => (
                <GameCard key={review._id} game={review} />
              ))}
            </div>
          )}
        </div>

        {/* Trending Games */}
        <div>
          <h2 className="text-3xl font-semibold text-center mb-6">
            Trending Games
          </h2>
          {trendingGames.length === 0 ? (
            <p className="text-center text-xl font-semibold text-gray-500">
              No trending games to display.
            </p>
          ) : (
            <div className="bg-gray-200 dark:bg-gray-800 p-6 rounded-lg">
              <ul className="space-y-4">
                {trendingGames.map((game, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <h4 className="text-xl font-medium">{game.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {game.count} Reviews
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Fixed Dark Mode Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="fixed bottom-6 left-6 bg-blue-500 dark:bg-yellow-400 text-white dark:text-black p-3 rounded-full shadow-lg transition-transform transform hover:scale-110 focus:outline-none"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </div>
  );
};

export default HomePage;
