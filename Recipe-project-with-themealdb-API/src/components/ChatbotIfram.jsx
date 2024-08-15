import React, { useState, useEffect } from 'react';
// import chatIcon from './path-to-chat-icon.png'; // Replace with your chat icon path

const ChatbotIcon = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    if (showChatbot) {
      const script1 = document.createElement('script');
      script1.innerHTML = `
        window.embeddedChatbotConfig = {
          chatbotId: "6NOz1aQcFLx4EGa5Wqv7l",
          domain: "www.chatbase.co"
        };
      `;
      document.body.appendChild(script1);

      const script2 = document.createElement('script');
      script2.src = 'https://www.chatbase.co/embed.min.js';
      script2.setAttribute('chatbotId', '6NOz1aQcFLx4EGa5Wqv7l');
      script2.setAttribute('domain', 'www.chatbase.co');
      script2.defer = true;
      document.body.appendChild(script2);

      return () => {
        document.body.removeChild(script1);
        document.body.removeChild(script2);
      };
    }
  }, [showChatbot]);

  const handleIconClick = () => {
    setShowChatbot(true);
  };

  return (
    <div>
      <div
        onClick={handleIconClick}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          cursor: 'pointer',
          zIndex: 1000,
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#FAAB36',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.3s ease'
        }}
      >
        {/* <img
          src={chatIcon}
          alt="Chatbot Icon"
          style={{
            width: '80%',
            height: '80%'
          }}
        /> */}
      </div>
      {showChatbot && (
        <div
          id="chatbot-container"
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '20px',
            width: '100%',
            height: '70%',
            maxWidth: '400px',
            maxHeight: '500px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1000
          }}
        >
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/6NOz1aQcFLx4EGa5Wqv7l"
            width="100%"
            style={{ height: '100%', minHeight: '700px' }}
            frameBorder="0"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default ChatbotIcon;