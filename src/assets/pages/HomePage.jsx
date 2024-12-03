import { useEffect, useState } from "react";
import GameCard from "../components/GameCard";

const HomePage = () => {
  const [highestRatedGames, setHighestRatedGames] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/highestRated")
      .then((res) => res.json())
      .then((data) => setHighestRatedGames(data));
  }, []);

  return (
    <div>
      <div>
        <h1>Banner</h1>
        <div className="h-72"></div>
      </div>
      <div className="my-8 px-6">
        <h2 className="text-3xl font-bold mb-6">Highest Rated Games</h2>
        <div className="grid grid-cols-3 gap-6">
          {highestRatedGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
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
