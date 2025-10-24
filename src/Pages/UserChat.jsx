// ============================================
// FILE: src/components/UserChat.jsx (or wherever you have it)
// ============================================
import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";
import { FaPaperPlane } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let apiUrl = import.meta.env.VITE_API_END_POINT;

const UserChat = () => {
  const { authTokens } = useContext(AuthContext);
  const accessToken = authTokens?.access;

  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);

  const chatEndRef = useRef(null);
  const ws = useRef(null);

  const adminId = 2;
  const adminEmail = "teja@gmail.com";

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch logged-in user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${apiUrl}/profile/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setUser({
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
        });
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    if (accessToken) fetchUser();
  }, [accessToken]);

  // Fetch previous messages with admin
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/messages/${adminEmail}/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setMessages(res.data);
        setTimeout(scrollToBottom, 100);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    if (user?.id && accessToken) {
      fetchMessages();
    }
  }, [user, accessToken, adminEmail]);

  // Connect to WebSocket with admin
  useEffect(() => {
    if (!user?.id || !accessToken) return;

    // FIXED: Add token to WebSocket URL
    const socketUrl = `ws://localhost:8000/ws/chat/${adminId}/?token=${accessToken}`;
    const socket = new WebSocket(socketUrl);

    socket.onopen = () => {
      console.log("✅ WebSocket connected");
      setSocketConnected(true);
    };

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      
      // FIXED: Handle correct field names from backend
      const newMsg = {
        sender_id: data.sender_id,
        receiver_id: data.receiver_id,
        content: data.content, // backend now sends 'content'
        timestamp: data.timestamp,
      };

      setMessages((prev) => {
        // Prevent duplicates - check if message already exists
        const exists = prev.some(
          msg => msg.content === newMsg.content && 
                 msg.timestamp === newMsg.timestamp &&
                 msg.sender_id === newMsg.sender_id
        );
        
        if (exists) return prev;
        return [...prev, newMsg];
      });

      setTimeout(scrollToBottom, 100);

      // Notify if message is from admin
      if (data.sender_id !== user.id) {
        toast.info("New message from Admin!");
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      toast.error("Connection error!");
    };

    socket.onclose = () => {
      console.log("❌ WebSocket disconnected");
      setSocketConnected(false);
    };

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, [user, accessToken, adminId]);

  const sendMessage = () => {
    if (newMessage.trim() === "" || !ws.current || ws.current.readyState !== WebSocket.OPEN) {
      toast.error("Cannot send message. Connection not ready.");
      return;
    }

    const messageData = {
      sender_id: user.id,
      receiver_id: adminId,
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    // Send via WebSocket
    ws.current.send(JSON.stringify(messageData));
    
    // FIXED: Don't add to messages here - wait for WebSocket echo
    // The backend will broadcast back to all clients including sender
    
    setNewMessage("");
  };

  if (!user) {
    return <p className="text-center mt-10 text-white">Loading chat...</p>;
  }

  return (
    <div className="flex flex-col h-[90vh] w-full max-w-3xl mx-auto bg-gray-900 text-white border border-gray-700 rounded-xl shadow-lg">
      {/* Header */}
      <div className="p-4 bg-gray-800 border-b border-gray-700 text-lg font-semibold flex items-center justify-between">
        <span>Chat with Admin</span>
        <span className={`text-xs ${socketConnected ? 'text-green-400' : 'text-red-400'}`}>
          {socketConnected ? '● Connected' : '● Disconnected'}
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-gray-400 text-center">No messages yet</p>
        )}

        {messages.map((msg, index) => (
          <div
            key={`${msg.timestamp}-${index}`}
            className={`flex ${
              msg.sender_id === user.id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[75%] ${
                msg.sender_id === user.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-100"
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              <p className="text-[10px] text-gray-400 mt-1 text-right">
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-700 flex items-center gap-2 bg-gray-800">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-full outline-none"
          disabled={!socketConnected}
        />
        <button
          onClick={sendMessage}
          disabled={!socketConnected}
          className={`p-3 rounded-full ${
            socketConnected 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-gray-600 cursor-not-allowed'
          }`}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default UserChat;