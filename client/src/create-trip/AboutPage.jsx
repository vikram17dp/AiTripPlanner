import React from 'react'
import { Button } from "@/components/ui/button"
import { ArrowRight, Map, Clock, Sparkles, Users } from 'lucide-react'

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">About AI Trip Planner</h1>
      
      <section className="mb-12">
        <p className="text-xl mb-4">
          AI Trip Planner is your intelligent companion for creating personalized travel itineraries. 
          We combine cutting-edge artificial intelligence with comprehensive travel data to craft 
          the perfect trip tailored to your preferences.
        </p>
        <Button className="mt-4">
          Start Planning <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Our Features</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <FeatureCard 
            icon={<Map className="h-8 w-8 text-blue-500" />}
            title="Smart Destination Suggestions"
            description="Our AI analyzes your preferences to recommend ideal destinations you'll love."
          />
          <FeatureCard 
            icon={<Clock className="h-8 w-8 text-green-500" />}
            title="Efficient Itinerary Planning"
            description="Save time with AI-generated itineraries that maximize your travel experience."
          />
          <FeatureCard 
            icon={<Sparkles className="h-8 w-8 text-purple-500" />}
            title="Personalized Experiences"
            description="Discover unique activities and hidden gems tailored to your interests."
          />
          <FeatureCard 
            icon={<Users className="h-8 w-8 text-red-500" />}
            title="Group Travel Optimization"
            description="Easily plan trips for solo travelers, couples, families, or large groups."
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Why Choose Us?</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Advanced AI technology for superior trip planning</li>
          <li>Customizable itineraries to suit your travel style</li>
          <li>Time-saving solutions for busy travelers</li>
          <li>Budget-friendly options for all types of travelers</li>
          <li>Continuous updates with new destinations and activities</li>
        </ul>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6">Get Started Today</h2>
        <p className="mb-4">
          Ready to embark on your next adventure? Let AI Trip Planner take the stress out of 
          travel planning. Create your personalized itinerary in minutes and start exploring 
          the world your way.
        </p>
        <Button size="lg">
          Plan Your Dream Trip Now <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </section>
    </div>
  )
}

const FeatureCard = ({ icon, title, description }) => (
  <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-semibold ml-3">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
)

export default AboutPage

