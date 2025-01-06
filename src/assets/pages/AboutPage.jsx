import { Fade } from "react-awesome-reveal";
import { Helmet } from "react-helmet";

const AboutPage = () => {
  return (
    <div className="p-4 min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">
      <Helmet>
        <title>Trusted Gamer GG - About</title>
        <meta name="description" content="About Trusted Gamer GG" />
      </Helmet>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg mb-12">
          <Fade direction="up">
            <h2 className="text-3xl font-semibold text-center mb-6">
              Welcome to Trusted Gamer GG!
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-6">
              Trusted Gamer GG is a platform where gaming enthusiasts come
              together to share their honest opinions, experiences, and reviews
              about the latest games. Whether you're a casual player or a
              hardcore gamer, this website offers a space for you to discover
              new games, read reviews from fellow gamers, and make informed
              decisions on what to play next.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-6">
              Our goal is to create a community where gamers can help each other
              by sharing valuable insights, experiences, and feedback. Join us
              and become a part of the Trusted Gamer GG family!
            </p>
          </Fade>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg mb-12">
          <Fade direction="up">
            <h3 className="text-2xl font-semibold text-center mb-6">
              Why Trusted Gamer GG?
            </h3>
            <ul className="list-disc text-center list-inside text-lg text-gray-700 dark:text-gray-300">
              <li>Share and read honest reviews from real gamers.</li>
              <li>Discover the latest trends and upcoming game releases.</li>

              <li>Explore top-rated games based on user feedback.</li>
            </ul>
          </Fade>
        </div>

        <div className="text-center mt-12">
          <h3 className="text-3xl font-semibold text-center mb-6">
            Join the Conversation
          </h3>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Your voice matters! Share your reviews, recommendations, and
            experiences with the community. Together, we can make gaming more
            fun and insightful for everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
