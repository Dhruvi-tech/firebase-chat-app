import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase-config";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
} from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";
import { ButtonLoader } from "./LoadingComponents";
import { cn } from "../lib/utils";

export const Auth = () => {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [anonLoading, setAnonLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { clearError, error: authContextError } = useAuth();

  const from = location.state?.from || "/";

  useEffect(() => {
    clearError();
    setAuthError(null);
  }, [clearError]);

  const handleAuthError = (error, method) => {
    console.error(`${method} authentication error:`, error);

    let errorMessage = "Authentication failed. Please try again.";

    switch (error.code) {
      case "auth/popup-closed-by-user":
        errorMessage = "Sign-in was cancelled. Please try again.";
        break;
      case "auth/popup-blocked":
        errorMessage = "Popup was blocked. Please allow popups and try again.";
        break;
      case "auth/network-request-failed":
        errorMessage =
          "Network error. Please check your connection and try again.";
        break;
      case "auth/too-many-requests":
        errorMessage = "Too many attempts. Please wait a moment and try again.";
        break;
      case "auth/user-disabled":
        errorMessage =
          "This account has been disabled. Please contact support.";
        break;
      case "auth/operation-not-allowed":
        errorMessage =
          "This sign-in method is not enabled. Please contact support.";
        break;
      default:
        errorMessage = `Authentication failed: ${error.message}`;
    }

    setAuthError(errorMessage);
  };

  const signInWithGoogle = async () => {
    try {
      setGoogleLoading(true);
      setAuthError(null);
      clearError();

      const provider = new GoogleAuthProvider();
      // Add additional scopes if needed
      provider.addScope("profile");
      provider.addScope("email");

      // Configure popup
      provider.setCustomParameters({
        prompt: "select_account",
      });

      const result = await signInWithPopup(auth, provider);

      if (result.user) {
        // Navigate to intended destination (landing page by default)
        navigate(from, { replace: true });
      }
    } catch (error) {
      handleAuthError(error, "Google");
    } finally {
      setGoogleLoading(false);
    }
  };

  const signInAnon = async () => {
    try {
      setAnonLoading(true);
      setAuthError(null);
      clearError();

      const result = await signInAnonymously(auth);

      if (result.user) {
        // Navigate to intended destination (landing page by default)
        navigate(from, { replace: true });
      }
    } catch (error) {
      handleAuthError(error, "Anonymous");
    } finally {
      setAnonLoading(false);
    }
  };

  const clearErrors = () => {
    setAuthError(null);
    clearError();
  };

  // Display error from context or local state
  const displayError = authContextError || authError;

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-40 flex flex-1 justify-center py-12">
          <div className="layout-content-container flex flex-col w-xl max-w-md py-8 px-8 flex-1">
            {/* Logo/Icon */}
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg">
                <svg
                  className="w-8 h-8 text-blue-600 dark:text-blue-400"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_6_543)">
                    <path
                      d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z"
                      fill="currentColor"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_6_543">
                      <rect width="48" height="48" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-3">
                Welcome Back
              </h1>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Sign in to continue your conversations and connect with your community.
              </p>
            </div>

            {/* Error Display */}
            {displayError && (
              <div className="mb-6 animate-in slide-in-from-top duration-300">
                <div className="relative overflow-hidden rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 p-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent"></div>
                  <div className="relative flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 text-red-500 mt-0.5">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                        {displayError}
                      </p>
                      <button
                        onClick={clearErrors}
                        className="text-xs font-semibold text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 transition-colors"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Auth Buttons */}
            <div className="space-y-4">
              <ButtonLoader
                onClick={signInWithGoogle}
                loading={googleLoading}
                disabled={anonLoading}
                className="group relative w-full overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm hover:shadow-md transition-all duration-300 h-12 px-6 text-gray-700 dark:text-gray-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-50/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <div className="relative flex items-center justify-center gap-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </div>
              </ButtonLoader>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-500 dark:text-gray-400 font-medium">
                    or
                  </span>
                </div>
              </div>

              <ButtonLoader
                onClick={signInAnon}
                loading={anonLoading}
                disabled={googleLoading}
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-700 dark:to-gray-600 hover:from-gray-800 hover:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 h-12 px-6 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <div className="relative flex items-center justify-center gap-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                  </svg>
                  Continue as Guest
                </div>
              </ButtonLoader>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                By continuing, you agree to our terms of service and privacy policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};