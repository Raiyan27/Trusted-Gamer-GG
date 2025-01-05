import { FaFacebook, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 text-center md:flex justify-between px-8">
      <div className="flex gap-2 items-center justify-center">
        <img className="w-8" src="/logo.png" alt="" />
        <p>
          Trusted Gamer <span className="text-yellow-300">GG</span>
        </p>
      </div>
      <div>
        <p>
          © 2024 Trusted Gamer <span className="text-yellow-300">GG</span>. All
          rights reserved.
        </p>
      </div>
      <div className="flex gap-2 text-2xl justify-center">
        <a href="https://www.facebook.com/Raiyan.27.7" target="_blank">
          <FaFacebook />
        </a>
        <a
          href="https://www.linkedin.com/in/abdullah-al-raiyan-363199209/"
          target="_blank"
        >
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
