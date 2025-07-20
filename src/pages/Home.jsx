import React, { useEffect, useState } from "react";
import service from "../appwrite/conf";
import { Container, Loader, PostCard } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    service
      .getPosts([])
      .then((posts) => {
        if (posts.documents.length > 0) {
          setPosts(posts.documents);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="relative isolate my-0.5 z-0 bg-white dark:bg-gray-900 px-6 py-10 md:py-4 lg:px-8">
        <div className="relative mx-auto max-w-2xl py-24">
          <div className="absolute inset-x-0 -top-[4rem] -z-10 transform-gpu overflow-hidden blur-3xl md:-top-[10rem]">
            <svg
              className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
              viewBox="0 0 1155 678"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
                fillOpacity=".3"
                d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
              />
              <defs>
                <linearGradient
                  id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                  x1="1155.49"
                  x2="-78.208"
                  y1=".177"
                  y2="474.645"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#9089FC" />
                  <stop offset={1} stopColor="#FF80B5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="text-center">
            <h1 className="md:text-4xl text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Welcome to I ❤️ Metallurgy
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin metus orci, consectetur eget ornare ut, imperdiet vulputate felis. Fusce lobortis nisi leo, eget finibus nisl porta eget. Praesent maximus magna velit, id volutpat neque aliquam non. Aenean tempus ultrices volutpat. Mauris pulvinar viverra libero, non porttitor mauris maximus aliquet. Cras lacus ante, hendrerit vel urna vel, tincidunt iaculis tortor. Vestibulum nisi risus, condimentum nec lacinia ut, mollis a diam. Ut vitae purus vulputate, ornare erat eu, faucibus enim. Sed condimentum massa non aliquam cursus. Pellentesque fringilla felis sed enim auctor hendrerit. Duis consectetur, turpis eget malesuada interdum, quam ex consequat libero, ut maximus erat sem quis nisi. Etiam id felis sit amet massa condimentum interdum. Fusce lectus quam, vehicula at diam id, consequat hendrerit neque. Donec bibendum arcu sit amet turpis maximus, sed imperdiet odio auctor.
            </p>

            {/* Conditionally render login/signup buttons only if not logged in */}
            {!authStatus && (
              <div className="mt-10 flex items-center justify-center gap-x-2">
                <Link
                  to="/login"
                  className="rounded-md border border-black dark:border-white px-4 py-2 text-sm font-semibold text-black dark:text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:border-black/80 hover:shadow-md hover:scale-105"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="rounded-md border border-black dark:border-white px-4 py-2 text-sm font-semibold text-black dark:text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:border-black/80 hover:shadow-md hover:scale-105"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
        {/* Home ko aur aage bhadana hai */}
      </div>
    </>
  );
};

export default Home;
