import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      `404 Error: User attempted to access non-existent route: ${location.pathname}`
    );
    // Optional: Send to analytics service
    // analytics.track("404 Error", { path: location.pathname });
  }, [location.pathname]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <section className="text-center px-4">
        <h1 className="text-6xl font-extrabold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">
          Oops! The page <span className="font-mono">{location.pathname}</span> does not exist.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-[#2E9E83] text-white rounded-lg hover:bg-[#39BF9D] transition-colors"
        >
          Return to Home
        </Link>
      </section>
    </main>
  );
};

export default NotFound;
