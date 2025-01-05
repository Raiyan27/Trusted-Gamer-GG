import { useEffect, useState } from "react";
import GameCard from "../components/GameCard";
import { Fade } from "react-awesome-reveal";
import { Helmet } from "react-helmet";

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [latestReviews, setLatestReviews] = useState([]);
  const [trendingGames, setTrendingGames] = useState([]);
  const [upcomingGames, setUpcomingGames] = useState([]);

  const [loadingGames, setLoadingGames] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [loadingTrendingGames, setLoadingTrendingGames] = useState(true);
  const [loadingUpcomingGames, setLoadingUpcomingGames] = useState(true);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    fetch("https://trusted-gamer-gg-server.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => {
        setGames(data);

        const sortedReviews = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setLatestReviews(sortedReviews.slice(0, 4));

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

        setLoadingGames(false);
        setLoadingReviews(false);
        setLoadingTrendingGames(false);
      });

    fetch("https://trusted-gamer-gg-server.vercel.app/upcoming")
      .then((res) => res.json())
      .then((data) => {
        setUpcomingGames(data);
        setLoadingUpcomingGames(false);
      });
  }, [darkMode]);

  const topRatedGames = games.sort((a, b) => b.rating - a.rating).slice(0, 8);

  const goToPreviousSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? 2 : prev - 1));
  };

  const goToNextSlide = () => {
    setActiveSlide((prev) => (prev === 2 ? 0 : prev + 1));
  };

  const slides = [
    {
      title: "Explore the Best Games",
      description: "Find top-rated games and reviews.",
      link: "#highest-rated-games",
      buttonText: "Explore Top-Rated Games",
      background: "url('https://i.ibb.co.com/bHRPSw7/wp11512663.jpg')",
    },
    {
      title: "Latest Game Reviews",
      description: "Read the latest reviews from real gamers.",
      link: "#latest-reviews",
      buttonText: "Explore Reviews",
      background:
        "url('https://i.ibb.co.com/BK98kWp/d483bf8f118ffc485524853bdcbeffb9.jpg')",
    },
    {
      title: "Upcoming Games",
      description: "Discover which games are trending right now.",
      link: "#trending-games",
      buttonText: "Explore Upcoming Games",
      background:
        "url('https://i.ibb.co.com/KG6sjLc/ultra-wide-gaming-xggy0lln5knwa073.jpg')",
    },
  ];

  const renderLoadingSpinner = () => (
    <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );

  return (
    <div className="p-4 min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
      <Helmet>
        <title>Trusted Gamer GG - Home</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Home</h1>

        <div className="relative overflow-hidden">
          <div className="w-full h-[400px] -z-50">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-transform duration-500 ease-in-out md:bg-cover bg-no-repeat rounded-xl ${
                  activeSlide === index
                    ? "translate-x-0"
                    : index < activeSlide
                    ? "-translate-x-full"
                    : "translate-x-full"
                }`}
                style={{ backgroundImage: slide.background }}
              >
                <div className="absolute inset-0 text-center text-white flex justify-center items-center flex-col">
                  <div className="bg-[rgba(0,0,0,0.7)] p-4 rounded-xl">
                    <h2 className="text-4xl font-semibold mb-4">
                      {slide.title}
                    </h2>
                    <p className="mb-6 text-lg">{slide.description}</p>
                    <a
                      href={slide.link}
                      className="bg-yellow-400 text-black py-2 px-6 rounded-full hover:bg-yellow-500 transition"
                    >
                      {slide.buttonText}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={goToPreviousSlide}
            className="absolute left-4 top-1/2 transform translate-y-8 md:-translate-y-1/2 bg-yellow-400 text-black p-3 rounded-full shadow-lg hover:bg-yellow-500 transition"
          >
            &lt;
          </button>
          <button
            onClick={goToNextSlide}
            className="absolute right-4 top-1/2 transform translate-y-8 md:-translate-y-1/2 bg-yellow-400 text-black p-3 rounded-full shadow-lg hover:bg-yellow-500 transition"
          >
            &gt;
          </button>
        </div>

        <div id="highest-rated-games" className="my-24">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Highest Rated Games
          </h2>
          {loadingGames ? (
            renderLoadingSpinner()
          ) : topRatedGames.length === 0 ? (
            <p className="text-center text-xl font-semibold text-gray-500">
              No top-rated games available.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {topRatedGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}
        </div>

        <div id="latest-reviews" className="mb-24">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Latest Game Reviews
          </h2>
          {loadingReviews ? (
            renderLoadingSpinner()
          ) : latestReviews.length === 0 ? (
            <p className="text-center text-xl font-semibold text-gray-500">
              No recent reviews available.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestReviews.map((review) => (
                <GameCard key={review._id} game={review} />
              ))}
            </div>
          )}
        </div>

        <div id="upcoming-games" className="my-24">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Upcoming Games
          </h2>
          {loadingUpcomingGames ? (
            renderLoadingSpinner()
          ) : upcomingGames.length === 0 ? (
            <p className="text-center text-xl font-semibold text-gray-500">
              No upcoming games available.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingGames.map((game, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg"
                >
                  <img
                    src={game.imageUrl}
                    alt={game.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-medium dark:text-white text-black">
                    {game.title}
                  </h3>
                  <Fade direction="up" cascade>
                    <p className="text-gray-400">{`Expected Release: ${game.releaseDate}`}</p>
                  </Fade>
                </div>
              ))}
            </div>
          )}
        </div>

        <div id="trending-games" className="my-12">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Most Reviewed Games
          </h2>
          {loadingTrendingGames ? (
            renderLoadingSpinner()
          ) : trendingGames.length === 0 ? (
            <p className="text-center text-xl font-semibold text-gray-500">
              No reviewed games available.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingGames.map((game, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg"
                >
                  <h3 className="text-xl font-medium dark:text-white text-black">
                    {game.title}
                  </h3>
                  <p className=" text-gray-400">{`Review Count: ${game.count}`}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
