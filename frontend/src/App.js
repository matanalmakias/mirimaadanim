import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import AuthContext from "./context/AuthContext";
import { useContext } from "react";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Header from "./components/header/Header";
import Manager from "./pages/manager/Manager";
import Cart from "./components/store/Cart";
import UpdateProduct from "./components/manager/UpdateProduct";

function App() {
  const { isLoggedIn, isManager } = useContext(AuthContext);
  return (
    <>
      <div className="bg-light">
        <Header />
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Home />} />
          {isManager && <Route exact path="/manager" element={<Manager />} />}
          {isManager && (
            <Route
              exact
              path="/manager/editProduct/:productId"
              element={<UpdateProduct />}
            />
          )}
          {!isLoggedIn && <Route path="/login" element={<Login />} />}
          {!isLoggedIn && <Route path="/register" element={<Register />} />}
        </Routes>
      </div>
    </>
  );
}

export default App;
