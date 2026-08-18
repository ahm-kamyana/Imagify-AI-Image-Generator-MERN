import { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Bottom = () => {
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
    // <motion.div
    //   className="py-25 flex items-center justify-center flex-col"
    //   initial={{ opacity: 0, y: 100 }}
    //   transition={{ duration: 1,delay: 0.4 }}
    //   whileInView={{ opacity: 1, y: 0 }}
    //   viewport={{ once: true }}
    // >
    <section className="py-25 flex items-center justify-center flex-col">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 text-center">
        See The Magic. Try Now!
      </h1>
      <button
        onClick={() => handleClick()}
        className="text-sm sm:text-lg text-white bg-black w-auto mt-6 px-8 sm:px-10 md:px-12 py-2.5 flex items-center gap-2 rounded-full cursor-pointer hover:scale-105 transition duration-300  active:scale-97"
      >
        Generate Images{" "}
        <img className="w-6 sm:w-7 md:w-8" src={assets.star_group} alt="star" />
      </button>
      {/* </motion.div> */}
    </section>
  );
};

export default Bottom;
