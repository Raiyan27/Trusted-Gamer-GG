import { Link } from "react-router-dom";

const GameCard = ({ game }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all">
      <img
        src={game.coverImage}
        alt={game.title}
        className="w-full h-80 object-center rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-900">{game.title}</h3>
      <p className="text-sm text-gray-500 mt-1">
        {game.genre} - {game.publishingYear}
      </p>
      <div className="flex items-center mt-2">
        <span className="text-yellow-500">⭐ {game.rating}</span>
      </div>
      <Link
        to={`/review/${game._id}`}
        className="mt-4 inline-block bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 text-center"
      >
        Explore Details
      </Link>
    </div>
  );
};

export default GameCard;
