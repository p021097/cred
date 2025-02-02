import { useContext, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
// import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Statement from "./pages/Statement/Statement";
import Home from "./pages/Home/Home";
import Login from "./components/Login/Login";
import Payment from "./pages/Payment/Payment";
import { StoreContext } from "./context/StoreContex";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Verify from "./pages/Verify/Verify";
import MyPayments from './pages/MyPayments/MyPayments'

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { token } = useContext(StoreContext);

  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className="app">

        <Navbar setShowLogin={setShowLogin} />
        <hr />
        <div className="app-content">
        {token ? <Sidebar/> : null }

          {token ? (
            <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="/statement" element={<Statement />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/mypayments" element={<MyPayments />} />
          </Routes>
          ) : (
            <Header />
          )}
        </div>
      </div>
    </>
  );
};

export default App;
