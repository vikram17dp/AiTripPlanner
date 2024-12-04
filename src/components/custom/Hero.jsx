import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{backgroundImage: "url('/images/travel-landscape.jpg')"}}
        aria-hidden="true"
      ></div>

      {/* Semi-transparent Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-red-500 mb-6 animate-fade-in-down">
          Explore Beyond Boundaries:
          <span className="block mt-2 text-yellow-300 drop-shadow-lg">AI-Personalized Travel Itineraries</span>
        </h1>
        <p className="mt-3 text-sm sm:text-sm md:text-[18px] text-gray-200 md:mt-5 max-w-3xl mx-auto animate-fade-in-up font-medium  ">
          Embark on extraordinary journeys tailored just for you. Let our AI craft your perfect adventure, blending your dreams with insider knowledge.
        </p>
        <div className="mt-10 animate-pulse">
          <Link to={'/create-trip'}>
          <Button 
            size="lg" 
            className="bg-green-400 hover:bg-yellow-500 text-purple-900 font-bold py-4 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            Get Started - Its Free!
          </Button>
          </Link>
        </div>
        <div className="mt-10 flex justify-center space-x-6">
          <FeatureItem icon="🌍" text="1000+ Destinations" />
          <FeatureItem icon="🤖" text="AI-Powered Planning" />
          <FeatureItem icon="💰" text="Budget-Friendly Options" />
        </div>
      </div>
    </div>
  )
}

const FeatureItem = ({ icon, text }) => (
  <div className="flex items-center space-x-2 text-white">
    <span className="text-2xl">{icon}</span>
    <span className="text-sm font-semibold">{text}</span>
  </div>
)

export default Hero

