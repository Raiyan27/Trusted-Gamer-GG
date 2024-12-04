import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Authentication/AuthContext";
import Typewriter from "react-typewriter-effect";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setDropdownOpen(false);
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold">
        <Link to="/" className="whitespace-nowrap">
          Trusted Gamer{" "}
          <span className="text-yellow-300">
            <Typewriter text="GG" cursorColor="yellow" />
          </span>
        </Link>
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
          <li className="relative group">
            <div
              className="flex items-center cursor-pointer"
              onClick={toggleDropdown}
            >
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL || "/propicdemo.png"}
                  alt="User Avatar"
                  className="w-12 h-12 rounded-full"
                />
              ) : (
                <span className="text-gray-400">Profile</span>
              )}

              <span className="absolute right-0 top-10 hidden group-hover:block text-sm bg-gray-700 text-white p-2 rounded-md shadow-lg">
                {currentUser.displayName || "User"}
              </span>
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-gray-700 p-2 rounded-lg shadow-lg w-48 z-10">
                <div className="text-white text-sm p-2">
                  {currentUser.displayName}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-500 hover:bg-gray-600 p-2 rounded-md"
                >
                  Logout
                </button>
              </div>
            )}
          </li>
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
