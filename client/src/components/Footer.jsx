import React from "react";
import { NavLink } from "react-router-dom";
import { FaXTwitter, FaInstagram,} from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="flex justify-between items-center py-8 px-10 bg-inherit text-white border-t-2 border-gold mt-500">
      <div className="footer-left">
        <p className="tracking-wider text-darkGrey font-light">CRAFTIFY</p>
      </div>
      <div className="footer-center flex gap-4">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaXTwitter className="text-2xl mr-8" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="text-2xl mr-8" />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <CiFacebook className="text-2xl" />
        </a>
      </div>
      <div className="footer-right">
        <NavLink
          to="/contact"
          className="py-2 px-4 rounded border border-gold rounded-full text-darkGrey text-xs"
        >
          Contactez-nous
        </NavLink>
      </div>
    </footer>
  );
};

export default Footer;
