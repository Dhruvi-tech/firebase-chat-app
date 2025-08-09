import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase-config";
import { useAuth } from "../contexts/AuthContext";
import { cn } from "../lib/utils";
import { doc } from "firebase/firestore";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  setDoc,        
  updateDoc,
  deleteDoc,  
  arrayUnion,
} from "firebase/firestore";
import EmojiPicker from "emoji-picker-react";
import { IoMdHappy } from "react-icons/io"; // emoji icon


function useSeenTracker(messages, user,roomParticipants) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !user?.uid) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const messageId = entry.target.dataset.id;
            const messageUser = entry.target.dataset.user;
            const seenBy = JSON.parse(entry.target.dataset.seenby || "[]");

            if (
              messageUser !== (user?.displayName || "Anonymous") &&
              !seenBy.includes(user?.uid) && roomParticipants.includes(user?.uid)
            ) {
              const messageRef = doc(db, "messages", messageId);
              console.log("Marking message as seen:", messageId, "by", user.uid);
              await updateDoc(messageRef, {
                seenBy: arrayUnion(user.uid),
              });
            }
          }
        }
      },
      { threshold: 0.75 }
    );

    const messageEls = containerRef.current.querySelectorAll("[data-id]");
    messageEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [messages, user,roomParticipants]);

  return containerRef;
}


function getBotReply(userMsg) {
  const msg = userMsg.toLowerCase();

  if (msg.includes("love") || msg.includes("❤️"))
    return "Aww, sending you lots of ❤️!";
  if (msg.includes("happy") || msg.includes("good job"))
    return "😊 That makes me happy too!";
  if (msg.includes("sad") || msg.includes("cry"))
    return "Oh no! 😢 If you want to talk, I'm here.";

  if (msg.includes("fact") || msg.includes("quote")) {
    const facts = [
      "Did you know? Honey never spoils!",
      "“The best way to get started is to quit talking and begin doing.” – Walt Disney",
      "Fun fact: Bananas are berries, but strawberries aren't!",
      "“Keep your face always toward the sunshine—and shadows will fall behind you.” – Walt Whitman",
    ];
    return facts[Math.floor(Math.random() * facts.length)];
  }

  if (msg.includes("remind") || msg.includes("reminder")) {
    return "Don't forget to drink water and take a short break! 💧🕒";
  }

  if (msg.includes("mood:")) {
    const mood = msg.split("mood:")[1]?.trim();
    if (mood) {
      return `Mood saved: "${mood}". Remember, it's okay to feel how you feel!`;
    }
    return "Please tell me your mood after 'mood:'. For example, 'mood: happy'";
  }

  if (msg.includes("hi") || msg.includes("hello"))
    return "Hello! What's your name?";
  if (msg.includes("my name is")) {
    const name = msg.split("my name is")[1]?.trim().split(" ")[0];
    return name
      ? `Nice to meet you, ${name}! How are you today?`
      : "Nice to meet you! How are you today?";
  }
  if (msg.includes("how are you"))
    return "I'm just a bot, but I'm doing well! How about you?";
  if (msg.includes("good") || msg.includes("fine") || msg.includes("great"))
    return "That's wonderful to hear!";
  if (msg.includes("bad") || msg.includes("not well") || msg.includes("sad"))
    return "I'm sorry to hear that. If you want to talk, I'm here!";
  if (msg.includes("bye")) return "Goodbye! Have a great day!";

  return "Let's keep chatting! You can say hi, tell me your name, ask for a fact, or type 'mood: happy'.";
}

async function sendBotReply(messagesRef, room, userMsg) {
  setTimeout(async () => {
    await addDoc(messagesRef, {
      text: getBotReply(userMsg),
      createdAt: serverTimestamp(),
      user: "ChatBot",
      room,
    });
  }, 800);
}
const typingMessage = {
  id: "typing-indicator",
  user: "System",
  text: "You are typing...",
  isTypingIndicator: true,
};

