import React, { useContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { BankRouter } from "./BankRouter";
import { AuthRouter } from "./AuthRouter";
import { AuthContext } from "../context/AuthContext";

export const AppRouter = () => {
  const { status } = useContext(AuthContext);

  return (
    <Router>
      {status === "authenticated" ? <BankRouter /> : <AuthRouter />}
    </Router>
  );
};
