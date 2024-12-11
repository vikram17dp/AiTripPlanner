import React, { useState, useRef, useEffect } from "react";
import airobo from './assets/airobo.png';
import submit from './assets/submit.svg';
import upload from './assets/img.svg';
import user from './assets/user1.jpg';
import loadingSpinner from './assets/progress.webp';
import { useNavigate } from "react-router-dom";

const ChatbotPage = () => {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [imageMime, setImageMime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const clickingImage = ()=>{
      navigate('/my-profile')
  }
  const clickingAiImage = ()=>{
    navigate('/')
  }

  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyCoj_9t2jKaVKmd25TUpOS4mNpcmeQFDyo`;

  useEffect(() => {
    scrollToBottom();
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      setUserProfile(user);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userMessage.trim()) {
      handleChatResponse(userMessage);
    }
  };

  const handleChatResponse = (message) => {
    const newMessage = {
      message,
      sender: "user",
      image: imageData ? `data:${imageMime};base64,${imageData}` : null,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setUserMessage("");
    setImageData(null);
    setIsLoading(true);

    setTimeout(() => {
      fetchAIResponse(message);
    }, 600);
  };

  const fetchAIResponse = async (userMessage) => {
    try {
      const requestBody = {
        contents: [
          {
            parts: [
              { text: userMessage },
              ...(imageData ? [{ inline_data: { mime_type: imageMime, data: imageData } }] : []),
            ],
          },
        ],
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();

      setMessages((prevMessages) => [
        ...prevMessages,
        { message: aiResponse, sender: "ai" },
      ]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    let reader = new FileReader();
    reader.onload = (e) => {
      const base64String = e.target.result.split(",")[1];
      setImageData(base64String);
      setImageMime(file.type);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 overflow-y-auto">
      {/* Chat Container */}
      <div className="relative flex-1 min-h-0">
        <div className="absolute inset-0 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-4 space-y-6">
            {/* Welcome Message */}
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-white/10">
                <img src={airobo} alt="AI" className="w-full h-full object-cover cursor-pointer" onClick={()=>clickingAiImage()}/>
              </div>
              <div className="bg-white/10 backdrop-blur-md text-white p-4 rounded-2xl rounded-tl-none max-w-[80%] shadow-lg">
                Hello! How can I help you today?
              </div>
            </div>

            {/* Messages */}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start space-x-3 ${
                  msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-white/10">
                  {msg.sender === 'ai' ? (
                    <img src={airobo} alt="AI" className="w-full h-full object-cover" />
                  ) : (
                    <img
                      src={userProfile?.image || user}
                      alt="User"
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={()=>clickingImage()}
                    />
                  )}
                </div>
                <div
                  className={`p-4 rounded-2xl shadow-lg max-w-[80%] ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600/70 text-white rounded-tr-none'
                      : 'bg-white/10 backdrop-blur-md text-white rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.message}</p>
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Uploaded content"
                      className="mt-3 rounded-lg max-w-full h-auto cursor-pointer"
                    />
                  )}
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-center">
                <img src={loadingSpinner} alt="Loading..." className="w-8 h-8" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-black/30 backdrop-blur-md border-t border-white/10">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4 flex items-center gap-2">
          <div className="relative flex-grow">
            {imageData && (
              <div className="absolute left-2 -top-16 bg-black/40 p-1 rounded-lg">
                <img
                  src={`data:${imageMime};base64,${imageData}`}
                  alt="Preview"
                  className="w-12 h-12 object-cover rounded-lg"
                />
              </div>
            )}
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Type your message here..."
              className="w-full bg-white/10 text-white rounded-full py-3 px-6 outline-none focus:ring-2 focus:ring-white/25 placeholder-white/50"
            />
          </div>
          
          <button
            type="button"
            onClick={() => document.getElementById("fileInput").click()}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
          >
            <img src={upload} alt="Upload" className="w-6 h-6" />
          </button>
          
          <input
            type="file"
            accept="image/*"
            id="fileInput"
            className="hidden"
            onChange={handleFileInputChange}
          />
          
          <button
            type="submit"
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
          >
            <img src={submit} alt="Submit" className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatbotPage;

