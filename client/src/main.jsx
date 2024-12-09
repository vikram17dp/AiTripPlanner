import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTrip from "./create-trip/CreateTrip";
import Header from "./components/custom/Header";
import AboutPage from "./create-trip/AboutPage";
import { Toaster } from "./components/ui/sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Signin from "./authentication/Signin";
import AppContextProvider from "./context/AppContext";
import SignUp from "./authentication/SignUp";
import PublicRoute from "./authentication/PublicRoute ";
import ProtectedRoute from "./authentication/ProtectedRoute";
import ProfilePage from "./authentication/ProfilePage";
import ViewTrip from "./view-trip/components/Index";
import MyTrips from "./my-trips/MyTrips";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <App />
      </>
    ),
  },
  {
    path: "/create-trip",
    element: (
      <>
        <Header />
        <CreateTrip />
      </>
    ),
  },
  {
    path: "/aboutpage",
    element: (
      <>
        <Header />
        <AboutPage />
      </>
    ),
  },
  {
    path: "/signin",
    element: (
      <>
        <Header />
        <PublicRoute>
          <Signin />
        </PublicRoute>
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <Header />
        <PublicRoute>
          <SignUp />
        </PublicRoute>
      </>
    ),
  },
  {
    path: "/view-trip/:tripid",
    element: (
      <>
        <Header />
        <ViewTrip/>
      </>
    ),
  },
  {
    path: "/my-trips",
    element: (
      <>
        <Header />
        <MyTrips/>
      </>
    ),
  },
  {
    path: "/my-profile",
    element: (
      <>
        <Header />
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      </>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <AppContextProvider>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <RouterProvider router={router} />
      <Toaster />
    </GoogleOAuthProvider>
  </AppContextProvider>
);
