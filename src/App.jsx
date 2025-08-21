import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Chat } from "./components/Chat";
import { Auth } from "./components/Auth";
import { RoomSelection } from "./components/RoomSelection";
import { Profile } from "./components/Profile";
import { LandingPage } from "./components/LandingPage";
import { About } from "./components/About";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AppWrapper } from "./components/AppWrapper";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AuthErrorBoundary from "./components/AuthErrorBoundary";
import "./App.css";
import { AuthLoading } from "./components/LoadingComponents";
import { db } from "./firebase-config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const messagesRef = collection(db, "messages");

// Main App Router Component (inside AuthProvider)
function AppRouter() {
  const [dark, setDark] = useState(false);
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    document.body.className = dark ? "dark" : "";
  }, [dark]);

  function getBotReply(userMsg) {
    const msg = userMsg.toLowerCase();
    if (msg.includes("hello") || msg.includes("hi"))
      return "Hello! 👋 How can I help you?";
    if (msg.includes("help"))
      return "I'm here to assist you. Try saying 'hello'!";
    if (msg.includes("bye")) return "Goodbye! 👋";
    return "I'm a simple bot. Try saying 'hello', 'help', or 'bye'!";
  }

  async function sendBotReply(room, userMsg) {
    setTimeout(async () => {
      await addDoc(messagesRef, {
        text: getBotReply(userMsg),
        createdAt: serverTimestamp(),
        user: "ChatBot",
        room,
      });
    }, 800);
  }

  // Show loading while determining auth state
  if (loading) {
    return <AuthLoading />;
  }

  return (
    <AppWrapper dark={dark} setDark={setDark}>
      <Routes>
        {/* Landing page route - show to authenticated users */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <ProtectedRoute>
                <LandingPage />
              </ProtectedRoute>
            ) : (
              <LandingPage />
            )
          }
        />

        {/* Auth route - redirect to landing page if already authenticated */}
        <Route
          path="/auth"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Auth />}
        />

        {/* Protected room selection route - ADD THIS */}
        <Route
          path="/rooms"
          element={
            <ProtectedRoute>
              <RoomSelection dark={dark} />
            </ProtectedRoute>
          }
        />

        {/* Protected chat route with room parameter */}
        <Route
          path="/chat/:roomId"
          element={
            <ProtectedRoute>
              <Chat dark={dark} />
            </ProtectedRoute>
          }
        />

        {/* Protected about route */}
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About dark={dark} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile dark={dark} />
            </ProtectedRoute>
          }
        />


        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppWrapper>
  );
}

// Main App Component
function ChatApp() {
  return (
    <AuthErrorBoundary>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </AuthErrorBoundary>
  );
}

export default ChatApp;
