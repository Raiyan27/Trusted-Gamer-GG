import { useEffect, useState } from "react";
import GameCard from "../components/GameCard";

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [latestReviews, setLatestReviews] = useState([]);
  const [trendingGames, setTrendingGames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((res) => res.json())
      .then((data) => {
        setGames(data);

        const sortedReviews = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setLatestReviews(sortedReviews.slice(0, 3));

        const gameCounts = data.reduce((acc, game) => {
          acc[game.title] = (acc[game.title] || 0) + 1;
          return acc;
        }, {});
        const trendingGamesData = Object.entries(gameCounts)
          .map(([title, count]) => ({
            title,
            count,
          }))
          .sort((a, b) => b.count - a.count);
        setTrendingGames(trendingGamesData.slice(0, 3));
      });
  }, []);

  const topRatedGames = games.sort((a, b) => b.rating - a.rating).slice(0, 6);

  return (
    <div>
      <div>
        <h1>Banner</h1>
        <div className="h-72"></div>
      </div>

      <div className="my-8 px-6">
        <h2 className="text-3xl font-bold text-center mb-6">
          Highest Rated Games
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {topRatedGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>

      <div className="my-28 px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Latest Game Reviews
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {latestReviews.map((review) => (
            <GameCard key={review._id} game={review} />
          ))}
        </div>
      </div>

      <div className="my-8 px-6">
        <div className="bg-gray-200 p-6 rounded-lg mb-6">
          <h3 className="text-2xl font-semibold">Trending Games</h3>
          <ul className="mt-4">
            {trendingGames.map((game, index) => (
              <li key={index} className="mb-4">
                <h4 className="text-xl font-medium">{game.title}</h4>
                <p>{game.count} Reviews</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="my-8 px-6">
        <div className="bg-gray-200 p-6 rounded-lg mb-6">
          <h3 className="text-2xl font-semibold">Extra Section 1</h3>
          <p className="mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            sunt fugit cum soluta numquam quae sint. Quia magnam dolores sequi
            doloremque dolor, enim, nisi itaque et asperiores tempora, nam
            molestias?
          </p>
        </div>
        <div className="bg-gray-200 p-6 rounded-lg">
          <h3 className="text-2xl font-semibold">Extra Section 2</h3>
          <p className="mt-4">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus
            modi iure deserunt? Provident, amet, eum aut neque ipsa laudantium
            veniam est, ad nostrum quas repudiandae magnam tenetur aspernatur
            magni rerum!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
