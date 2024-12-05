import { useState, useContext } from "react";
import { AuthContext } from "../Authentication/AuthContext";
const UpdateReviewModal = ({ isOpen, onClose, review, onUpdate }) => {
  const [updatedTitle, setUpdatedTitle] = useState(review.title);
  const [updatedRating, setUpdatedRating] = useState(review.rating);
  const [updatedGenre, setUpdatedGenre] = useState(review.genre);
  const [updatedYear, setUpdatedYear] = useState(review.publishingYear);
  const [updatedDescription, setUpdatedDescription] = useState(
    review.description || ""
  );
  const [updatedCoverImage, setUpdatedCoverImage] = useState(
    review.coverImage || ""
  );
  const [error, setError] = useState("");
  const { currentUser } = useContext(AuthContext);

  const handleUpdate = () => {
    if (
      !updatedTitle ||
      !updatedRating ||
      !updatedGenre ||
      !updatedYear ||
      !updatedDescription ||
      !updatedCoverImage
    ) {
      setError("All fields must be filled.");
      return;
    }
    if (updatedRating < 0 || updatedRating > 10) {
      setError("Rating must be between 0 and 10.");
      return;
    }

    const currentYear = new Date().getFullYear();
    if (updatedYear < 1900 || updatedYear > currentYear) {
      setError("Year must be between 1900 and the current year.");
      return;
    }

    setError("");

    onUpdate({
      ...review,
      title: updatedTitle,
      rating: updatedRating,
      genre: updatedGenre,
      publishingYear: updatedYear,
      description: updatedDescription,
      coverImage: updatedCoverImage,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
        <h2 className="text-2xl mb-4">Update Review</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div>
          <label>Game Title</label>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            className="input input-bordered w-full mb-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label>Rating</label>
          <input
            type="number"
            value={updatedRating}
            onChange={(e) => setUpdatedRating(e.target.value)}
            className="input input-bordered w-full mb-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
            min="0"
            max="10"
          />
        </div>

        <div>
          <label>Genre</label>
          <input
            type="text"
            value={updatedGenre}
            onChange={(e) => setUpdatedGenre(e.target.value)}
            className="input input-bordered w-full mb-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label>Year</label>
          <input
            type="number"
            value={updatedYear}
            onChange={(e) => setUpdatedYear(e.target.value)}
            className="input input-bordered w-full mb-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
            min="1900"
            max={new Date().getFullYear()}
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            className="textarea textarea-bordered w-full mb-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
            placeholder="Write a description of your review"
          ></textarea>
        </div>

        <div>
          <label>Cover Image URL</label>
          <input
            type="url"
            value={updatedCoverImage}
            onChange={(e) => setUpdatedCoverImage(e.target.value)}
            className="input input-bordered w-full mb-4 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
            placeholder="Enter URL of the cover image"
          />
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

        <div className="mb-4">
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

        <div className="flex gap-2 justify-center">
          <button
            onClick={handleUpdate}
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700"
          >
            Update
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateReviewModal;
