import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./assets/Authentication/AuthContext";

import AppLayout from "./AppLayout"; // Import the global layout
import Root from "./assets/pages/Root";
import ErrorPage from "./assets/pages/ErrorPage";
import HomePage from "./assets/pages/HomePage";
import Login from "./assets/pages/Login";
import Register from "./assets/pages/Register";
import PrivateRoute from "./assets/components/PrivateRoute";
import AddReview from "./assets/components/AddReview";
import AllReviews from "./assets/components/AllReviews";
import MyReviews from "./assets/components/MyReviews";
import ReviewDetails from "./assets/components/ReviewDetails";
import MyWatchlist from "./assets/components/MyWatchList";
import AboutPage from "./assets/pages/AboutPage";
import HowToReview from "./assets/pages/HowToReview";
import Contact from "./assets/pages/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "addReview",
        element: (
          <PrivateRoute>
            <AddReview />
          </PrivateRoute>
        ),
      },
      {
        path: "myWatchlist",
        element: (
          <PrivateRoute>
            <MyWatchlist />
          </PrivateRoute>
        ),
      },
      {
        path: "myReviews",
        element: (
          <PrivateRoute>
            <MyReviews />
          </PrivateRoute>
        ),
      },
      {
        path: "reviews",
        element: <AllReviews />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "how-to-review",
        element: <HowToReview />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "review/:id",
        element: <ReviewDetails />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <AppLayout>
        <RouterProvider router={router} />
      </AppLayout>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </AuthProvider>
  </StrictMode>
);
