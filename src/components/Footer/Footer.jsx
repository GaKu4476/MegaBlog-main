import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="relative w-full bottom-0 overflow-hidden bg-white dark:bg-zinc-900 py-2 lg:py-4">
      <div className="lg:container relative z-10 mx-auto lg:px-4">
        <div className="lg:-m-8 flex flex-wrap items-center lg:justify-between">
          <div className="w-auto px-4 lg:p-8">
            <Logo width="100px" />
          </div>
          <div className="w-auto p-8 lg:p-8">
            <ul className="-m-5 flex flex-wrap gap-x-3 md:gap-0 items-center">
              <li className="p-1 md:p-5">
                <Link
                  className="font-medium text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                  to="/"
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="p-1 md:p-5">
                <Link
                  className="font-medium text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                  to="/"
                >
                  Terms of Service
                </Link>
              </li>
              <li className="p-1 md:p-5">
                <Link
                  className="font-medium text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                  to="/"
                >
                  Return Policy
                </Link>
              </li>
              <li className="p-1 md:p-5">
                <Link
                  className="font-medium text-gray-600 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                  to="/contact-us"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-auto py-0 px-4 lg:p-8">
            <div className="-m-1.5 flex flex-wrap">
              
            </div>
          </div>
        </div>
        <div className="mt-4 text-gray-500 text-center text-[10px] md:text-xs dark:text-gray-400">
          <p>© {new Date().getFullYear()} MegaBlog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
