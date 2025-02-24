import React from "react";

const Footer = () => {
  return (
    <footer className="w-full h-16 bg-gray-800 text-white flex items-center justify-between px-6 border-t border-gray-600 mt-auto">
      <p>© 2024 School. All rights reserved.</p>
      <ul className="flex space-x-4">
        <li className="cursor-pointer hover:underline">Terms of Services</li>
        <li className="cursor-pointer hover:underline">Privacy Policy</li>
      </ul>
    </footer>
  );
};

export default Footer;
