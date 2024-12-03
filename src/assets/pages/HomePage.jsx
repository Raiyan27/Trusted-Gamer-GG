import React from "react";
import Slider from "react-slick";
import GameCard from "../components/GameCard";

const HomePage = () => {
  const highestRatedGames = [
    {
      id: 1,
      title: "Game 1",
      rating: 5,
      image: "https://via.placeholder.com/300",
      year: 2023,
    },
    {
      id: 2,
      title: "Game 2",
      rating: 4.8,
      image: "https://via.placeholder.com/300",
      year: 2023,
    },
    {
      id: 3,
      title: "Game 3",
      rating: 4.7,
      image: "https://via.placeholder.com/300",
      year: 2023,
    },
    {
      id: 4,
      title: "Game 4",
      rating: 4.6,
      image: "https://via.placeholder.com/300",
      year: 2023,
    },
    {
      id: 5,
      title: "Game 5",
      rating: 4.5,
      image: "https://via.placeholder.com/300",
      year: 2023,
    },
    {
      id: 6,
      title: "Game 6",
      rating: 4.4,
      image: "https://via.placeholder.com/300",
      year: 2023,
    },
  ];

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
