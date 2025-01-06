import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const HowToReview = () => {
  return (
    <div className="p-4 min-h-screen bg-gray-100 dark:bg-gray-900">
      <Helmet>
        <title>Trusted Gamer GG - How to Review</title>
      </Helmet>
      <div className="container mx-auto">
        <h1 className="text-4xl font-semibold text-center mb-8 text-gray-900 dark:text-white">
          How to Review a Game
        </h1>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg mb-12">
          <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-6">
            Step 1: Create an Account (if you don't have one)
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-4">
            In order to submit a game review, you need to have an account on
            Trusted Gamer GG. If you don't have one already, follow the link
            below to create an account.
          </p>
          <div className="flex justify-center">
            <Link
              to="/register"
              className="bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-800"
            >
              Create an Account
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg mb-12">
          <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-6">
            Step 2: Navigate to the Review Page
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-4">
            Once you're logged in, navigate to the "Add Review" page. This is
            where you'll be able to share your thoughts about the game you
            recently played.
          </p>
          <div className="flex justify-center">
            <Link
              to="/addReview"
              className="bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-800"
            >
              Go to Add Review
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg mb-12">
          <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-6">
            Step 3: Fill in the Review Form
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-4">
            On the "Add Review" page, you'll be asked to fill out a form with
            the game’s cover image URL, title, description, rating, publishing
            year, and genre. Make sure to provide as much detail as possible so
            that other gamers can benefit from your review!
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg mb-12">
          <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-6">
            Step 4: Submit Your Review
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-4">
            After filling out the form, click the "Submit Review" button. Your
            review will be sent to the Trusted Gamer GG database and visible to
            other users on the platform. It’s that easy!
          </p>
        </div>

        <div className="text-center mb-12">
          <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
            Ready to Share Your Thoughts?
          </h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            We value your feedback! Start by creating your account and head over
            to the review page to begin your gaming journey.
          </p>
          <div className="flex justify-center">
            <Link
              to="/addReview"
              className="bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-800"
            >
              Add Your Review Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToReview;
