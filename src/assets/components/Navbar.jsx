import { Link, useNavigate, useLocation } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Authentication/AuthContext";
import { Typewriter } from "react-simple-typewriter";
import { FaBars } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (currentUser) {
      setDropdownOpen(false);
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("You have logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const isActiveLink = (path) => location.pathname === path;

  return (
    <>
      <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold w-32">
          <Link
            to="/"
            className="flex gap-2 whitespace md:whitespace-nowrap"
            onClick={closeMenu}
          >
            Trusted Gamer
            <div className="text-yellow-300">
              <Typewriter
                words={["GG", "Good Game"]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </div>
          </Link>
        </div>

        <ul className="space-x-4 hidden md:flex">
          <li>
            <Link
              to="/"
              className={`hover:text-gray-400 ${
                isActiveLink("/") ? "text-yellow-300" : ""
              }`}
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/reviews"
              className={`hover:text-gray-400 ${
                isActiveLink("/reviews") ? "text-yellow-300" : ""
              }`}
              onClick={closeMenu}
            >
              All Reviews
            </Link>
          </li>
          {currentUser && (
            <ul className="flex space-x-4">
              <li>
                <Link
                  to="/addReview"
                  className={`hover:text-gray-400 ${
                    isActiveLink("/addReview") ? "text-yellow-300" : ""
                  }`}
                  onClick={closeMenu}
                >
                  Add Review
                </Link>
              </li>
              <li>
                <Link
                  to="/myReviews"
                  className={`hover:text-gray-400 ${
                    isActiveLink("/myReviews") ? "text-yellow-300" : ""
                  }`}
                  onClick={closeMenu}
                >
                  My Reviews
                </Link>
              </li>
              <li>
                <Link
                  to="/myWatchlist"
                  className={`hover:text-gray-400 ${
                    isActiveLink("/myWatchlist") ? "text-yellow-300" : ""
                  }`}
                  onClick={closeMenu}
                >
                  Game Watchlist
                </Link>
              </li>
            </ul>
          )}
        </ul>

        <button className="md:hidden text-white" onClick={toggleMenu}>
          <FaBars className="w-6 h-6" />
        </button>

        <ul
          className={`absolute bg-gray-800 text-white top-20 left-0 right-0 p-4 md:hidden flex flex-col gap-4 z-50 ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <li>
            <Link
              to="/"
              className={`hover:text-gray-400 ${
                isActiveLink("/") ? "text-yellow-300" : ""
              }`}
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/reviews"
              className={`hover:text-gray-400 ${
                isActiveLink("/reviews") ? "text-yellow-300" : ""
              }`}
              onClick={closeMenu}
            >
              All Reviews
            </Link>
          </li>
          {!currentUser && (
            <>
              <li>
                <Link
                  to="/login"
                  className={`hover:text-gray-400 ${
                    isActiveLink("/login") ? "text-yellow-300" : ""
                  }`}
                  onClick={closeMenu}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className={`hover:text-gray-400 ${
                    isActiveLink("/register") ? "text-yellow-300" : ""
                  }`}
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </li>
            </>
          )}
          {currentUser && (
            <>
              <li>
                <Link
                  to="/addReview"
                  className={`hover:text-gray-400 ${
                    isActiveLink("/addReview") ? "text-yellow-300" : ""
                  }`}
                  onClick={closeMenu}
                >
                  Add Review
                </Link>
              </li>
              <li>
                <Link
                  to="/myReviews"
                  className={`hover:text-gray-400 ${
                    isActiveLink("/myReviews") ? "text-yellow-300" : ""
                  }`}
                  onClick={closeMenu}
                >
                  My Reviews
                </Link>
              </li>

              <li>
                <Link
                  to="/myWatchlist"
                  className={`hover:text-gray-400 ${
                    isActiveLink("/myWatchlist") ? "text-yellow-300" : ""
                  }`}
                  onClick={closeMenu}
                >
                  Game Watchlist
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-500 hover:bg-gray-600 p-2 rounded-md"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>

        <ul className="space-x-4 hidden md:flex">
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
                <Link
                  to="/login"
                  className={`hover:text-gray-400 ${
                    isActiveLink("/login") ? "text-yellow-300" : ""
                  }`}
                  onClick={closeMenu}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className={`hover:text-gray-400 ${
                    isActiveLink("/register") ? "text-yellow-300" : ""
                  }`}
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
