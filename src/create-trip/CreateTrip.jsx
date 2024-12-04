import React, { useState, useEffect } from "react";

const CreateTrip = () => {
  const apiKey = import.meta.env.VITE_TOM_TOM_API_KEY;
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.15.0/maps/maps-web.min.js?key=${apiKey}`;
    script.type = "text/javascript";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey]);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 2) {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.tomtom.com/search/2/search/${value}.json?key=${apiKey}&typeahead=true&limit=5`
        );
        const data = await response.json();
        setSuggestions(data.results);
      } catch (error) {
        console.error("Error fetching autocomplete suggestions:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (address) => {
    setInputValue(address);
    setSuggestions([]);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className="text-gray-500 mt-3 text-md">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>
      <div className="mt-16">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is the destination of choice?
          </h2>
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Search for a destination"
              className="w-full border rounded-lg p-2"
            />
            {loading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-spin">
                <svg
                  className="w-6 h-6 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v1m0 14v1m4-9h1m-14 0h1m3.25-3.25l.7-.7M6.75 17.75l.7-.7m10.7-1.4l.7.7M6.75 6.75l.7.7"
                  />
                </svg>
              </div>
            )}
            {suggestions.length > 0 && (
              <div className="border mt-2 rounded-lg bg-white shadow-lg max-h-60 overflow-auto">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSuggestionClick(suggestion.address.freeformAddress)}
                  >
                    {suggestion.address.freeformAddress}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
