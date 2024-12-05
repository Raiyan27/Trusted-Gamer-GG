import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "../Authentication/firebase.init";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Helmet } from "react-helmet";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must contain at least 6 characters, including uppercase, lowercase, and a number."
      );
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL || "https://www.example.com/default-avatar.png",
      });

      toast.success("Registration Successful!");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed.");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);

      toast.success("Login Successful!");
      navigate("/");
    } catch (error) {
      toast.error("Google login failed.");
      console.error("Google login error:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <title>Trusted Gamer GG - Register</title>
      </Helmet>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-6">
          Create Your Account on Trusted Gamer GG
        </h2>
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label
              htmlFor="photoURL"
              className="block text-lg font-medium text-gray-700 dark:text-gray-300"
            >
              Photo URL (Optional)
            </label>
            <input
              type="url"
              id="photoURL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-lg font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg mt-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            Register
          </button>
        </form>

        <div className="flex items-center justify-between mt-6">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            <FcGoogle />
            <span className="text-gray-700 dark:text-white ml-2">
              Register with Google
            </span>
          </button>
        </div>

        <div className="text-center mt-4">
          <Link
            to="/login"
            className="text-sm text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
