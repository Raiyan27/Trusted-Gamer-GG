import { useState, useContext } from "react";
import { AuthContext } from "../Authentication/AuthContext";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const AddReview = () => {
  const { currentUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    coverImage: "",
    title: "",
    description: "",
    rating: "",
    publishingYear: "",
    genre: "",
  });

  const genres = [
    "Action",
    "RPG",
    "Adventure",
    "Shooter",
    "Puzzle",
    "Horror",
    "Open World",
    "Online Multiplayer",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.coverImage ||
      !formData.title ||
      !formData.description ||
      !formData.rating ||
      !formData.publishingYear ||
      !formData.genre
    ) {
      toast.error("Please fill out all fields.");
      return;
    }

    const review = {
      ...formData,
      email: currentUser.email,
      name: currentUser.displayName,
    };

    try {
      const res = await fetch(
        "https://trusted-gamer-gg-server.vercel.app/reviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(review),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Review added successfully!");
        setFormData({
          coverImage: "",
          title: "",
          description: "",
          rating: "",
          publishingYear: "",
          genre: "",
        });
      } else {
        toast.error(data.error || "Failed to add review.");
      }
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Helmet>
        <title>Trusted Gamer GG - Add Review</title>
      </Helmet>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Add New Review
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Game Cover Image (URL)
            </label>
            <input
              type="url"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Game Title/Name
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter game title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Review Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows="5"
              placeholder="Write your detailed review here"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Rating (1-10)
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter a rating (1-10)"
              min="1"
              max="10"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Publishing Year
            </label>
            <input
              type="number"
              name="publishingYear"
              value={formData.publishingYear}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter publishing year (1980 - later)"
              min="1980"
              max={new Date().getFullYear()}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Genre
            </label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
              <option value="">Select a genre</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              User Email
            </label>
            <input
              type="email"
              value={currentUser?.email || ""}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 dark:bg-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              User Name
            </label>
            <input
              type="text"
              value={currentUser?.displayName || ""}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 dark:bg-gray-600 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-800"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
