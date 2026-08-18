import { useContext } from "react";
import { assets, plans } from "../assets/assets";
import AppContext from "../context/AppContext";
import { motion } from "framer-motion";
import axios from "axios";

const BuyCredits = () => {
  const { user, backendURL, token, setLoginVisibility, fetchCredits } =
    useContext(AppContext);
  const handleSubmit = async (e, credits) => {
    console.log(credits, e.target.innerText);

    if (e.target.innerText === "Get Started") {
      setLoginVisibility(true);
    } else if (e.target.innerText === "Purchase Now") {
      try {
        let res = await axios.post(
          `${backendURL}/user/credits-add`,
          {
            credits,
          },
          {
            headers: { token },
          },
        );
        fetchCredits();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <section className="wfull h-full flex flex-col items-center justify-center gap-4 min-h-[90vh] flex-wrap">
      <p className="text-xs sm:text-sm bg-white rounded-full py-1 px-4 border border-gray-700 text-gray-700">
        Our Plans
      </p>
      <h1 className="text-3xl font-semibold mb-6">Buy Credits</h1>
      <div className="flex items-center justify-center gap-8 flex-wrap">
        {plans.map((data, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl flex items-center flex-col sm:p-12 sm:px-24 px-16 py-8 shadow-lg"
          >
            <img src={assets.logo_icon} width={30} />
            <h2 className="font-medium text-2xl sm:text-4xl mt-6">{data.id}</h2>
            <h3 className="text-base sm:text-lg text-gray-700 text-center">
              {data.desc}
            </h3>
            <div className="flex items-baseline my-10">
              <span className="text-4xl">${data.price} </span> /{data.credits}{" "}
              Credits
            </div>
            <button
              onClick={(e) => handleSubmit(e, data.credits)}
              className="bg-zinc-800 text-white rounded-lg cursor-pointer py-2 px-6 w-fit text-sm sm:text-lg md:text-xl hover:scale-105 transition duration-200"
            >
              {user ? "Purchase Now" : "Get Started"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BuyCredits;
