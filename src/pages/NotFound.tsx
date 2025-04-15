
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

/**
 * NotFound Page
 * 
 * Displayed when a user attempts to access a non-existent route.
 * Features:
 * - 404 error message
 * - Link to return to the home page
 * - Logs the attempted route to the console for debugging
 */
const NotFound = () => {
  const location = useLocation();

  // Log the attempted route for debugging purposes
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
