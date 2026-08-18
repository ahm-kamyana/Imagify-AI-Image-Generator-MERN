import { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import AppContext from "../context/AppContext";
import { toast } from "react-toastify";
import { MdOutlineDownloading } from "react-icons/md";

const ResultPage = () => {
  const { genImage, user, token } = useContext(AppContext);
  const [image, setImage] = useState(assets.sample_img_2);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    if (token) {
      setLoading(true);

      genImage(input).then((image) => {
        if (image) {
          setImage(image);
          setIsImageLoaded(true);
          setLoading(false);
          setInput("");
        } else {
          setLoading(false);
        }
      });
    } else {
      setLoading(false);
      toast.error("Please login to generate image");
    }
  };
  return (
    <section className="flex items-center justify-center flex-col h-[80vh]">
      <div className="flex items-center justify-center flex-col relative mb-4">
        <img
          src={image}
          alt="image"
          width={400}
          className="rounded-tr-lg rounded-tl-lg"
        />
        <a
          href={image}
          download
          className="rounded-full p-1 bg-zinc-200/80 text-black cursor-pointer active:scale-95 transition duration-200 border border-black/50 absolute right-2 bottom-2"
        >
          <MdOutlineDownloading className="text-2xl" />
        </a>
      </div>
      <div
        className={` rounded-full w-8 h-8 sm:w-10 sm:h-10 my-4  sm:my-4 border-4 border-gray-500 border-t-gray-900 animate-spin ease-in-out ${
          loading ? "" : "hidden"
        }`}
      ></div>
      <div>
        {isImageLoaded ? (
          <div className="flex gap-4 mt-4 justify-center text-lg">
            <p
              onClick={() => setIsImageLoaded(false)}
              className="rounded-full py-2 px-8 text-zinc-900 border border-zinc-900 cursor-pointer active:scale-95 transition duration-200"
            >
              Generate Another
            </p>
          </div>
        ) : (
          <div className="flex mt-4">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Describe your imaginations..."
              className="px-4 py-2 sm:px-8 sm:py-3 text-sm sm:text-xl bg-white/70 text-gray-900 border border-gray-800 max-sm:w-20 rounded-tl-full rounded-bl-full border-r-0 min-w-[200px] sm:min-w-[400px] outline-none"
            />
            <button
              disabled={loading}
              onClick={handleSubmit}
              className="bg-gray-800 text-sm sm:text-xl cursor-pointer text-white py-2 sm:py-3 sm:px-8 px-4 rounded-tr-full rounded-br-full disabled:cursor-not-allowed"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResultPage;
