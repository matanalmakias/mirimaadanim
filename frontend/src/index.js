import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./context/AuthContext";
import { CateringProvider, SocketContext } from "./context/CateringContext";
import StoreProvider from "./context/StoreContext";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <CateringProvider>
        <StoreProvider>
          <App />
        </StoreProvider>
      </CateringProvider>
    </AuthContextProvider>
  </BrowserRouter>
);

reportWebVitals();
