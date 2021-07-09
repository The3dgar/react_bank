import React from "react";
import "antd/dist/antd.css";
import "./assets/styles/index.scss";

import { AppRouter } from "./router/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import { BankProvider } from "./context/BankContext";

const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      <BankProvider>{children}</BankProvider>
    </AuthProvider>
  );
};

function App() {
  return (
    <AppState>
      <AppRouter />
    </AppState>
  );
}

export default App;
