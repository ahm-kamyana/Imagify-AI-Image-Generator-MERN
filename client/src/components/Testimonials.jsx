import React from "react";
import { assets, testimonialsData } from "../assets/assets";
import { motion } from "framer-motion";

const Testimonials = () => {
  return (
    // <motion.div
    //   className="flex flex-col my-20 py-12 justify-center items-center"
    //   initial={{ opacity: 0, y: 100 }}
    //   transition={{ duration: 1, delay: 0.3 }}
    //   whileInView={{ opacity: 1, y: 0 }}
    //   viewport={{ once: true }}
    // >
    <section className="flex flex-col my-20 py-12 justify-center items-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl mb-2 font-semibold ">
        Customers Testimonial
      </h1>
      <p className="text-gray-500 mb-12">What Our Users Are Saying</p>
      <div className="flex flex-wrap gap-4 items-center justify-center">
        {testimonialsData.map((data, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center flex-col bg-white/20 rounded-lg px-4 py-8 sm:px-6 sm:py-12 border border-gray-200 shadow-lg hover:scale-103 transition duration-300 cursor-pointer"
          >
            <img src={data.image} alt="image" className="rounded-full w-25" />
            <h2 className="mt-4 text-xl sm:text-2xl font-semibold max-w-xl text-center">
              {data.name}
            </h2>
            <p className=" text-gray-600 max-w-xl text-center text-sm sm:text-base">
              {data.role}
            </p>
            <div className="flex">
              {Array(data.stars)
                .fill()
                .map((data, idx) => (
                  <img
                    src={assets.rating_star}
                    alt="rating"
                    key={idx}
                    className="w-4 mt-4"
                  />
                ))}
            </div>
            <p className="mt-4 max-w-sm text-center text-gray-700 text-sm sm:text-base">
              {data.text}
            </p>
          </div>
        ))}
      </div>

      {/* </motion.div> */}
    </section>
  );
};

export default Testimonials;
