import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthContext from "./context/AuthContext.jsx";
import { useContext } from "react";
import Header from "./components/header/Header.jsx";
import ManotMumlatsot from "./components/ManotMumlatsot/ManotMumlatsot.jsx";
import Sales from "./components/Sales/Sales.jsx";
import Maarazim from "./components/maarazim/Maarazim.jsx";
import { Button } from "react-bootstrap";

function App() {
  const { isLoggedIn, isManager } = useContext(AuthContext);
  return (
    <div
      className="main-app d-flex align-items-center justify-content-center flex-column"
      dir="rtl"
    >
      <Header />
      <div className="background-overlay"></div>
      <Button className="w-100 h5 fs-medium p-3">
        קייטרינג למקומות עבודה & לקוחות פרטיים
      </Button>

      <Button className="w-100 h5 fs-medium  p-3">קייטרינג לאירועים</Button>
      <div className="row align-items-center justify-content-center text-center custom-row">
        <div className="col-4 col-sm-4 custom-col">
          <ManotMumlatsot />
        </div>
        <div className="col-4 col-sm-4 custom-col">
          <Sales />
        </div>
        <div className="col-4 col-sm-4 custom-col">
          <Maarazim />
        </div>
      </div>

      <Routes></Routes>
    </div>
  );
}

export default App;
