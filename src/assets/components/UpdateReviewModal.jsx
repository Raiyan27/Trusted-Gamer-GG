import { useState } from "react";

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
      <div className="modal-box">
        <h2 className="text-2xl mb-4">Update Review</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div>
          <label>Game Title</label>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            className="input input-bordered w-full mb-4"
          />
        </div>

        <div>
          <label>Rating</label>
          <input
            type="number"
            value={updatedRating}
            onChange={(e) => setUpdatedRating(e.target.value)}
            className="input input-bordered w-full mb-4"
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
            className="input input-bordered w-full mb-4"
          />
        </div>

        <div>
          <label>Year</label>
          <input
            type="number"
            value={updatedYear}
            onChange={(e) => setUpdatedYear(e.target.value)}
            className="input input-bordered w-full mb-4"
            min="1900"
            max={new Date().getFullYear()}
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            className="textarea textarea-bordered w-full mb-4"
            placeholder="Write a description of your review"
          ></textarea>
        </div>

        <div>
          <label>Cover Image URL</label>
          <input
            type="url"
            value={updatedCoverImage}
            onChange={(e) => setUpdatedCoverImage(e.target.value)}
            className="input input-bordered w-full mb-4"
            placeholder="Enter URL of the cover image"
          />
        </div>

        <div className="flex gap-2 justify-center">
          <button
            onClick={handleUpdate}
            className="bg-indigo-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateReviewModal;