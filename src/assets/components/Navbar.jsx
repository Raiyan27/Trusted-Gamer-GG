import { Link } from "react-router-dom";

const Navbar = () => {
  const isLoggedIn = false;

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold">
        <Link to="/">Trusted Gamer GG</Link>
      </div>
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:text-gray-400">
            Home
          </Link>
        </li>
        <li>
          <Link to="/reviews" className="hover:text-gray-400">
            All Reviews
          </Link>
        </li>
      </ul>
      <ul className="flex space-x-4">
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/addReview" className="hover:text-gray-400">
                Add Review
              </Link>
            </li>
            <li>
              <Link to="/myReviews" className="hover:text-gray-400">
                My Reviews
              </Link>
            </li>
            <li>
              <Link to="/myWatchlist" className="hover:text-gray-400">
                Watchlist
              </Link>
            </li>
            <li className="flex items-center">
              <img
                src="https://via.placeholder.com/40"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="ml-2 cursor-pointer hover:text-gray-400">
                Logout
              </span>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="hover:text-gray-400">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-gray-400">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
