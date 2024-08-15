"use client";

import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAstronaut, faDragon } from "@fortawesome/free-solid-svg-icons";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Greetings! I am Master Shifu. How can I guide you today?",
    },
  ]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = { role: "user", content: message };
    setMessages((prevMessages) => [
      ...prevMessages,
      newMessage,
      { role: "assistant", content: "..." },
    ]);
    setMessage("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [...messages, newMessage] }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from Gemini API.");
      }

      const data = await response.json();
      const assistantResponse = data.content || "I'm sorry, I couldn't generate a response.";
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1] = {
          role: "assistant",
          content: assistantResponse,
        };
        return updatedMessages;
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: "I'm sorry, there was an error processing your request.",
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="flex flex-col h-full w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex-grow p-4 overflow-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-center ${
                message.role === "user" ? "justify-end" : "justify-start"
              } mb-3`}
            >
              {message.role === "assistant" && (
                <FontAwesomeIcon
                  icon={faDragon}
                  className="text-orange-500 mr-2"
                  size="lg"
                />
              )}
              <div
                className={`px-4 py-2 max-w-sm break-words rounded-lg ${
                  message.role === "user"
                    ? "bg-blue-500 text-white shadow"
                    : "bg-gray-300 text-gray-800 shadow"
                }`}
              >
                {message.content}
              </div>
              {message.role === "user" && (
                <FontAwesomeIcon
                  icon={faUserAstronaut}
                  className="text-blue-500 ml-2"
                  size="lg"
                />
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form
          onSubmit={handleSendMessage}
          className="flex items-center p-2 border-t border-gray-300 bg-gray-100"
        >
          <input
            type="text"
            className="flex-grow p-3 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ color: "black", backgroundColor: "white" }}
          />
          <button
            type="submit"
            className="ml-2 px-5 py-2 text-white rounded-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 shadow hover:shadow-md transition-shadow duration-150"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
