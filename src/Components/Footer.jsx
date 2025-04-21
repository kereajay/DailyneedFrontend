import React from "react";
import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import designer from "../assets/Designer.png";

const Footer = () => {
  return (
    <>
      <div className="relative">
        {/* Wave Background */}
        <div className="absolute top-8 left-0 w-full overflow-hidden leading-[0]">
          <svg
            className="relative block w-[calc(150%+1.3px)] h-[100px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.19,22,104.49,29.07,158,17.15C230.27,51.2,284.55,13.77,339,3.63c54.06-10,108,12.93,161.67,35.38C598.35,61.46,652.7,82.83,707,73.63c56.15-9.52,111.74-48.85,166-45.21,48.25,3.24,95.22,42.5,143,64.24V0Z"
              fill="url(#gradient)"
            ></path>
            <defs>
              <linearGradient id="gradient" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <footer className="bg-grayForFooter text-gray-700 pt-28 pb-10 px-4 md:px-10 relative z-10">
          {/* Logo and Branding */}
          <div className="flex flex-col items-center mb-10">
            <div className="flex items-center space-x-3">
              <img src={designer} alt="logo" className="w-20 h-20 object-contain" />
              <h1 className="text-3xl font-bold text-green-600">DailyNeed</h1>
            </div>
            <p className="text-sm mt-2 text-gray-500">Your daily essentials delivered fresh.</p>
          </div>

          {/* Main Sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Products */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Products</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="hover:text-green-600 cursor-pointer">Dairy</li>
                <li className="hover:text-green-600 cursor-pointer">Vegetables</li>
                <li className="hover:text-green-600 cursor-pointer">Oils</li>
                <li className="hover:text-green-600 cursor-pointer">Fruits</li>
                <li className="hover:text-green-600 cursor-pointer">Grocery</li>
                <li className="hover:text-green-600 cursor-pointer">DryFruits</li>
                <li className="hover:text-green-600 cursor-pointer">More...</li>
              </ul>
            </div>

            {/* Policy */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Policies</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="hover:text-green-600 cursor-pointer">Privacy Policy</li>
                <li className="hover:text-green-600 cursor-pointer">Terms & Conditions</li>
                <li className="hover:text-green-600 cursor-pointer">Refund Policy</li>
                <li className="hover:text-green-600 cursor-pointer">Shipping Info</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Contact</h3>
              <p className="text-sm text-gray-600">123 Green Avenue, New City</p>
              <p className="text-sm text-gray-600">Email: support@naturenook.com</p>
              <p className="text-sm text-gray-600">Phone: +1 (234) 567-891</p>
            </div>

            {/* Socials */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Follow Us</h3>
              <div className="flex gap-4">
                <BsInstagram className="text-2xl text-gray-600 hover:text-green-600 cursor-pointer" />
                <FaFacebook className="text-2xl text-gray-600 hover:text-green-600 cursor-pointer" />
                <BsLinkedin className="text-2xl text-gray-600 hover:text-green-600 cursor-pointer" />
                <BsTwitter className="text-2xl text-gray-600 hover:text-green-600 cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-12 border-t border-gray-300 pt-4 text-center text-sm text-gray-500">
            © 2025 DailyNeed. All rights reserved. Designed by <span className="text-green-600 font-medium">Ajay Kere</span>.
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
