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
import { ProductProvider } from "./context/product/ProductContext.jsx";
import { PostProvider } from "./context/post/PostContext.jsx";
import { InventoryProvider } from "./context/inventory/InventoryContext.jsx";
import { OrderProvider } from "./context/order/OrderContext.jsx";
import { CustomerProvider } from "./context/customer/CustomerContext.jsx";
import { BidProvider } from "./context/bid/BidContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <div className="text-center" dir="rtl">
    <BrowserRouter>
      <AuthContextProvider>
        <ShabatFoodProvider>
          <SaladProvider>
            <PackageProvider>
              <ProductProvider>
                <PostProvider>
                  <InventoryProvider>
                    <OrderProvider>
                      <CustomerProvider>
                        <BidProvider>
                          <App />
                        </BidProvider>
                      </CustomerProvider>
                    </OrderProvider>
                  </InventoryProvider>
                </PostProvider>
              </ProductProvider>
            </PackageProvider>
          </SaladProvider>
        </ShabatFoodProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </div>
);

reportWebVitals();
