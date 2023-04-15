import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthContext from "./context/AuthContext.jsx";
import { useContext } from "react";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import Home from "./pages/home/Home.jsx";
import Manager from "./pages/manager/Manager.jsx";
import SaladDetails from "./components/products/salad/SaladDetails.jsx";
import Cart from "./components/cart/Cart.jsx";
import AllOrders from "./components/orders/AllOrders.jsx";
import ShabatDetails from "./components/products/shabat-food/ShabatDetails.jsx";
import PackageDetails from "./components/products/package/PackageDetails.jsx";
import UserManagement from "./pages/user-management/UserManagement.jsx";
import Background1 from "./components/background/Background1.jsx";

function App() {
  const { isLoggedIn, isManager } = useContext(AuthContext);
  return (
    <div className="main-app">
      <Header />
      <Background1 />
      <Routes>
        {/* ---------------------Home----------------------- */}

        <Route path="/" element={<Home />} />
        {/* ---------------------Manager----------------------- */}

        {isManager && <Route path="/manager" element={<Manager />} />}
        {/* ---------------------Salads----------------------- */}

        <Route path="/product/salads/:id" element={<SaladDetails />} />
        {/* ---------------------Shabat----------------------- */}

        <Route path="/product/shabat/:id" element={<ShabatDetails />} />
        {/* ---------------------Salads----------------------- */}

        <Route path="/product/salad/:id" element={<SaladDetails />} />
        {/* ---------------------Packages----------------------- */}

        <Route path="/product/package/:id" element={<PackageDetails />} />

        {/* ---------------------Cart----------------------- */}

        <Route path="/cart" element={<Cart />} />
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
