import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Authentication/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

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
          `https://trusted-gamer-gg-server.vercel.app/watchlist?email=${currentUser.email}`
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
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove the item from your watchlist.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `https://trusted-gamer-gg-server.vercel.app/watchlist/${id}`,
            {
              method: "DELETE",
            }
          );

          if (!response.ok) {
            throw new Error("Failed to remove item from the watchlist");
          }

          toast.success("Item removed from Watchlist");
          setWatchlist(watchlist.filter((item) => item._id !== id));
        } catch (error) {
          toast.error("Error removing item: " + error.message);
        }
      }
    });
  };

  const handleExploreDetails = (id) => {
    navigate(`/review/${id}`);
  };

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
        <title>Trusted Gamer GG - My WatchList</title>
      </Helmet>
      <h2 className="text-3xl font-semibold text-center mb-8">My Watchlist</h2>

      {watchlist.length === 0 ? (
        <div className="text-center text-xl text-gray-500 dark:text-gray-300">
          Your watchlist is empty!
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
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
              {watchlist.map((item, index) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 text-left text-lg text-gray-800 dark:text-white">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-left text-lg text-gray-800 dark:text-white">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 text-center text-lg text-gray-800 dark:text-white">
                    ⭐ {item.rating}
                  </td>
                  <td className="px-6 py-4 text-center text-lg text-gray-800 dark:text-white">
                    {item.genre}
                  </td>
                  <td className="px-6 py-4 text-center text-lg text-gray-800 dark:text-white">
                    {item.year}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleRemove(item._id)}
                        className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700"
                      >
                        Remove
                      </button>
                      <button
                        onClick={() => handleExploreDetails(item.reviewId)}
                        className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700"
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
      )}
    </div>
  );
};

export default MyWatchlist;
