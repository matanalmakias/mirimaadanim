import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";
import "./index.css";
import "remixicon/fonts/remixicon.css";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals.js";
import "react-quill/dist/quill.snow.css"; // import the styles
import { AuthContextProvider } from "./context/AuthContext.jsx";
import "react-toastify/dist/ReactToastify.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ShabatFoodProvider } from "./context/shabat-food/ShabatFoodContext.jsx";
import { SaladProvider } from "./context/salads/SaladContext.jsx";
import { PackageProvider } from "./context/package/PackageContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <div className="text-center" dir="rtl">
    <BrowserRouter>
      <AuthContextProvider>
        <ShabatFoodProvider>
          <SaladProvider>
            <PackageProvider>
              <App />
            </PackageProvider>
          </SaladProvider>
        </ShabatFoodProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </div>
);

reportWebVitals();
