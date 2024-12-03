import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./assets/Authentication/AuthContext";

import Root from "./assets/pages/Root";
import ErrorPage from "./assets/pages/ErrorPage";
import HomePage from "./assets/pages/HomePage";
import Login from "./assets/pages/Login";
import Register from "./assets/pages/Register";
import PrivateRoute from "./assets/components/PrivateRoute";
import AddReview from "./assets/components/AddReview";
import AllReviews from "./assets/components/AllReviews";
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
        path: "myReviews",
        element: <PrivateRoute></PrivateRoute>,
      },
      {
        path: "reviews",
        element: (
          <PrivateRoute>
            <AllReviews />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
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
