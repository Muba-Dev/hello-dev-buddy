import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

/** Rendered inside MainLayout for the public site's wildcard route. */
const NotFound = () => (
  <div className="container flex min-h-[50vh] flex-col items-center justify-center py-16 text-center">
    <p className="eyebrow mb-3">404</p>
    <h1 className="text-4xl md:text-5xl mb-4">Page not found</h1>
    <p className="text-muted-foreground mb-8 max-w-md">
      The page you were looking for has moved or does not exist. Head back to the
      home page to find what you need.
    </p>
    <Button asChild>
      <Link to="/">Return to home</Link>
    </Button>
  </div>
);

export default NotFound;
