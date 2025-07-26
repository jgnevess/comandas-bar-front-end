import React, { JSX, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { handleValidToken } from "../services/authservice/authservice";

interface Props {
  children: JSX.Element;
  roles: string[];
}

const PrivateRouter = ({ children, roles }: Props) => {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const token = localStorage.getItem("token");

    if (!token) {
      if (isMounted) {
        setRole(null);
        setLoading(false);
      }
      return;
    }

    handleValidToken(token)
      .then(response => {
        if (isMounted) {
          setRole(response.role!);
        }
      })
      .catch(() => {
        if (isMounted) setRole(null);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return null; // ou um spinner, tipo: <div>Carregando...</div>

  if (!role || !roles.includes(role)) {
    return <Navigate to="/redirect" replace />;
  }

  return children;
};

export default PrivateRouter;
