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
      setEmail(""); // Input clear karne ke liye
    } catch (err) {
      alert("Something went wrong");
    }
  };
  return (
    <div>
      <div className="flex flex-col bg-gray-100  p-15 px-35 gap-8">
        <p className="text-9xl text-center text-slate-300 object-contain p-0">
          BUNDLE BUDDY
        </p>
        <section>
          <h1 className="text-6xl text-slate-950 font-black uppercase tracking-tighter mb-4 text-center">
            {" "}
            Join the Movement
          </h1>
          <p className="text-gray-400 mb-4 max-w-md mx-auto">
            Subscribe for exclusive drops,early access and 10% off on your first
            order.
          </p>
          <form>
            <div className="four flex">
              <div className="flex flex-col">
                <input
                  type="email"
                  placeholder="ENTER YOUR EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className=" w-200 bg-gray-400 border-zinc-900 border-2 p-4  focus:outline-none text-white focus:border-zinc-600"
                />
                <div className="wrapperrr mx-auto hover:bg-amber-600 linear transition">
                  <button onClick={handleSubscribe}>
                    <span>SUBSCRIBE</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Email;
