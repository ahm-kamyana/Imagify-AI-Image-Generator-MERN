import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ResultPage from "./pages/ResultPage";
import BuyCredits from "./pages/BuyCredits";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./components/Login";
import AppContext from "./context/AppContext";
import { AppContextProvider } from "./context/AppContext.jsx";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
      <Router>
    <AppContextProvider>
        <AppContent />
    </AppContextProvider>
      </Router>
  );
};

const AppContent = () => {
  const { loginVisibility } = useContext(AppContext);
  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-linear-to-b from-teal-50 to-orange-50">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnHover
        theme="light"
      />
      <Navbar />
      {loginVisibility && <Login />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/buy" element={<BuyCredits />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
