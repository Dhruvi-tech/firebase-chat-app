import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { cn } from "../lib/utils";

export const Navigation = ({ route, roomId, customTitle, dark, setDark }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  // Simple navigation content based on user authentication
  const getNavigationContent = () => {
    if (!user) {
      // Public navigation (not authenticated)
      return {
        title: route === "auth" ? "Sign In" : "Welcome to ChatApp",
        showAuth: route !== "auth",
        showUserMenu: false,
      };
    }

    // Protected navigation (authenticated)
    return {
      title:
        route === "chat"
          ? customTitle || `Chat Room - ${roomId || "Unknown"}`
          : "Chat Rooms",
      showAuth: false,
      showUserMenu: true,
    };
  };

  const navContent = getNavigationContent();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  const handleProfile = async () => {
    try {
      navigate("/profile");
    } catch (error) {
      console.error("Profile failed", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="navbar">
      <div className="flex items-center gap-4 text-gray-900 dark:text-gray-100">
        <div className="size-4">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_6_543)">
              <path
                d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z"
                fill="currentColor"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z"
                fill="currentColor"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_6_543">
                <rect width="48" height="48" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
        </div>
        <h2 className="text-gray-900 dark:text-gray-100 text-lg font-bold leading-tight tracking-[-0.015em]">
          {navContent.title}
        </h2>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-6 md:gap-9">
          {user ? (
            // Authenticated navigation
            <>
              <NavLink
                to="/rooms"
                className={({ isActive }) =>
                  cn(
                    "text-sm font-medium leading-normal transition-colors",
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
                  )
                }
              >
                Rooms
              </NavLink>
              <Link
                to="/about"
                className="text-gray-900 dark:text-gray-100 text-sm font-medium leading-normal hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                About
              </Link>
            </>
          ) : (
            // Public navigation
            <>
              <Link
                to="/"
                className="text-gray-900 dark:text-gray-100 text-sm font-medium leading-normal hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Home
              </Link>
              <Link
                to="#"
                className="text-gray-900 dark:text-gray-100 text-sm font-medium leading-normal hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                About
              </Link>
              <Link
                to="#"
                className="text-gray-900 dark:text-gray-100 text-sm font-medium leading-normal hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Contact
              </Link>
              {navContent.showAuth && (
                <Link
                  to="/auth"
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm font-medium leading-normal px-4 py-2 rounded-lg transition-colors"
                >
                  Sign In
                </Link>
              )}
            </>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100  dark:hover:bg-gray-800 transition-colors"
          onClick={() => setDark?.((d) => !d)}
          title="Toggle theme"
          aria-label="Toggle dark mode"

        >
          {dark ? "🌙" : "☀️"}
        </button>

        {navContent.showUserMenu && user && (
          <div className="relative" ref={menuRef}>
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 cursor-pointer hover:ring-2 hover:ring-blue-300 transition-all"
              style={{
                backgroundImage: user.photoURL
                  ? `url("${user.photoURL}")`
                  : `url("https://ui-avatars.com/api/?name=${
                      user.displayName?.[0] || "U"
                    }&background=random")`,
              }}
              title={user.displayName || "User"}
              onClick={() => setShowUserMenu(!showUserMenu)}
            ></div>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                <div className="p-4 border-b border-gray-100 dark:border-gray-600">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {user.email || "No email"}
                  </p>
                </div>
                <button
                  onClick={handleProfile}
                  className="w-full text-left px-4 py-3 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  Profile
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
