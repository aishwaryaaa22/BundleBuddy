import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/logoo.png";
import {
  FaGoogle,
  FaGithub,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaLock,
  FaEnvelopeOpenText,
  FaArrowLeft,
} from "react-icons/fa";
import { MdEmail, MdOutlineRefresh } from "react-icons/md";

const AuthForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [step, setStep] = useState("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login Successful!");
        window.location.href = "/";
      } else {
        alert(data.message || "Invalid Credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Cannot connect to server");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("Sending Data:", { name, email, password });

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name, 
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Signup Successful!");
        window.location.href = "/";
      } else {
    
        const data = await response.json();
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      alert("Server Error");
    }
  };

  // SIGN UP / LOGIN VIEW 
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden lg:flex w-1/2 bg-[#1a1a1a] relative items-center justify-center p-12">
        <div className="relative z-10 text-white space-y-6">
          <img src={logo} alt="Logo" className="h-12 mb-8" />
          <h1 className="text-6xl font-black tracking-tight leading-none">
            SHOP <br /> <span className="text-gray-400">SMARTER.</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-sm">
            Access exclusive collections and manage your orders.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-16 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
              {isLogin ? "Welcome back" : "Create account"}
            </h2>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-green-400 font-semibold hover:underline"
            >
              {isLogin
                ? "Need an account? Sign up"
                : "Already have an account? Log in"}
            </button>
          </div>

          <form
            onSubmit={isLogin ? handleLogin : handleSignUp}
            className="space-y-5"
          >
            {!isLogin && (
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  required
                />
              </div>
            )}
            <div className="relative">
              <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 text-xl" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all"
                required
              />
            </div>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-gray-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-green-400 transition-all active:scale-95"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>
          <p className="text-center text-sm text-gray-400">
            Secured by Bundle Buddy
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
