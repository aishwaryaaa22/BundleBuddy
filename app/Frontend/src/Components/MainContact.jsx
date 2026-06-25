import React, { useState } from "react";
import { FaInstagram, FaYoutube, FaLinkedinIn, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Footer from "./Footer";

function MainContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Form Submitted:", formData);
    alert("Thank you! Your message has been sent.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div>
    <section className="w-full bg-neutral-900 text-white py-16 px-4 md:px-8 lg:px-16 overflow-x-hidden">
      <div className="max-w-350 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        <div className="lg:col-span-5 space-y-6" data-aos="fade-right">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-widest text-slate-400 font-semibold">
              Get In Touch
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Let's Connect.
            </h2>
          </div>
          
          <div className="h-1 w-20 bg-[#434d5e] rounded-full"></div>
          
          <p className="text-base text-slate-300 leading-relaxed max-w-md">
            Have questions about your order, custom drops, or collaborations? Drop us a message, or hit us up directly across our socials.
          </p>

      
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4 text-slate-300">
              <div className="p-3 bg-neutral-800 rounded-lg text-[#434d5e] text-xl">
                <FaEnvelope className="text-slate-200" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Email Us</p>
                <a href="mailto:support@yourdomain.com" className="hover:text-slate-100 transition-colors text-sm font-semibold">
                  bundlebuddy@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 text-slate-300">
              <div className="p-3 bg-neutral-800 rounded-lg text-[#434d5e] text-xl">
                <FaMapMarkerAlt className="text-slate-200" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Based In</p>
                <p className="text-sm font-semibold">Delhi, India</p>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="pt-6 space-y-3">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">Follow the Movement</p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-slate-300 hover:bg-[#434d5e] hover:text-white transition-all duration-300"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-slate-300 hover:bg-[#434d5e] hover:text-white transition-all duration-300"
              >
                <FaYoutube size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-slate-300 hover:bg-[#434d5e] hover:text-white transition-all duration-300"
              >
                <FaLinkedinIn size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 w-full bg-neutral-800/40 border border-neutral-800 p-6 sm:p-8 rounded-2xl shadow-xl" data-aos="fade-left">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Aishwarya harma"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-[#434d5e] transition-colors placeholder:text-neutral-500"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="aishwarya@gmail.com"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-[#434d5e] transition-colors placeholder:text-neutral-500"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-3 text-white text-sm focus:outline-none focus:border-[#434d5e] transition-colors placeholder:text-neutral-500 resize-none"
              ></textarea>
            </div>

            
            <div className="pt-2 flex justify-start">
              <button
                type="submit"
                className="bg-[#434d5e] hover:bg-[#4f5b6e] text-white font-bold py-3 px-10 rounded-full text-sm shadow-md tracking-wider transition-colors duration-200 cursor-pointer"
              >
                SEND MESSAGE
              </button>
            </div>
          </form>
        </div>

      </div>
    </section>
    <Footer/>
    </div>
  );
}

export default MainContact;