export const Chat = ({ dark }) => {
  const { roomId } = useParams();
  const { user } = useAuth();
  const room = decodeURIComponent(roomId);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");
  const [roomParticipants, setRoomParticipants] = useState([]);
  const bottomRef = useRef(null);
  const containerRef = useSeenTracker(messages, user,roomParticipants);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef(null);

  const handleEmojiClick = (emojiData) => {
  const cursorPos = inputRef.current.selectionStart;
  const textBefore = newMessage.substring(0, cursorPos);
  const textAfter = newMessage.substring(cursorPos);
  setNewMessage(textBefore + emojiData.emoji + textAfter);

  // Keep focus in input after selecting
  setTimeout(() => {
    inputRef.current.focus();
    inputRef.current.selectionStart = cursorPos + emojiData.emoji.length;
    inputRef.current.selectionEnd = cursorPos + emojiData.emoji.length;
  }, 0);
};

const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    
    if (!isTyping) setIsTyping(true);

    // Clear existing timeout
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    // Set timeout to mark typing stopped after 1.5 seconds of no typing
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1500);
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const q = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const updatedMessages = [];
      for (const docSnap of snapshot.docs) {
        const data = docSnap.data();
        const messageId = docSnap.id;
        if (
          data.userId !== user?.uid &&
          !(data.deliveredTo || []).includes(user?.uid)
        ) {
          await updateDoc(docSnap.ref, {
            deliveredTo: arrayUnion(user?.uid),
          });
        }
        updatedMessages.push({ ...data, id: messageId });
      }
      setMessages(updatedMessages);
    });
  
    return () => unsubscribe();
  }, [room, user]);
  useEffect(() => {
    if (!room) return;
    
    const activeUsersRef = collection(db, "activeUsers");
    const q = query(activeUsersRef, where("room", "==", room));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const participants = [];
      snapshot.forEach((doc) => {
        participants.push(doc.data().uid);
      });
      setRoomParticipants(participants);
    });
  
    return () => unsubscribe();
  }, [room]);
  useEffect(() => {
    if (!user || !room) return;
    const userRef = doc(db, "activeUsers", user.uid);
    const joinRoom = async () => {
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName || "Anonymous",
        room,
        lastActive: serverTimestamp(),
      });
    };
    const leaveRoom = async () => {
      await deleteDoc(userRef);
    };
    joinRoom();
    window.addEventListener("beforeunload", leaveRoom);
    return () => {
      leaveRoom();
      window.removeEventListener("beforeunload", leaveRoom);
    };
  }, [room, user]);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newMessage.trim() === "") return;
    console.log("Adding messages: ")

    setNewMessage("");

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: user?.displayName || "Anonymous",
      userId: user?.uid,
      room,
      deliveredTo: [],
      seenBy: [],
      roomParticipants:roomParticipants.filter(uid => uid !== user?.uid),
    });
    
    console.log("message added")

    sendBotReply(messagesRef, room, newMessage);
    
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col overflow-x-hidden p-4 ">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col flex-1 space-y-6">

            {/* Messages */}
            <div 
            ref={containerRef}
            className="flex flex-col gap-0 max-h-[500px] overflow-y-auto border rounded-lg p-4" style={{ height: "380px" }}>
              {messages.map((message) => {
                const isCurrentUser =
                  message.user === (user?.displayName || "Anonymous");
                const isSystemMessage =
                  message.user === "ChatBot" || message.user === "System";

                return (
                  <div
                    key={message.id}
                    data-id={message.id}
                    data-user={message.user}
                    data-userid={message.userId}
                    data-seenby={JSON.stringify(message.seenBy || [])}
                    data-roomparticipants={JSON.stringify(message.roomParticipants || [])}
                    className={cn(
                      "flex items-end gap-3 p-4",
                      isCurrentUser && !isSystemMessage && "justify-end"
                    )}
                  >
                    {!isCurrentUser && (
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
                        style={{
                          backgroundImage: isSystemMessage
                            ? `url("https://ui-avatars.com/api/?name=🤖")`
                            : `url("https://ui-avatars.com/api/?name=${
                                message.user?.[0]?.toUpperCase() || "U"
                              }")`,
                        }}
                        title={message.user || "Anonymous"}
                      ></div>
                    )}

                    <div
                      className={cn(
                        "flex flex-1 flex-col gap-1",
                        isCurrentUser && !isSystemMessage
                          ? "items-end"
                          : "items-start"
                      )}
                    >
                      <p
                        className={cn(
                          "font-normal leading-normal max-w-sm text-muted-foreground",
                          isCurrentUser && !isSystemMessage && "text-right"
                        )}
                      >
                        {message.user ?? "Anonymous"}
                      </p>
                      <div className="flex flex-col items-end">
                        <p
                          className={cn(
                            "text-base font-normal leading-normal flex max-w-sm rounded-lg px-4 py-3",
                            isCurrentUser && !isSystemMessage
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-foreground"
                          )}
                        >
                          {message.text}
                        </p>
                        {isCurrentUser && !isSystemMessage &&(
                          <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            {(message.seenBy?.some((uid) => uid !== user?.uid && roomParticipants.includes(uid))) ? (
                              <span className="text-blue-500">✔✔</span>):(message.deliveredTo?.some((uid) => uid !== user?.uid && roomParticipants.includes(uid))) ?(<span className="text-gray-500">✔✔</span>):(<span className="text-gray-400">✔</span>

                              )}
                              </div>
                        )}
                        
                      </div>
                     
                    </div>

                    {isCurrentUser && !isSystemMessage && (
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
                        style={{
                          backgroundImage: user?.photoURL
                            ? `url("${user.photoURL}")`
                            : `url("https://via.placeholder.com/40x40/0a52c6/ffffff?text=${
                                user?.displayName?.[0] || "U"
                              }")`,
                        }}
                      ></div>
                    )}
                  </div>
                );
              })}
              {isTyping && (
  <div
    key={typingMessage.id}
    className={cn(
      "flex items-end gap-3 p-4 justify-start", // always left aligned
      "opacity-60 italic text-gray-500 select-none"
    )}
  >
    <div
      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 shrink-0"
      style={{
        backgroundImage: `url("https://ui-avatars.com/api/?name=🤖")`,
      }}
      title={typingMessage.user}
    />
    <div className="flex flex-col gap-1 items-start">
      <p className="font-normal leading-normal max-w-sm text-muted-foreground">
        {typingMessage.user}
      </p>
      <p className="text-base font-normal leading-normal max-w-sm rounded-lg px-4 py-3 bg-muted text-foreground">
        {typingMessage.text}
      </p>
    </div>
  </div>
)}

              <div ref={bottomRef} />

            </div>

            {/* Input */}
     <form onSubmit={handleSubmit} className="mt-4">
  <div className="flex items-center px-4 py-4 gap-4 rounded-lg border relative">
    {/* User avatar */}
    <div
      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0"
      style={{
        backgroundImage: user?.photoURL
          ? `url("${user.photoURL}")`
          : `url("https://ui-avatars.com/api/?name=${
              user?.displayName?.[0] || "U"
            }")`,
      }}
    ></div>

  
  {/* Emoji Picker Button */}
<div className="relative" style={{ overflow: "visible" }}>
  <button
    type="button"
    onClick={() => setShowEmojiPicker((prev) => !prev)}
    className="text-2xl hover:opacity-70"
  >
    <IoMdHappy />
  </button>

  {showEmojiPicker && (
    <div
      className="absolute z-50"
      style={{
        bottom: "50px", // lifts it above the button
        left: 0,
      }}
    >
      <EmojiPicker
        onEmojiClick={handleEmojiClick}
        autoFocusSearch={false}
      />
    </div>
  )}
</div>


    {/* Message Input */}
    <label className="flex flex-col min-w-40 h-12 flex-1">
      <div className="flex w-full items-stretch rounded-lg h-full">
        
        <input
          ref={inputRef}
          type="text"
          value={newMessage}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="form-input flex w-full resize-none overflow-hidden rounded-l-lg border-none px-4 text-base focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-white text-black dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Send
        </button>
      </div>
    </label>
  </div>
</form>


          </div>
        </div>
      </div>
    </div>
  );
};