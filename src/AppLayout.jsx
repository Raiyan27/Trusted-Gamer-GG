import { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import animationData from "./assets/toggleAnimation.json";

const AppLayout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const lottieRef = useRef(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);

    if (lottieRef.current) {
      lottieRef.current.playSegments(newMode ? [10, 40] : [40, 80], true);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {children}
      <div
        className="fixed bottom-1 left-1 md:bottom-6 md:left-6 p-3 cursor-pointer"
        onClick={toggleDarkMode}
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={false}
          autoplay={false}
          style={{ width: 60, height: 60, borderRadius: "50%" }}
        />
      </div>
    </div>
  );
};

export default AppLayout;
