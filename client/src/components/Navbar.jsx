import { useContext } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, credits, setLoginVisibility, loginVisibility, logout } =
    useContext(AppContext);
  const navigate = useNavigate();
  const handleClick = () => {
    setLoginVisibility(true);
  };

  return (
    <motion.div
      initial={{ opacity: "0%" }}
      whileInView={{ opacity: "100%", transition: { duration: 0.5 } }}
      viewport={{ once: true }}
      className="w-full flex justify-between items-center py-4"
    >
      <Link to="/">
        <img
          src={assets.logo}
          alt="Logo"
          className="w-28 sm:w-35 md:w-45 lg:w-50"
        />
      </Link>
      <div>
        {user ? (
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
            <button
              onClick={() => navigate("/buy")}
              className="bg-blue-200 active:scale-98 transition text-gray-700 px-2 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full h-fit cursor-pointer text-xs sm:text-sm md:text-base flex items-center gap-2"
            >
              <img
                src={assets.credit_star}
                alt="Credit Star"
                className="w-5 sm:w-6 md:w-7 lg:w-8"
              />
              Credits left: {credits}
            </button>
            <div className="flex items-center gap-2">
              <p className="sm:text-lg text-gray-700 max-sm:hidden">
                Hi! {user?.name}
              </p>
              <div className="py-2 cursor-pointer text-base flex items-center gap-4 relative group">
                <img
                  src={assets.profile_icon}
                  alt="Profile icon"
                  className="sm:w-12 w-10"
                />
                <div className="absolute top-15 right-0">
                  <div className="hidden group-hover:block">
                    <ul className="bg-white text-black rounded-xl shadow-lg py-2 px-6 ">
                      <li onClick={() => logout()} className="cursor-pointer">
                        Logout
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-4 sm:gap-6 lg:gap-8 items-center">
            <Link to="/buy">
              <button className="cursor-pointer text-base sm:text-lg ">
                Pricing
              </button>
            </Link>
            <button
              onClick={() => handleClick()}
              className="bg-zinc-800 px-8 sm:px-12 py-2 rounded-full cursor-pointer text-base sm:text-lg text-white"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Navbar;
