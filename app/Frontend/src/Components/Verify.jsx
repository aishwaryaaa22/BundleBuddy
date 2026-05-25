import React, { useState, useEffect } from 'react';
import { FaGoogle, FaEye, FaEyeSlash, FaUser, FaLock, FaEnvelopeOpenText, FaArrowLeft } from 'react-icons/fa';
import { MdEmail, MdOutlineRefresh } from 'react-icons/md';


const Verify = () => {
  const [step, setStep] = useState('signup'); // 'signup' or 'verify'
  const [email, setEmail] = useState('');
  // ... (previous password/strength states)

  const handleSignUp = (e) => {
    e.preventDefault();
    // Logic to send verification email goes here
    setStep('verify');
  };

  if (step === 'verify') {
    return (
      <div className="flex min-h-screen bg-white">
      
        <div className="hidden lg:flex w-1/2 bg-[#0f172a] items-center justify-center p-12">
           <div className="text-white text-center">
             <div className="w-24 h-24 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaEnvelopeOpenText className="text-4xl text-indigo-400" />
             </div>
             <h2 className="text-3xl font-bold">Verify your email</h2>
             <p className="text-slate-400 mt-2">We've sent a code to {email || 'your email'}</p>
           </div>
        </div>

        {/* Verification Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
          <div className="w-full max-w-md text-center space-y-8">
            <div className="space-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-full mb-4">
                <FaEnvelopeOpenText className="text-2xl text-indigo-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Check your email</h2>
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
                onClick={() => setStep('signup')}
                className="text-slate-400 text-sm font-medium hover:text-slate-600 inline-flex items-center gap-2"
              >
                <FaArrowLeft /> Back to sign up
              </button>
            </div>
          </div>
        </div>
      </div>

    );
  }
};
export default Verify;