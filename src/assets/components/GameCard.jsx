import { Link } from "react-router-dom";

const GameCard = ({ game }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        src={game.image}
        alt={game.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{game.title}</h3>
        <p className="text-gray-500">Rating: {game.rating}</p>
        <p className="text-gray-500">Released: {game.year}</p>
        <Link
          to={`/review/${game.id}`}
          className="text-blue-500 mt-2 inline-block"
        >
          Explore Details
        </Link>
      </div>
    </div>
  );
};

export default GameCard;
