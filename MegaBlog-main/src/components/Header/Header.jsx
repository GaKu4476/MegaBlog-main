import React, { useEffect, useState } from "react";
import { LogoutBtn, Logo } from "../index";
import { useSelector } from "react-redux";
import { useNavigate, Link, NavLink } from "react-router-dom";

const Header = ({ darkMode, setDarkMode }) => {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const [userName, setUserName] = useState({});

  useEffect(() => {
    if (userData) {
      setUserName(userData.userData ? userData.userData : userData);
    }
  }, [userData, authStatus]);

  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "About", slug: "/about", active: true },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Posts", slug: "/add-post", active: authStatus },
    { name: "My Post", slug: "/my-post", active: authStatus },
  ];

  const navItemSecond = [
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
  ];

  return (
    <header className="sticky top-0 w-full py-2 bg-white dark:bg-zinc-900 z-40 shadow">
      <nav className="mx-auto flex md:max-w-7xl items-center justify-between px-2 md:px-4 py-2 sm:px-6 lg:px-8">
        {/* Left Logo */}
        <div className="inline-flex items-center space-x-2">
          <Link to="/">
            <Logo width="70px" />
          </Link>
        </div>

        {/* Nav Links */}
        <ul className="flex items-center space-x-3 md:space-x-8">
          {navItems.map(
            (item) =>
              item.active && (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    style={({ isActive }) => ({
                      textDecoration: isActive ? "underline" : null,
                    })}
                    className="text-[10px] md:text-base font-semibold text-gray-800 dark:text-gray-100 hover:text-black dark:hover:text-white"
                  >
                    {item.name}
                  </NavLink>
                </li>
              )
          )}
        </ul>

        {/* Right Section: Theme + User */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* 🌗 Theme toggle switch */}
          <div className="flex items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-sky-900 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                {darkMode ? "Dark" : "Light"}
              </span>
            </label>
          </div>

          {!authStatus ? (
            <ul className="inline-flex space-x-2">
              {navItemSecond.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => navigate(item.slug)}
                        className="bg-black text-white text-sm md:text-base font-semibold py-1 md:py-2 px-2 md:px-4 rounded-md hover:scale-[1.01] transition"
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
            </ul>
          ) : (
            <div className="flex items-center space-x-2">
              <span
                className="inline-block rounded-full border px-2 py-1 text-sm font-medium text-black dark:text-white"
                title={userName.email}
              >
                {userName.name?.split(" ")[0]}
              </span>
              <LogoutBtn />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
