import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthContext from "./context/AuthContext.jsx";
import { useContext } from "react";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Home from "./pages/home/Home.jsx";
import Manager from "./pages/manager/Manager.jsx";
import Cart from "./components/cart/Cart.jsx";
import AllOrders from "./components/orders/AllOrders.jsx";
import UserManagement from "./pages/user-management/UserManagement.jsx";
import Catering from "./pages/services/catering/Catering.jsx";
import ShabatFood from "./pages/services/shabat-food/ShabatFood.jsx";
import PrivateCustomers from "./pages/services/private-customers/PrivateCustomers.jsx";

function App() {
  const { isLoggedIn, isManager } = useContext(AuthContext);
  return (
    <div className="main-app" dir="rtl">
      <Header />

      <Routes>
        {/* ---------------------Home----------------------- */}

        <Route path="/" element={<Home />} />
        {/* ---------------------Manager----------------------- */}

        {isManager && <Route path="/manager" element={<Manager />} />}

        {/* ---------------------Cart----------------------- */}

        <Route path="/cart" element={<Cart />} />
        {/* ---------------------Services----------------------- */}

        <Route path="/services/catering" element={<Catering />} />
        <Route path="/services/shabat-food" element={<ShabatFood />} />
        <Route path="/services/daily" element={<PrivateCustomers />} />

        {/* ---------------------Orders----------------------- */}

        {isLoggedIn && <Route path="/orders" element={<AllOrders />} />}
        {/* {isLoggedIn && <Route path="/order/" element={<Order />} />} */}

        {/* ---------------------User Management----------------------- */}

        {isLoggedIn && (
          <Route path="/user-management" element={<UserManagement />} />
        )}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
