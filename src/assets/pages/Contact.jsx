import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="p-4 min-h-screen bg-gray-100 dark:bg-gray-900">
      <Helmet>
        <title>Trusted Gamer GG - Contact</title>
      </Helmet>
      <div className="container mx-auto">
        <h1 className="text-4xl font-semibold text-center mb-8 text-gray-900 dark:text-white">
          Contact Us
        </h1>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg mb-12">
          <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-6">
            Get in Touch with Trusted Gamer GG
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-4">
            Have any questions, feedback, or concerns? We would love to hear
            from you!
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-4">
            Email us at:{" "}
            <a
              href="mailto:support@trustedgamer.gg"
              className="text-indigo-600 hover:underline dark:text-indigo-400"
            >
              support@trustedgamer.gg
            </a>
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg mb-12">
          <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-6">
            Connect with Us on Social Media
          </h2>
          <div className="flex justify-center gap-6 text-3xl mb-4">
            <a
              href="https://www.facebook.com/Raiyan.27.7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="hover:text-indigo-600 dark:hover:text-indigo-400" />
            </a>
            <a
              href="https://www.linkedin.com/in/abdullah-al-raiyan-363199209/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="hover:text-indigo-600 dark:hover:text-indigo-400" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
