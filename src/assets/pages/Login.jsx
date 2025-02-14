import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "../Authentication/firebase.init";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { Helmet } from "react-helmet";
import Lottie from "lottie-react";
import animationData from "../Lottie/loginAnimation.json";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast.success("Login Successful!");
      navigate("/");
    } catch (error) {
      toast.error("Invalid email or password.");
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
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <title>Trusted Gamer GG - Login</title>
      </Helmet>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-center text-gray-900 dark:text-white mb-6">
          Welcome Back to Trusted Gamer GG
        </h2>
        <form onSubmit={handleEmailPasswordLogin} className="space-y-6">
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
            Login
          </button>
        </form>
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            <FcGoogle />
            <span className="text-gray-700 dark:text-white ml-2">
              Login with Google
            </span>
          </button>
        </div>
        <div className="text-center mt-4">
          <Link
            to="/register"
            className="text-sm text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Don't have an account? Register
          </Link>
        </div>
      </div>

      <Lottie
        className="ml-12 hidden md:flex"
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: 300, height: 600, borderRadius: "50%" }}
      />
    </div>
  );
};

export default Login;
