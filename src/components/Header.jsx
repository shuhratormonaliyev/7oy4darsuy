import React, { useContext } from "react";
import { UserContext, TokenContext } from "../App";
import { useNavigate, Link, NavLink } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

function Header() {
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage("theme", false);
  const token = useContext(TokenContext);
  const user = useContext(UserContext);
  const navigate = useNavigate();
  console.log(token);
  
  function logout(event) {
    token.setToken("");
    user.setUser("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  }
  
  const handleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    if (!isDarkTheme) {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  };
  
  return (
    <div className="bg-base-200">
      <div className="header-auth bg-neutral text-white ">
        <div className="flex justify-end max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5">
          {token.token && (
            <div className="flex gap-x-2 items-center">
              <h1 className="text-right text-xs text-blue-50 sm:text-sm">
                Hello, {user.user.name}
              </h1>
              <button onClick={logout} className="btn btn-xs btn-outline btn-primary">
                LOGOUT
              </button>
            </div>
          )}
          {!token.token && (
            <div className="flex gap-x-2 items-center">
              <Link
                to="login"
                className=" hover:underline cursor-pointer text-right text-xs sm:text-sm"
              >
                Sign in / Guest
              </Link>
              <Link
                to="register"
                className="hover:underline cursor-pointer text-right text-xs sm:text-sm"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="navbar bg-base-200 mx-auto max-w-6xl ">
        <div className="container mx-auto">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
            </div>
            <Link to="/" className="btn bg-blue-600 rounded-xl text-2xl text-white">C</Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li className="rounded-md"><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/products">Products</NavLink></li>
              {token.token && (
                <>
                  <li><NavLink to="/checkout">Checkout</NavLink></li>
                  <li><NavLink to="/orders">Orders</NavLink></li>
                </>
              )}
              <li><NavLink to="/cart">Cart</NavLink></li>
            </ul>
          </div>
          <div className="navbar-end flex justify-end gap-5">
            <label className="swap swap-rotate">
              <input
                type="checkbox"
                checked={isDarkTheme}
                onChange={handleTheme}
                className="theme-controller"
              />
              {/* sun icon */}
              <svg
                className="swap-on h-7 w-7 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path
                  d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
              {/* moon icon */}
              <svg
                className="swap-off h-7 w-7 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path
                  d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="badge badge-sm indicator-item">0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;