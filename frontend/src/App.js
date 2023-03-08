import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import AuthContext from "./context/AuthContext";
import { useContext } from "react";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Header from "./components/header/Header";
import Manager from "./pages/manager/Manager";
import Cart from "./components/store/cart/Cart";
import UpdateProduct from "./components/manager/UpdateProduct";
import UserManagement from "./pages/user-management/UserManagement";
import AllOrders from "./components/store/orders/AllOrders";
import OrderDetails from "./components/store/orders/OrderDetails";
import Daily from "./pages/daily/Daily";
import Footer from "./components/footer/Footer";
import Catering from "./components/catering/Catering";

function App() {
  const { isLoggedIn, isManager } = useContext(AuthContext);
  return (
    <div>
      <div className="text-white">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/daily" element={<Daily />} />
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
          {!isLoggedIn && <Route path="/login" element={<Login />} />}
          {!isLoggedIn && <Route path="/register" element={<Register />} />}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
