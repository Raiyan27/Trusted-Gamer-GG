import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Authentication/AuthContext";
import { toast } from "react-toastify";

const ReviewDetails = () => {
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/reviews/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setReview(data);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching review details: " + error.message);
        setLoading(false);
      }
    };

    fetchReviewDetails();
  }, [id]);

  const handleAddTowatchlist = async () => {
    if (!currentUser) {
      toast.error("Please log in to add to watchlist!");
      return;
    }

    const watchlistItem = {
      reviewId: review._id,
      title: review.title,
      genre: review.genre,
      rating: review.rating,
      year: review.publishingYear,
      email: currentUser.email,
    };

    try {
      const response = await fetch("http://localhost:5000/watchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(watchlistItem),
      });

      if (!response.ok) {
        throw new Error("Failed to add to watchlist");
      }

      toast.success("Review added to watchlist!");
    } catch (error) {
      toast.error("Error adding to watchlist: " + error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500">Review not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-900 py-8 px-3 md:px-0">
      <div className="max-w-6xl w-full border mx-auto p-12 bg-white shadow-xl rounded-lg dark:bg-gray-900 dark:border-gray-700">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">
          {review.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="flex justify-center">
            <img
              src={review.coverImage}
              alt={review.title}
              className="w-full h-128 object-fill rounded-lg shadow-md"
            />
          </div>
          <div className="flex flex-col justify-between space-y-10">
            <div>
              <h3 className="font-semibold text-xl text-gray-800 dark:text-white">
                Review Description
              </h3>
              <p className="text-lg text-gray-700 break-words max-h-96 overflow-auto dark:text-gray-300">
                {review.description}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-xl text-gray-800 dark:text-white">
                Genre
              </h3>
              <p className="text-gray-600 dark:text-gray-400 badge">
                {review.genre}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-xl text-gray-800 dark:text-white">
                Rating
              </h3>
              <p className="text-yellow-500">{`⭐ ${review.rating}`}</p>
            </div>

            <div>
              <h3 className="font-semibold text-xl text-gray-800 dark:text-white">
                Release Year
              </h3>
              <p className="text-yellow-500">{`${review.publishingYear}`}</p>
            </div>

            <div>
              <h3 className="font-semibold text-xl text-gray-800 dark:text-white">
                Reviewed By
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {review.name} ({review.email})
              </p>
            </div>

            <button
              onClick={handleAddTowatchlist}
              className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out dark:bg-indigo-700 dark:hover:bg-indigo-800"
            >
              Add to watchlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;
