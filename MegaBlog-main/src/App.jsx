import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header, Loader } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // 👤 Auth check
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.log("App :: useEffect :: error ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // 🌗 Dark mode state with persistence
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return loading ? (
    <div className="text-center p-2 w-full my-16">
      <Loader />
    </div>
  ) : (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-100 dark:bg-zinc-900 transition-colors duration-300">
      <div className="w-full block">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="text-gray-900 dark:text-gray-100">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
