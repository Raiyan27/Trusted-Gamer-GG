import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../Authentication/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
        {currentUser && (
          <ul className="flex space-x-4">
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
                Game Watchlist
              </Link>
            </li>
          </ul>
        )}
      </ul>
      <ul className="flex space-x-4">
        {currentUser ? (
          <>
            <li className="flex items-center space-x-2">
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <span className="text-gray-400">Profile</span>
              )}
              <button
                onClick={handleLogout}
                className="ml-2 cursor-pointer hover:text-gray-400"
              >
                Logout
              </button>
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
