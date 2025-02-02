import React, { useState } from 'react';
import './Chatbox.css';

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  // Pre-defined responses - you can modify these based on your needs
  const predefinedResponses = {
    "Hello": "Hi there! How can I help you today?",
    "How are you?": "I'm doing well, thank you for asking! How can I assist you?",
    "What can you do?": "I can help you with various tasks like answering questions, providing information, and assisting with problem-solving.",
    // Add more predefined Q&A pairs as needed
  };

  // Default response for unknown inputs
  const defaultResponse = "I understand your question. Let me help you with that. Based on my analysis...";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    const newUserMessage = {
      text: inputText,
      sender: 'user',
      id: Date.now()
    };

    // Get AI response (either predefined or default)
    const aiResponse = {
      text: predefinedResponses[inputText] || defaultResponse,
      sender: 'ai',
      id: Date.now() + 1
    };

    // Update messages
    setMessages(prev => [...prev, newUserMessage, aiResponse]);
    setInputText('');
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>AI Assistant</h1>
      </div>

      <div className="messages-container">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender}-message`}
          >
            {message.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your message..."
          className="message-input"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbox;