import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const RoomSelection = ({ dark }) => {
  const [room, setRoom] = useState("");
  const [isAnimated, setIsAnimated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  const handleEnterChat = () => {
    if (room.trim()) {
      navigate(`/chat/${encodeURIComponent(room.trim())}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleEnterChat();
    }
  };

  const popularRooms = [
    { name: "General", icon: "💬", color: "from-blue-500 to-blue-600" },
    { name: "Tech Talk", icon: "💻", color: "from-green-500 to-green-600" },
    { name: "Random", icon: "🎲", color: "from-purple-500 to-purple-600" },
    { name: "Gaming", icon: "🎮", color: "from-red-500 to-red-600" },
  ];

  const handleRoomSelect = (roomName) => {
    setRoom(roomName);
    navigate(`/chat/${encodeURIComponent(roomName)}`);
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Work Sans", "Noto Sans", sans-serif' }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-br from-emerald-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-40 flex flex-1 justify-center py-12">
          <div className={`layout-content-container flex flex-col w-full max-w-2xl py-8 px-8 flex-1 transition-all duration-1000 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            
            {/* Header Section */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                  </svg>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
                Join a Chat Room
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-xl mx-auto">
                Enter a room name to start chatting, or choose from our popular rooms below.
              </p>
            </div>

            {/* Room Input Section */}
            <div className="space-y-6 mb-12">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <input
                  placeholder="Enter a room name..."
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="relative w-full h-16 px-6 text-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-gray-500 dark:placeholder-gray-400"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </div>

              <button
                onClick={handleEnterChat}
                disabled={!room.trim()}
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-gray-400 disabled:to-gray-500 text-white h-16 px-8 text-lg font-semibold shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <span className="relative flex items-center justify-center gap-3">
                  Enter Chat Room
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-12">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-500 dark:text-gray-400 font-medium">
                  or choose a popular room
                </span>
              </div>
            </div>

            {/* Popular Rooms */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-6">
                Popular Rooms
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {popularRooms.map((roomData, index) => (
                  <button
                    key={roomData.name}
                    onClick={() => handleRoomSelect(roomData.name)}
                    className={`group relative overflow-hidden rounded-xl bg-gradient-to-r ${roomData.color} text-white p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <div className="relative flex items-center gap-4">
                      <div className="text-3xl">{roomData.icon}</div>
                      <div className="text-left">
                        <h4 className="font-semibold text-lg">{roomData.name}</h4>
                        <p className="text-white/80 text-sm">Join the conversation</p>
                      </div>
                      <div className="ml-auto">
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Info */}
            <div className="mt-12 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Room names are case-sensitive. Anyone with the room name can join your conversation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};