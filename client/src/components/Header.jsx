import { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import AppContext from "../context/AppContext";
import {  useNavigate } from "react-router-dom";

const Header = () => {
  const { user, setLoginVisibility } = useContext(AppContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      navigate("/result");
    } else {
      setLoginVisibility(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 0.5,delay: 0.2 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full h-full mt-20 md:mt-10 flex flex-col items-center justify-center"
    >
      <motion.p
        className="flex items-center gap-2 border border-neutral-900 rounded-full py-2 px-4 text-xs bg-white text-zinc-800 mb-4"
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        animate={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Best text to image generator
        <img src={assets.star_icon} alt="star" />
      </motion.p>
      <motion.h1
        className="text-3xl  sm:text-4xl md:text-6xl lg:text-8xl w-full px-10 md:20 lg:px-30 text-center sm:leading-10 md:leading-15 lg:leading-20"
        initial={{ opacity: 0 }}
        transition={{ duration: 2, delay: 0.4 }}
        animate={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Turn text to <span className="text-blue-500">image,</span> in seconds.
      </motion.h1>

      <motion.p
        className="text-center max-w-xl mx-auto mt-4"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        animate={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Unleash your creativity with AI. Turn you imagination into visual art in
        seconds - just type and watch the magic happen.
      </motion.p>

      <motion.button
        onClick={() => handleClick()}
        className="sm:text-lg text-white bg-black w-auto mt-6 px-8 sm:px-12 py-2.5 flex items-center gap-2 rounded-full cursor-pointer hover:scale-105 transition duration-300  active:scale-97 "
        initial={{ opacity: 0 }}
        transition={{ duration: 2, delay: 0.8 }}
        animate={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Generate Images{" "}
        <img className="w-8" src={assets.star_group} alt="star" />
      </motion.button>
      <motion.div
        className="flex items-center justify-center gap-4 mt-6"
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 1, delay: 1 }}
        animate={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {Array(4)
          .fill("")
          .map((item, index) => (
            <img
              key={index}
              src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
              alt="star"
              width={80}
              className=" hover:scale-105 transition duration-300 rounded-lg max-sm:w-10 cursor-pointer"
            />
          ))}
      </motion.div>
      <motion.p
        className="mt-2 text-neutral-600"
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 1, delay: 1 }}
        animate={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Generated images from imagify
      </motion.p>
    </motion.div>
  );
};

export default Header;
