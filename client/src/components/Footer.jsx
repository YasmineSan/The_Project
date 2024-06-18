import React from "react";
import { NavLink } from "react-router-dom";
import { FaXTwitter, FaInstagram,} from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="bg-inherit border-t-2 border-gold mx-auto">
      <div className="flex container justify-between gap-5 flex-wrap flex-col sm:flex-row items-center mx-auto lg:px-10 px-4 pt-10">
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
            className="py-2 px-4 rounded border border-gold rounded-full text-darkGrey text-s"
          >
            Contactez-nous
          </NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
