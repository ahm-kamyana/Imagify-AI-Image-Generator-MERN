import { assets, stepsData } from "../assets/assets";
import { motion } from "framer-motion";

const Steps = () => {
  return (
    // <motion.div
    //   className="w-full mx-auto flex flex-col items-center justify-center mt-20"
    //   initial={{ opacity: 0, y: 100 }}
    //   transition={{ duration: 1,delay: 0.3 }}
    //   whileInView={{ opacity: 1, y: 0 }}
    //   viewport={{ once: true }}
    // >
    <section className="w-full mx-auto flex flex-col items-center justify-center mt-20">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2">
        How it works
      </h1>
      <p className="text-zinc-600 text-base sm:text-lg mb-6">
        Transform Words Into Stunning Images
      </p>
      {stepsData.map((step, index) => (
        <div
          key={index}
          className="hover:scale-102 transition duration-400 md:w-2/3 min-w-[300px] shadow-2xl mb-6 flex gap-4 px-4 py-2 md:px-10 md:py-6 rounded-xl border border-neutral-300 cursor-pointer"
        >
          <img src={step.icon} alt="icon" className="w-12" />
          <div>
            <h2 className="md:text-2xl md:font-semibold text-lg">
              {step.title}
            </h2>
            <p className="text-neutral-700 leading-tight text-xs sm:text-base">
              {step.description}
            </p>
          </div>
        </div>
      ))}
      {/* </motion.div> */}
    </section>
  );
};

export default Steps;
