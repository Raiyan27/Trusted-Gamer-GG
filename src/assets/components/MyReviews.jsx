import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Authentication/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import UpdateReviewModal from "./UpdateReviewModal";
import { Helmet } from "react-helmet";

const MyReviews = () => {
  const { currentUser } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    const fetchMyReviews = async () => {
      try {
        const response = await fetch(
          `https://trusted-gamer-gg-server.vercel.app/myReviews?email=${currentUser.email}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setReviews(data);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching your reviews: " + error.message);
        setLoading(false);
      }
    };

    fetchMyReviews();
  }, [reviews]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `https://trusted-gamer-gg-server.vercel.app/reviews/${id}`,
            {
              method: "DELETE",
            }
          );

          if (!response.ok) {
            throw new Error("Failed to delete review");
          }

          setReviews((prevReviews) =>
            prevReviews.filter((review) => review._id !== id)
          );

          Swal.fire("Deleted!", "Your review has been deleted.", "success");
        } catch (error) {
          toast.error("Error deleting review: " + error.message);
        }
      }
    });
  };

  const openModal = (review) => {
    setSelectedReview(review);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedReview(null);
  };

  const handleUpdate = async (updatedReview) => {
    try {
      const response = await fetch(
        `https://trusted-gamer-gg-server.vercel.app/review/${updatedReview._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedReview),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update review");
      }

      const updatedReviewData = await response.json();

      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review._id === updatedReview._id ? updatedReviewData : review
        )
      );

      closeModal();
      Swal.fire("Updated!", "Your review has been updated.", "success");
    } catch (error) {
      toast.error("Error updating review: " + error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <title>Trusted Gamer GG - My Reviews</title>
      </Helmet>
      <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800 dark:text-white">
        My Reviews
      </h2>

      {reviews.length === 0 ? (
        <div className="text-center text-xl text-gray-500 dark:text-gray-300">
          You have not added any reviews yet. <br />
          <Link
            to="/addReview"
            className="text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Start adding reviews now!
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-white shadow-md rounded-lg dark:bg-gray-800 dark:text-white">
            <thead className="bg-indigo-600 text-white dark:bg-indigo-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">#</th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Game Title
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium">
                  Rating
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium">
                  Genre
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium">
                  Year
                </th>
                <th className="px-6 py-3 text-center text-sm font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, index) => (
                <tr
                  key={review._id}
                  className="border-b hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 text-left text-lg text-gray-800 dark:text-gray-200">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-left text-lg text-gray-800 dark:text-gray-200">
                    {review.title}
                  </td>
                  <td className="px-6 py-4 text-center text-lg text-gray-800 dark:text-gray-200">
                    ⭐ {review.rating}
                  </td>
                  <td className="px-6 py-4 text-center text-lg text-gray-800 dark:text-gray-200">
                    {review.genre}
                  </td>
                  <td className="px-6 py-4 text-center text-lg text-gray-800 dark:text-gray-200">
                    {review.publishingYear}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => openModal(review)}
                        className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 dark:bg-red-800 dark:hover:bg-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {selectedReview && (
        <UpdateReviewModal
          isOpen={modalOpen}
          onClose={closeModal}
          review={selectedReview}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default MyReviews;
