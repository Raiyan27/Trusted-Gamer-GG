import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Authentication/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MyWatchlist = () => {
  const { currentUser } = useContext(AuthContext);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!currentUser) {
        toast.error("You must be logged in to access your watchlist!");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/watchlist?email=${currentUser.email}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch watchlist");
        }
        const data = await response.json();
        setWatchlist(data);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching watchlist: " + error.message);
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [currentUser]);

  const handleRemove = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/watchlist/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove item from the watchlist");
      }

      toast.success("Item removed from Watchlist");
      setWatchlist(watchlist.filter((item) => item._id !== id));
    } catch (error) {
      toast.error("Error removing item: " + error.message);
    }
  };

  const handleExploreDetails = (id) => {
    navigate(`/review/${id}`);
  };

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h2 className="text-3xl font-semibold text-center mb-8">My Watchlist</h2>
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
            {watchlist.map((item, index) => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-left text-lg text-gray-800">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-left text-lg text-gray-800">
                  {item.title}
                </td>
                <td className="px-6 py-4 text-center text-lg text-gray-800">
                  ⭐ {item.rating}
                </td>
                <td className="px-6 py-4 text-center text-lg text-gray-800">
                  {item.genre}
                </td>
                <td className="px-6 py-4 text-center text-lg text-gray-800">
                  {item.year}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => handleExploreDetails(item.reviewId)}
                      className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
                    >
                      Explore Details
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

export default MyWatchlist;
