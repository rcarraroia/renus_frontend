import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold mb-4 text-primary">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Oops! Página não encontrada.</p>
        <a href="/" className="text-primary hover:text-primary/80 underline font-medium transition-colors">
          Retornar à Home (RENUS Core)
        </a>
      </div>
    </div>
  );
};

export default NotFound;