import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{backgroundImage: "url('/home.jpg')"}}
        aria-hidden="true"
      ></div>

      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-orange-500 mb-4 sm:mb-6 animate-fade-in-down ">
          Explore Beyond Boundaries:
          <span className="block mt-2 text-yellow-300 drop-shadow-lg">AI-Personalized Travel Itineraries</span>
        </h1>
        <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-sm lg:text-sm text-gray-400  max-w-2xl mx-auto animate-fade-in-up font-medium">
          Embark on extraordinary journeys tailored just for you. Let our AI craft your perfect adventure, blending your dreams with insider knowledge.
        </p>
        <div className="mt-6 sm:mt-8 md:mt-10 animate-pulse">
          <Link to={'/create-trip'}>
            <Button 
              size="lg" 
              className="bg-green-400 hover:bg-yellow-500 text-purple-900 font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg text-sm sm:text-base"
            >
              Get Started - Its Free!
            </Button>
          </Link>
        </div>
        <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <FeatureItem icon="🌍" text="1000+ Destinations" />
          <FeatureItem icon="🤖" text="AI-Powered Planning" />
          <FeatureItem icon="💰" text="Budget-Friendly Options" />
        </div>
      </div>
      <div 
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6"
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
      >
        <Link 
          to="/chatbot" 
          className="block p-3 sm:p-4 bg-blue-600 text-white rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out"
          aria-label="AI Chatbot"
        >
          <span className="text-xl sm:text-2xl">💬</span>
        </Link>
        {isTooltipVisible && (
          <div className="absolute bottom-full right-0 mb-2 px-2 py-1 sm:px-3 sm:py-2 bg-white text-blue-600 text-xs sm:text-sm font-bold rounded shadow-lg whitespace-nowrap">
            AI Chatbot
          </div>
        )}
      </div>
    </div>
  )
}

const FeatureItem = ({ icon, text }) => (
  <div className="flex items-center space-x-2 text-white">
    <span className="text-xl sm:text-2xl">{icon}</span>
    <span className="text-xs sm:text-sm font-semibold">{text}</span>
  </div>
)

export default Hero

