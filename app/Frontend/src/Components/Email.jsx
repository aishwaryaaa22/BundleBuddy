import React, { useState } from "react";

function Email() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert(" Successfully Subscribed! Check your inbox for your welcome email.");
        setEmail(""); 
      } else {
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Subscription Error:", error);
      alert("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-neutral-100 py-16 px-4 text-center relative overflow-hidden">
     
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-5">
        <h1 className="text-7xl md:text-9xl font-black tracking-widest text-neutral-900">
          BUNDLE BUDDY
        </h1>
      </div>

      <div className="relative z-10 max-w-xl mx-auto space-y-6">
        <h2 className="text-3xl md:text-5xl font-black tracking-wider text-neutral-900 uppercase">
          JOIN THE MOVEMENT
        </h2>
        <p className="text-sm md:text-base text-neutral-500 font-medium max-w-md mx-auto">
          Subscribe for exclusive drops, early access and 5% off on your first order.
        </p>

        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ENTER YOUR EMAIL"
            disabled={loading}
            className="w-full bg-white border border-neutral-200 rounded-xl sm:rounded-l-xl sm:rounded-r-none p-3.5 text-xs font-bold tracking-wider text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 transition-colors uppercase"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full sm:w-auto bg-neutral-950 text-white text-xs font-bold tracking-widest py-3.5 px-8 rounded-xl sm:rounded-r-xl sm:rounded-l-none hover:bg-neutral-800 transition-colors uppercase whitespace-nowrap ${
              loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {loading ? "SUBSCRIBING..." : "SUBSCRIBE"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Email;