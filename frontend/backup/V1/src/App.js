import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import AuthContext from "./context/AuthContext";
import { useContext } from "react";
import Header from "./components/header/Header";
import Manager from "./pages/manager/Manager";
import Cart from "./components/cart/Cart";
import UpdateProduct from "./components/manager/UpdateProduct";
import UserManagement from "./pages/user-management/UserManagement";
import AllOrders from "./components/orders/AllOrders";
import OrderDetails from "./components/orders/OrderDetails";
import Footer from "./components/footer/Footer";
import Catering from "./components/catering/Catering";
import ProductDetails from "./pages/products/products/ProductDetails";
import Days from "./pages/products/Days";

function App() {
  const { isLoggedIn, isManager } = useContext(AuthContext);
  return (
    <div className="" dir="rtl">
      <Header />
      <Routes>
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/" element={<Days />} />
        {/* <Route path="/products" element={<Days />} /> */}
        {isManager && (
          <Route exact path="/manager/products" element={<Catering />} />
        )}
        {isManager && <Route exact path="/manager" element={<Manager />} />}
        {isManager && (
          <Route
            exact
            path="/manager/editProduct/:productId"
            element={<UpdateProduct />}
          />
        )}
        {isLoggedIn && (
          <Route path="/user/order/:orderId" element={<OrderDetails />} />
        )}
        {isLoggedIn && <Route path="/user/orders" element={<AllOrders />} />}
        {isLoggedIn && <Route path="/order/:orderId" element={<Cart />} />}
        {isLoggedIn && <Route path="/user/cart" element={<Cart />} />}
        {isLoggedIn && (
          <Route path="/user-management" element={<UserManagement />} />
        )}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
