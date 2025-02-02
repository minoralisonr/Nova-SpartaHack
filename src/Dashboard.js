import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [activeView, setActiveView] = useState('chat'); // Track active view

  // Simulate initial welcome message
  useEffect(() => {
    setTimeout(() => {
      setMessages([{
        text: "Hi, I'm Nova! 🔮 Your personal AI Medical Assistant. How can I help you today?",
        sender: 'ai',
        id: Date.now()
      }]);
      setShowWelcome(false);
    }, 2000);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      text: inputMessage,
      sender: 'user',
      id: Date.now()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');

    // Define a conversation sequence
    const conversationFlow = [
      "Of course! What have you eaten today?",  
      "Perfect! And how many miles have you walked today?",  
      "Thank you! Lastly, I have some lifestyle questions. Do you smoke?",  
      "How much sleep do you typically get?",  
      "Lastly, is there any history of diabetes in your immediate family?",  
      "Calculating your stats.....You've consumed 1000 calories and walked 5075 steps. Your blood glucose is below average at 70 milligrams per deciliter (mg/dL). Your Diabetes risk score is 77/100.",  
      "Anytime. Take care!"  
    ];

    // Track the current conversation step using local state
    let currentStep = messages.filter(msg => msg.sender === 'ai').length - 1;

    // Ensure the AI stops responding after the final response
    if (currentStep >= conversationFlow.length) return;

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        text: conversationFlow[currentStep],
        sender: 'ai',
        id: Date.now() + 1
      };

      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <h2>Nova</h2>
        </div>
        <nav>
          <button
            className={`nav-button ${activeView === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveView('chat')}
          >
            <span>💬 Chat Assistant</span>
          </button>
            <button className="nav-button disabled">
            <span>📊 Dashboard</span>
            </button>
            <button className="nav-button disabled">
            <span>👤 Profile</span>
          </button>
          <button className="nav-button disabled">
            <span>⚙️ Settings</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {activeView === 'chat' && (
          <div className="chat-interface">
            {showWelcome ? (
              <div className="welcome-screen">
                <div className="loading-spinner"></div>
                <p>Setting up your personal health assistant...</p>
              </div>
            ) : (
              <>
                <div className="chat-header">
                  <h2>How are you feeling today?</h2>
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

                <form onSubmit={handleSendMessage} className="message-input-form">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="message-input"
                  />
                  <button type="submit" className="send-button">
                    Send
                  </button>
                </form>
              </>
            )}
          </div>
        )}

        {activeView === 'profile' && (
          <div className="Profile">
          <h1>Profile</h1>
          {/**<div className="profile-fields">
            <div className="field">Full Name: [User's Full Name]</div>
            <div className="field">Disease prevention preference: [Preference]</div>
            <div className="field">Gender: [User's Gender]</div>
            <div className="field">Height: [User's Height] <button>Convert Units</button></div>
            <div className="field">Weight: [User's Weight] <button>Convert Units</button></div>
          </div>
    
          <div className="settings-page">
            <h2>Settings</h2>
            <button>Change Password</button>
            <button>Update Email</button>
            <button>DM Provider</button>
          </div>**/}
        </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;