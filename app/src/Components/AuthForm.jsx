import React, { useState, useEffect } from "react";
import logo from "../assets/logoo.png";
import {
  FaGoogle,
  FaGithub,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaLock,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const AuthForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false); // Toggle between Login/Sign up
  const [step, setStep] = useState("signup"); // 'signup' or 'verify'
  const [email, setEmail] = useState("");
  // ... (previous password/strength states)

  const handleSignUp = (e) => {
    e.preventDefault();
    // Logic to send verification email goes here
    setStep("verify");
  };

  if (step === "verify") {
    return (
      <div className="flex min-h-screen bg-white">
        {/* Same Left Side Sidebar (Optional to keep for branding) */}
        <div className="hidden lg:flex w-1/2 bg-[#0f172a] items-center justify-center p-12">
          <div className="text-white text-center">
            <div className="w-24 h-24 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaEnvelopeOpenText className="text-4xl text-indigo-400" />
            </div>
            <h2 className="text-3xl font-bold">Verify your email</h2>
            <p className="text-slate-400 mt-2">
              We've sent a code to {email || "your email"}
            </p>
          </div>
        </div>

        {/* Verification Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
          <div className="w-full max-w-md text-center space-y-8">
            <div className="space-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-full mb-4">
                <FaEnvelopeOpenText className="text-2xl text-indigo-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">
                Check your email
              </h2>
              <p className="text-slate-500">
                We sent a 6-digit verification code to <br />
                <span className="font-semibold text-slate-900">{email}</span>
              </p>
            </div>

            {/* OTP Input Group */}
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5, 6].map((idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength="1"
                  className="w-12 h-14 text-center text-2xl font-bold bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-xl outline-none transition-all"
                />
              ))}
            </div>

            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-95">
              Verify Account
            </button>

            <div className="space-y-4">
              <p className="text-sm text-slate-500">
                Didn't receive the code?
                <button className="ml-1 text-indigo-600 font-bold hover:underline inline-flex items-center gap-1">
                  <MdOutlineRefresh /> Resend
                </button>
              </p>

              <button
                onClick={() => setStep("signup")}
                className="text-slate-400 text-sm font-medium hover:text-slate-600 inline-flex items-center gap-2"
              >
                <FaArrowLeft /> Back to sign up
              </button>
            </div>
          </div>
        </div>
{/*main */}
        <div className="flex min-h-screen bg-gray-50">
          <div className="hidden lg:flex w-1/2 bg-[#1a1a1a] relative overflow-hidden items-center justify-center p-12">
            <div className="relative z-10 text-white space-y-6">
              <img className="logo" src={logo} />

              <h1 className="text-6xl font-black tracking-tight leading-none">
                SHOP <br /> <span className="text-indigo-500">SMARTER.</span>
              </h1>
              <p className="text-gray-400 text-lg max-w-sm">
                Access exclusive collections and manage your orders with a
                single tap.
              </p>
              <div className="pt-8 flex gap-4 text-sm font-medium text-gray-500">
                <span>✓ Verified Products</span>
                <span>✓ 24/7 Support</span>
              </div>
            </div>

            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
          </div>

          <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-16 bg-white">
            <div className="w-full max-w-md space-y-8">
              <div className="space-y-2">
                <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
                  {isLogin ? "Welcome back" : "Create account"}
                </h2>
                <p className="text-gray-500">
                  {isLogin ? "New here?" : "Already have an account?"}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="ml-1 text-indigo-600 font-semibold hover:underline"
                  >
                    {isLogin ? "Sign up" : "Log in"}
                  </button>
                </p>
              </div>

              {/* Social Auth */}
              <div className="flex gap-4">
                <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all font-medium text-gray-700">
                  <FaGoogle className="text-red-500" /> Google
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all font-medium text-gray-700">
                  <FaGithub /> GitHub
                </button>
              </div>

              <div className="relative flex items-center py-2">
                <div className="flex border-t border-gray-200"></div>
                <span className="flex mx-4 text-gray-400 text-sm uppercase tracking-wider">
                  or email
                </span>
                <div className="flex border-t border-gray-200"></div>
              </div>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                {!isLogin && (
                  <div className="relative">
                    <label className="text-xs font-bold uppercase text-gray-400 mb-1 ml-1 block">
                      Full Name
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 text-slate-800 border border-transparent focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 rounded-2xl outline-none transition-all"
                      />{" "}
                    </div>
                  </div>
                )}

                <div className="relative">
                  <label className="text-xs font-bold uppercase text-gray-400 mb-1 ml-1 block">
                    Email Address
                  </label>
                  <div className="relative">
                    <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                    <input
                      type="email"
                      placeholder="name@company.com"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50  text-slate-800 border border-transparent focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 rounded-2xl outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="relative">
                  <div className="flex justify-between items-end mb-1 ml-1">
                    <label className="text-xs font-bold uppercase text-gray-400">
                      Password
                    </label>
                    {isLogin && (
                      <a
                        href="#"
                        className="text-xs font-bold text-indigo-600 hover:underline"
                      >
                        Forgot?
                      </a>
                    )}
                  </div>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-4 bg-gray-50 border  text-slate-800 border-transparent focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 rounded-2xl outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <button className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transform transition-all active:scale-[0.98] mt-4">
                  {isLogin ? "Sign In" : "Create Account"}
                </button>
              </form>

              <p className="text-center text-sm text-gray-400 pt-4">
                Secured by Bundle Buddy
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default AuthForm;
