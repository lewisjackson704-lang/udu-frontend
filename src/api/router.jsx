import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Explore from "./pages/Explore.jsx";
import VideoWatch from "./pages/VideoWatch.jsx";
import Live from "./pages/Live.jsx";
import Studio from "./pages/Studio.jsx";
import Profile from "./pages/Profile.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Error404 from "./pages/Error404.jsx";
import Sidebar from "./components/Navigation/Sidebar.jsx";
import BottomNav from "./components/Navigation/BottomNav.jsx";
import { useAuth } from "./context/AuthContext.jsx";

// Protected Route Wrapper
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <p className="text-white text-center mt-10">Loading...</p>; // Show loading state
  }

  if (!user) {
    return <Login />; // Redirect to the login page if the user is not authenticated
  }

  return children; // Render the children if the user is authenticated
}

// Main Layout Wrapper
function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black text-white">
      {/* Sidebar (Desktop Only) */}
      <aside className="hidden md:flex w-[260px] bg-black/50 border-r border-white/10 backdrop-blur-md">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>

      {/* Bottom Navigation (Mobile Only) */}
      <div className="md:hidden fixed bottom-0 w-full z-50">
        <BottomNav />
      </div>
    </div>
  );
}

// Define Routes
const routes = [
  {
    path: "/",
    element: (
      <AppLayout>
        <Home />
      </AppLayout>
    ),
  },
  {
    path: "/explore",
    element: (
      <AppLayout>
        <Explore />
      </AppLayout>
    ),
  },
  {
    path: "/video/:id",
    element: (
      <AppLayout>
        <VideoWatch />
      </AppLayout>
    ),
  },
  {
    path: "/live",
    element: (
      <AppLayout>
        <Live />
      </AppLayout>
    ),
  },
  {
    path: "/studio",
    element: (
      <ProtectedRoute>
        <AppLayout>
          <Studio />
        </AppLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile/:id",
    element: (
      <AppLayout>
        <Profile />
      </AppLayout>
    ),
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <Error404 />,
  },
];

// Create Router
const router = createBrowserRouter(routes);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
