import { useState } from "react";
import React from "react";
import "./Email.css";

function Email() {
  const [email, setEmail] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      alert(data.message);
      setEmail("");
    } catch (err) {
      alert("Something went wrong");
    }
  };
  return (
    <div>
      <div className="flex flex-col bg-gray-100 p-15 sm:p-10 lg:p-15 px-4 sm:px-8 lg:px-20 gap-8">
        <p className="text-4xl sm:text-7xl md:text-9xl  text-center tracking-widest text-slate-200/80 uppercase select-none">
          BUNDLE BUDDY
        </p>
        <section>
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-center text-slate-950">
            {" "}
            Join the Movement
          </h1>
          <p className="text-gray-400 mb-4 max-w-md mx-auto">
            Subscribe for exclusive drops,early access and 10% off on your first
            order.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full mt-8 block"
          >
            <div className="w-[85vw] sm:w-full max-w-lg mx-auto flex flex-col sm:flex-row items-stretch justify-center gap-3 px-2">
              
              <div className="w-full sm:flex-1 block">
                <input
                  type="email"
                  placeholder="ENTER YOUR EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white text-slate-900 placeholder-slate-400 border border-slate-300 rounded-xl px-5 py-4 text-sm font-semibold tracking-wide focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all shadow-sm block appearance-none"
                />
              </div>

              
              <div className="w-full sm:w-auto block">
                <button
                  onClick={handleSubscribe}
                  className="w-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs tracking-widest uppercase py-4 px-8 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-md whitespace-nowrap min-h-[50px] flex items-center justify-center"
                >
                  SUBSCRIBE
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Email;
