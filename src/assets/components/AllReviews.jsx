import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import GameCard from "./GameCard";
import { Helmet } from "react-helmet";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("highestRated");
  const [selectedGenre, setSelectedGenre] = useState("All");

  const genres = [
    "All",
    "Action",
    "RPG",
    "Adventure",
    "Shooter",
    "Puzzle",
    "Horror",
    "Open World",
    "Online Multiplayer",
  ];

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          "https://trusted-gamer-gg-server.vercel.app/reviews"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setReviews(data);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching reviews: " + error.message);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const sortReviews = (reviews, option) => {
    if (option === "highestRated") {
      return [...reviews].sort((a, b) => b.rating - a.rating);
    } else if (option === "year") {
      return [...reviews].sort((a, b) => b.publishingYear - a.publishingYear);
    }
    return reviews;
  };

  const filterByGenre = (reviews, genre) => {
    if (genre === "All") return reviews;
    return reviews.filter((review) => review.genre === genre);
  };

  const sortedReviews = sortReviews(reviews, sortOption);
  const filteredReviews = filterByGenre(sortedReviews, selectedGenre);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <Helmet>
        <title>Trusted Gamer GG - All Reviews</title>
      </Helmet>
      <h2 className="text-3xl font-semibold text-center mb-8">All Reviews</h2>

      <div className="mb-6 flex flex-wrap gap-4 justify-center">
        <div>
          <label htmlFor="sortOption" className="text-lg font-semibold">
            Sort By:
          </label>
          <select
            id="sortOption"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="ml-4 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="highestRated">Highest Rated</option>
            <option value="year">Year (Newest to Oldest)</option>
          </select>
        </div>

        <div>
          <label htmlFor="genreFilter" className="text-lg font-semibold">
            Filter By Genre:
          </label>
          <select
            id="genreFilter"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="ml-4 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredReviews.length === 0 ? (
        <div className="text-center text-xl font-semibold text-gray-500">
          No matches found for the selected genre.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <GameCard key={review._id} game={review} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllReviews;
