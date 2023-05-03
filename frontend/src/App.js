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
import MenuDetails from "./components/catering/MenuDetails.jsx";

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
        {/* ---------------------Catering Events----------------------- */}

        <Route path="/catering-menu/:id/:index" element={<MenuDetails />} />
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
