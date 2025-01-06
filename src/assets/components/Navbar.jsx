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
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
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

  const toggleMoreDropdown = () => {
    setIsMoreDropdownOpen((prev) => !prev);
  };

  const closeMoreMenu = () => {
    setIsMoreDropdownOpen(false);
  };

  const isActiveLink = (path) => location.pathname === path;

  return (
    <>
      <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="text-2xl font-bold w-32">
          <Link
            to="/"
            className="flex gap-2 whitespace sm:whitespace-nowrap"
            onClick={closeMenu}
          >
            Trusted Gamer
            <div className="text-yellow-300">
              <Typewriter
                words={["GG", "🎮🕹️"]}
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

        <ul className="space-x-4 hidden lg:flex">
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
            <ul className="space-x-4 hidden md:flex">
              <li>
                <Link
                  to="/about"
                  className={`hover:text-gray-400 ${
                    isActiveLink("/about") ? "text-yellow-300" : ""
                  }`}
                  onClick={closeMenu}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`hover:text-gray-400 ${
                    isActiveLink("/contact") ? "text-yellow-300" : ""
                  }`}
                  onClick={closeMenu}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/how-to-review"
                  className={`hover:text-gray-400 ${
                    isActiveLink("/how-to-review") ? "text-yellow-300" : ""
                  }`}
                  onClick={closeMenu}
                >
                  How to Review
                </Link>
              </li>
            </ul>
          )}
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
              <li className="relative group">
                <button
                  onClick={toggleMoreDropdown}
                  className={`hover:text-gray-400 ${
                    isActiveLink("/contact") ||
                    isActiveLink("/about") ||
                    isActiveLink("/how-to-review")
                      ? "text-yellow-300"
                      : ""
                  }`}
                >
                  More
                </button>
                {isMoreDropdownOpen && (
                  <ul className="absolute left-0 mt-2 w-36 p-4 bg-gray-800 borde rounded shadow-lg">
                    <li>
                      <Link
                        to="/about"
                        className={`hover:text-gray-400 ${
                          isActiveLink("/about") ? "text-yellow-300" : ""
                        }`}
                        onClick={closeMoreMenu}
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/contact"
                        className={`hover:text-gray-400 ${
                          isActiveLink("/contact") ? "text-yellow-300" : ""
                        }`}
                        onClick={closeMoreMenu}
                      >
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/how-to-review"
                        className={`hover:text-gray-400 ${
                          isActiveLink("/how-to-review")
                            ? "text-yellow-300"
                            : ""
                        }`}
                        onClick={closeMoreMenu}
                      >
                        How to Review
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </ul>

        <button className="lg:hidden text-white" onClick={toggleMenu}>
          <FaBars className="w-6 h-6" />
        </button>

        <ul
          className={`absolute bg-gray-800 text-white top-20 left-0 right-0 p-4 lg:hidden flex flex-col gap-4 z-50 ${
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
            </>
          )}
          <li>
            <Link
              to="/about"
              className={`hover:text-gray-400 ${
                isActiveLink("/about") ? "text-yellow-300" : ""
              }`}
              onClick={closeMenu}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/how-to-review"
              className={`hover:text-gray-400 ${
                isActiveLink("/how-to-review") ? "text-yellow-300" : ""
              }`}
              onClick={closeMenu}
            >
              How to Review
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`hover:text-gray-400 ${
                isActiveLink("/contact") ? "text-yellow-300" : ""
              }`}
              onClick={closeMenu}
            >
              Contact Us
            </Link>
          </li>
          {currentUser && (
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left text-red-500 hover:bg-gray-600 p-2 rounded-md"
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        <ul className="space-x-4 hidden lg:flex">
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
