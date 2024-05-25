import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { AuthContext } from "./context/AuthContext.js";
import { BrowserRouter } from "react-router-dom";

const valueContext = JSON.parse(localStorage.getItem(`userStatus`));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContext.Provider value={{ valueContext }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContext.Provider>
  </React.StrictMode>
);
