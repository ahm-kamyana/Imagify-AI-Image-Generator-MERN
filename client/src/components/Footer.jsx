import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between gap-4 my-3 mt-10">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        width={150}
        className="w-30 sm:w-40 cursor-pointer"
      />
      <p className="text-gray-500 text-sm flex-1 border-l border-gray-500 pl-4 hidden sm:block">
        Copyright @Ahmed | All right reserved.
      </p>
      <div className="flex gap-4 items-center justify-center ">
        <img
          src={assets.instagram_icon}
          alt="Instagram"
          width={20}
          className="cursor-pointer hover:scale-110 sm:w-8 w-5 transition duration-300"
        />
        <img
          src={assets.linkedin_icon}
          alt="Instagram"
          width={20}
          className="cursor-pointer hover:scale-110 sm:w-8 w-5 transition duration-300"
        />
      </div>
    </div>
  );
};

export default Footer;
