import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Authentication/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyReviews = () => {
  const { currentUser } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/myReviews?email=${currentUser.email}`
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
  }, [currentUser.email]);

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
          const response = await fetch(`http://localhost:5000/reviews/${id}`, {
            method: "DELETE",
          });

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

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h2 className="text-3xl font-semibold text-center mb-8">My Reviews</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white shadow-md rounded-lg">
          <thead className="bg-indigo-600 text-white">
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
              <tr key={review._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-left text-lg text-gray-800">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-left text-lg text-gray-800">
                  {review.title}
                </td>
                <td className="px-6 py-4 text-center text-lg text-gray-800">
                  ⭐ {review.rating}
                </td>
                <td className="px-6 py-4 text-center text-lg text-gray-800">
                  {review.genre}
                </td>
                <td className="px-6 py-4 text-center text-lg text-gray-800">
                  {review.publishingYear}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/updateReview/${review._id}`}
                      className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
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
    </div>
  );
};

export default MyReviews;
