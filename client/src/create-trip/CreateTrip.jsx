

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AI_PROMPT, SelectBudgetOptions, SelectNoOfPersons } from "@/constants/Options"
import React, { useState, useEffect } from "react"
import { Search, Loader2 } from 'lucide-react'
import { toast } from "sonner"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { doc, setDoc } from "firebase/firestore"
import { db } from "./firebase"
import { chatSession } from "@/service/AiModel"
import { useNavigate } from "react-router-dom"

const CreateTrip = () => {
  const tomTomApiKey = import.meta.env.VITE_TOM_TOM_API_KEY;
  const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const [inputValue, setInputValue] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [days, setDays] = useState("")
  const [selectedBudget, setSelectedBudget] = useState(null)
  const [formData, setFormData] = useState([]);
  const [selectedPersons, setSelectedPersons] = useState(null)
  const navigate = useNavigate();
  useEffect(() => {
    const script = document.createElement("script")
    script.src = `https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.15.0/maps/maps-web.min.js?key=${tomTomApiKey}`
    script.type = "text/javascript"
    script.async = true
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [tomTomApiKey])

  const handleInputChange = async (e) => {
    const value = e.target.value
    setInputValue(value)

    if (value.length > 2) {
      setLoading(true)
      try {
        const response = await fetch(
          `https://api.tomtom.com/search/2/search/${value}.json?key=${tomTomApiKey}&typeahead=true&limit=5`
        )
        const data = await response.json()
        setSuggestions(data.results)
      } catch (error) {
        console.error("Error fetching autocomplete suggestions:", error)
        toast.error("Failed to fetch suggestions. Please try again.")
      } finally {
        setLoading(false)
      }
    } else {
      setSuggestions([])
    }
  }

  const handleSuggestionClick = (address) => {
    setInputValue(address)
    setSuggestions([])
  }

  const OnGenerateTrip = async () => {
    if (!inputValue || !days || selectedBudget === null || selectedPersons === null) {
      toast.error("Please fill all details before submitting.")
      return
    }

    if (parseInt(days) > 5) {
      toast.error("You cannot plan a trip for more than 5 days.")
      return
    }

    const tripData = {
      destination: inputValue,
      days,
      budget: SelectBudgetOptions[selectedBudget],
      persons: SelectNoOfPersons[selectedPersons],
    }

    const FINAL_PROMPT = AI_PROMPT
      .replace("{location}", tripData.destination)
      .replace("{noOfDays}", tripData.days)
      .replace("{People}", tripData.persons.title)
      .replace("{Budget}", tripData.budget.title)

    // console.log("Final Prompt:", FINAL_PROMPT)
    // console.log("Gemini API Key:", import.meta.env.VITE_GEMINI_API_KEY);
    try {
      setLoading(true)
      const result = await chatSession.sendMessage(FINAL_PROMPT)
      const response = await result.response
      const text = response.text()
      SaveTrip(result?.response?.text())
      console.log("AI Response:", text)

      
      toast.success("Trip planned successfully!")
    } catch (error) {
      console.error("Error generating trip:", error)
      toast.error("Failed to plan trip. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const SaveTrip = async(TripData)=>{
      const user = JSON.parse(localStorage.getItem('user'));
      const docId = Date.now().toString()
      await setDoc(doc(db,"AiTrips",docId),{
        userSelection:TripData,
        tripData:TripData,
        userEmail:user?.email,
        id:docId
      })
      navigate('/view-trip/'+docId)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-left mb-2">
        Tell us your travel preferences 🏕️🌴
      </h1>
      <p className="text-gray-600 mb-10 text-md text-left">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            What is the destination of choice?
          </h2>
          <div className="relative">
            <Input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Search for a destination"
              className="w-full pr-10"
            />
            {loading ? (
              <Loader2 className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 animate-spin text-gray-400" />
            ) : (
              <Search className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            )}
            {suggestions.length > 0 && (
              <div className="absolute mt-1 w-full z-10 bg-white border border-gray-200 rounded-md shadow-lg">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                    onClick={() => handleSuggestionClick(suggestion.address.freeformAddress)}
                  >
                    {suggestion.address.freeformAddress}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder="Ex. 3"
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="w-full pr-10"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">What is Your Budget?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                className={`cursor-pointer transition-all duration-300 p-3 border rounded-lg ${
                  selectedBudget === index ? "ring-2 ring-blue-500 shadow-md" : "hover:shadow-lg"
                }`}
                onClick={() => setSelectedBudget(index)}
              >
                <div className="text-4xl mb-2">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">
            How many people are traveling?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SelectNoOfPersons.map((item, index) => (
              <div
                key={index}
                className={`cursor-pointer transition-all duration-300 p-3 border rounded-lg ${
                  selectedPersons === index ? "ring-2 ring-blue-500 shadow-md" : "hover:shadow-lg"
                }`}
                onClick={() => setSelectedPersons(index)}
              >
                <div className="text-4xl mb-2">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <Button
          className="w-full max-w-md mx-auto mt-8 py-6 text-lg bg-slate-600"
          onClick={OnGenerateTrip}
          disabled={loading}
        >
          {loading ? "Planning Trip..." : "Plan My Trip"}
        </Button>
      </div>
    </div>
  )
}

export default CreateTrip

