import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "remixicon/fonts/remixicon.css";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./context/AuthContext";
import { CateringProvider, SocketContext } from "./context/CateringContext";
import StoreProvider from "./context/StoreContext";
import "react-toastify/dist/ReactToastify.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <div className="container">
    <BrowserRouter>
      <AuthContextProvider>
        <CateringProvider>
          <StoreProvider>
            <App />
          </StoreProvider>
        </CateringProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </div>
);

reportWebVitals();
