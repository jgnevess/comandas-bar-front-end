import React, { useEffect } from "react";
import { handleValidToken } from "../services/authservice/authservice";

const Redirect = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    handleValidToken(token).then(res => {
      if (res.role === "ADMIN") {
        window.location.href = "/admin";
      } else if (res.role === "SELLER") {
        window.location.href = "/seller";
      } else if (res.role === "SUPER") {
        window.location.href = "/register";
      } else {
        window.location.href = "/login";
      }
    }).catch(() => {
      window.location.href = "/login";
    });
  }, []);

  return null;
};

export default Redirect;
