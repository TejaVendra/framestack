import { useState } from "react";
import axios from "axios";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    const res = await axios.post("http://localhost:8000/chat/", { message: input });
    const botReply = res.data.reply;
    setMessages([...newMessages, { sender: "bot", text: botReply }]);
  };

  return (
    <div className="p-4 bg-gray-900 text-white h-screen">
      <div className="h-[80%] overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className={msg.sender === "user" ? "text-right" : "text-left"}>
            <p className={`p-2 rounded-xl inline-block ${msg.sender === "user" ? "bg-indigo-600" : "bg-gray-700"}`}>
              {msg.text}
            </p>
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 rounded-l-lg text-black"
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="bg-indigo-600 px-4 rounded-r-lg">
          Send
        </button>
      </div>
    </div>
  );
}
