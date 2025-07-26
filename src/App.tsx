import { useState, useEffect } from "react";
import axios from "axios";
import Routers from "./routes";
import "./theme-dark-bootstrap.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const apiUrl = process.env.REACT_APP_API_URL

    if (!token) {
      setIsLoading(false);
      return;
    }

    axios
      .get(`${apiUrl}/auth/valid?token=${token}`)
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div onAuxClick={(e) => e.preventDefault()} onContextMenu={(e) => e.preventDefault()} className="min-vh-100 d-flex flex-column">
      <Routers user={isAuthenticated} />
    </div>
  );
}

export default App;
