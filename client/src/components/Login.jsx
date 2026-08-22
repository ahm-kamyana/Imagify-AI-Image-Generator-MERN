import React, { useContext, useEffect, useRef, useState } from "react";
import AppContext from "../context/AppContext";
import { assets } from "../assets/assets";
import { CiMail } from "react-icons/ci";
import { GoLock } from "react-icons/go";
import { MdPermIdentity } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const { setLoginVisibility, loginVisibility, backendURL, setUser, setToken } =
    useContext(AppContext);
  const [enableSignUp, setEnableSignUp] = useState(false);
  const [show, setShow] = useState(false);
  const [inputType, setInputType] = useState("password");
  const passRef = useRef();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (enableSignUp) {
      try {
        // Handle sign up logic here
        setLoading(true);
        let res = await axios.post(`${backendURL}/user/register`, {
          name,
          email,
          password,
        });
        setLoading(false);
        if (res.status === 200) {
          setToken(res.data.token);
          setUser(res.data.user);
          setLoginVisibility(false);
          localStorage.setItem("token", res.data.token);
        }
        if (res.status !== 200) {
          toast.error(res.response.data.message);
        }
      } catch (err) {
        if (err.response.data.error) {
          toast.error(err.response.data.error[0].msg);
        } else {
          toast.error(err.response.data.message);
        }
      }
    } else {
      // Handle login logic here
      setLoading(true);
      try {
        let res = await axios.post(`${backendURL}/user/login`, {
          email,
          password,
        });
        setLoading(false);
        if (res.status === 200) {
          setToken(res.data.token);
          setUser(res.data.user);
          setLoginVisibility(false);
          localStorage.setItem("token", res.data.token);
        }
        if (res.status !== 200) {
          toast.error(res.response.data.message);
        }
      } catch (err) {
        // console.log(err.response.data.message);
        if (err.response.data.error) {
          toast.error(err.response.data.error[0].msg);
        } else {
          toast.error(err.response.data.message);
        }
      }
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  const handleShowPass = () => {
    const input = passRef.current;
    if (input.type === "password") {
      setInputType("text");
      setShow(true);
    } else if (input.type === "text") {
      setInputType("password");
      setShow(false);
    }
  };

  return (
    <motion.div
      className={`w-screen h-screen fixed top-0 left-0 bottom-0 right-0 backdrop-blur-sm bg-black/30 flex justify-center items-center   z-10`}
      initial={{ opacity: 0.8 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="bg-white rounded-2xl p-8 shadow-lg relative max-w-[340px] sm:min-w-[320px]"
      >
        <span>
          <img
            src={assets.cross}
            alt="X"
            onClick={() => setLoginVisibility(false)}
            width={20}
            className="absolute top-4 right-4 cursor-pointer"
          />
        </span>
        <h2 className="text-3xl mb-2 text-center">
          {enableSignUp ? "Sign Up" : "Login"}
        </h2>
        {enableSignUp ? (
          <p className="text-center text-gray-700 text-sm mb-6">
            Welcome! Create your account to continue
          </p>
        ) : (
          <p className="text-center text-gray-700 text-sm mb-6">
            Welcome back! Please <b>log in</b> to continue
          </p>
        )}
        {enableSignUp && (
          <div className="mb-6 relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <MdPermIdentity className="text-2xl text-gray-500" />
            </span>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              id="username"
              className="w-full text-base pl-10 pr-6 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Username"
            />
          </div>
        )}
        <div className="mb-6 relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <CiMail className="text-2xl text-gray-700" />
          </span>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full text-base pl-10 pr-6 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email ID"
          />
        </div>
        <div className="mb-6 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2">
            <GoLock className="text-2xl text-gray-500" />
          </span>

          <button
            type="button"
            onClick={handleShowPass}
            className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer pointer-events-auto"
          >
            {show ? (
              <FaRegEye className="text-2xl text-gray-500" />
            ) : (
              <FaRegEyeSlash className="text-2xl text-gray-500" />
            )}
          </button>

          <input
            ref={passRef}
            type={inputType}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password"
            className="w-full text-base px-10 pr-16 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
          />
        </div>

        {/* {!enableSignUp && (
          <div>
            <p className="ml-2 mb-2  text-base text-blue-500 cursor-pointer inline-block">
              Forgot password?
            </p>
          </div>
        )} */}
        <button
          disabled={loading}
          type="submit"
          className={`w-full text-xl bg-blue-500 text-white py-3 rounded-full hover:bg-blue-600 transition duration-300 cursor-pointer `}
        >
          {enableSignUp
            ? loading
              ? "Creating..."
              : "Create Account"
            : loading
              ? "Logging in..."
              : "Login"}
        </button>
        {!enableSignUp ? (
          <p className="text-gray-600 py-4 mb-8 ml-2 text-center">
            Don't have an account?{" "}
            <span
              onClick={() => setEnableSignUp(true)}
              className="text-blue-500 cursor-pointer"
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="text-gray-600 py-4 mb-8 ml-2 text-center">
            Already have an account?{" "}
            <span
              onClick={() => setEnableSignUp(false)}
              className="text-blue-500 cursor-pointer"
            >
              Login
            </span>
          </p>
        )}
      </form>
    </motion.div>
  );
};

export default Login;
