import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import GameCard from "./GameCard";

const AllReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("highestRated");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:5000/reviews");

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

  const sortedReviews = sortReviews(reviews, sortOption);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold text-center mb-8">All Reviews</h2>

      <div className="mb-6">
        <label htmlFor="sortOption" className="text-lg font-semibold">
          Sort By:
        </label>
        <select
          id="sortOption"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="ml-4 p-2 border border-gray-300 rounded-md"
        >
          <option value="highestRated">Highest Rated</option>
          <option value="year">Year (Newest to Oldest)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedReviews.map((review) => (
          <GameCard key={review._id} game={review} />
        ))}
      </div>
    </div>
  );
};

export default AllReviews;
