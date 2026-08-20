import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Description = () => {
  return (
    // <motion.div
    //   className="flex flex-col items-center justify-center mt-24  px-4 xl:px-28"
    //   initial={{ opacity: 0, y: 100 }}
    //   transition={{ duration: 1,delay: 0.3 }}
    //   whileInView={{ opacity: 1, y: 0 }}
    //   viewport={{ once: true }}
    // >
    <section className="flex flex-col items-center justify-center mt-24  px-4 xl:px-28">
      <h1 className="text-2xl sm:text-3xl md:text-4xl mb-2 font-semibold ">
        Create AI Images
      </h1>
      <p className="text-gray-500 mb-8 text-center">Turn your imaginations into visuals</p>

      <div className="flex flex-col gap-5 lg:gap-14 lg:flex-row items-center justify-center">
        <img
          src={assets.sample_img_1}
          alt="Image"
          className="w-80 sm:w-96 rounded-lg "
        />
        <div className="flex items-center justify-center flex-col lg:block">
          <h2 className="text-2xl sm:text-3xl font-medium max-w-lg flex items-center justify-center mb-4 text-center  lg:text-start">
            Introducing the AI powered image generator
          </h2>
          <p className="mb-4 text-gray-600 text-center lg:text-start">
            Easily bring your ideas to life with our free AI image generator.
            Whether you need stunning visuals or unique imagery, our tool
            transforms your text into eye-catching image with just a few clicks.
            Imagine it, describe it and watch it comes to life instantly
          </p>
          <p className="text-gray-600 text-center lg:text-start">
            Simply type in a text prompt and our cutting-eye AI will generate
            high quality image in seconds. From product visuals to charactor
            design and portraits, even concepts that don't yet exists can be
            visualized effortlessly. Powered by advanced AI technology, the
            creative possibilities are limitless!
          </p>
        </div>
      </div>
      {/* </motion.div> */}
    </section>
  );
};

export default Description;
