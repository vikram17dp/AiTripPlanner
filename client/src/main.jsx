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
        <AboutPage/>
      </>
    ),
  },
  {
    path: "/signin",
    element: (
      <>
        <Header />
        <Signin/>
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <Header />
        <SignUp/>
      </>
    ),
  },
  
]);

createRoot(document.getElementById("root")).render(
  <AppContextProvider>

    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
    <RouterProvider router={router} />
    <Toaster />
    </GoogleOAuthProvider>;
  </AppContextProvider>
);
