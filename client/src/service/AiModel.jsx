import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const apiKey = "AIzaSyDme-ewPq--9CTxva2ktsbqQdG2jdH2tQI";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

   export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget ,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing,rating,Time travel each of the location for 3 days with each day plan with best time to visit in JSON format.\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "I cannot directly access and display images or real-time pricing for hotels.  Hotel prices are incredibly dynamic and change constantly.  Therefore, I'll provide you with a JSON structure containing the other requested information, and you'll need to use online travel agencies (like Expedia, Booking.com, Kayak) to find current prices and images for the hotels and attractions.\n\n```json\n{\n  \"tripDetails\": {\n    \"destination\": \"Las Vegas, Nevada\",\n    \"duration\": \"3 Days\",\n    \"travelers\": \"Couple\",\n    \"budget\": \"Cheap\"\n  },\n  \"hotels\": [\n    {\n      \"hotelName\": \"Circus Circus Hotel & Casino\",\n      \"hotelAddress\": \"2880 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": \"Check Online Travel Agencies\", \n      \"hotelImageUrl\": \"Find on Google Images/Travel site\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1209,\n        \"longitude\": -115.1728\n      },\n      \"rating\": \"Check Online Travel Agencies\",\n      \"description\": \"Family-friendly hotel with a circus theme, often offering budget-friendly rates.\"\n    },\n    {\n      \"hotelName\": \"The D Las Vegas\",\n      \"hotelAddress\": \"300 Fremont St, Las Vegas, NV 89101\",\n      \"price\": \"Check Online Travel Agencies\",\n      \"hotelImageUrl\": \"Find on Google Images/Travel site\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1696,\n        \"longitude\": -115.1401\n      },\n      \"rating\": \"Check Online Travel Agencies\",\n      \"description\": \"Downtown location, known for its affordable rates and lively atmosphere.\"\n    },\n    {\n      \"hotelName\": \"Main Street Station Casino, Brewery & Hotel\",\n      \"hotelAddress\": \"200 Bonneville Ave, Las Vegas, NV 89101\",\n      \"price\": \"Check Online Travel Agencies\",\n      \"hotelImageUrl\": \"Find on Google Images/Travel site\",\n      \"geoCoordinates\": {\n        \"latitude\": 36.1688,\n        \"longitude\": -115.1399\n      },\n      \"rating\": \"Check Online Travel Agencies\",\n      \"description\": \"Another downtown option with a historic feel and often competitive prices.\"\n    }\n\n  ],\n  \"itinerary\": {\n    \"day1\": [\n      {\n        \"placeName\": \"Fremont Street Experience\",\n        \"placeDetails\": \"Free walking area with a massive video canopy, street performers, and casinos.\",\n        \"placeImageUrl\": \"Find on Google Images\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1696,\n          \"longitude\": -115.1401\n        },\n        \"ticketPricing\": \"Free\",\n        \"rating\": \"Check Online Reviews\",\n        \"timeToSpend\": \"3-4 hours\"\n      },\n      {\n        \"placeName\": \"Neon Museum\",\n        \"placeDetails\": \"Outdoor museum featuring vintage Las Vegas signs.\",\n        \"placeImageUrl\": \"Find on Google Images\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1822,\n          \"longitude\": -115.1402\n        },\n        \"ticketPricing\": \"Check Website\",\n        \"rating\": \"Check Online Reviews\",\n        \"timeToSpend\": \"2 hours\"\n      }\n    ],\n    \"day2\": [\n      {\n        \"placeName\": \"The Strip (walking tour)\",\n        \"placeDetails\": \"Explore the famous Strip, focusing on free attractions like the Bellagio Fountains and the Mirage Volcano.\",\n        \"placeImageUrl\": \"Find on Google Images\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.1146,\n          \"longitude\": -115.1729\n        },\n        \"ticketPricing\": \"Free (except for shows and specific attractions)\",\n        \"rating\": \"N/A\",\n        \"timeToSpend\": \"Full Day\"\n      }\n    ],\n    \"day3\": [\n      {\n        \"placeName\": \"Seven Magic Mountains\",\n        \"placeDetails\": \"Colorful art installation south of Las Vegas (requires transportation).\",\n        \"placeImageUrl\": \"Find on Google Images\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.0002,\n          \"longitude\": -114.9727\n        },\n        \"ticketPricing\": \"Free\",\n        \"rating\": \"Check Online Reviews\",\n        \"timeToSpend\": \"2-3 hours\"\n      },\n       {\n        \"placeName\": \"Red Rock Canyon National Conservation Area\",\n        \"placeDetails\": \"Hiking and scenic drives.  Entry fee applies.\",\n        \"placeImageUrl\": \"Find on Google Images\",\n        \"geoCoordinates\": {\n          \"latitude\": 36.2622,\n          \"longitude\": -115.8003\n        },\n        \"ticketPricing\": \"Check NPS Website\",\n        \"rating\": \"Check Online Reviews\",\n        \"timeToSpend\": \"3-4 hours\"\n      }\n    ]\n  }\n}\n```\n\n**Important Notes:**\n\n* **Transportation:**  Consider using ride-sharing services (Uber/Lyft) or the public bus system (RTC) to keep costs down. Walking is feasible for many attractions on the Strip and downtown, but be prepared for distances.\n* **Food:** Look for affordable eateries, buffets (can be surprisingly cost-effective), and happy hour specials to save on food expenses.  Packing some snacks and drinks will also help.\n* **Shows and Activities:**  Many free activities are available in Las Vegas. Shows and other attractions can be expensive, so prioritize based on your budget.\n* **Best Time to Visit:**  Avoid peak seasons (major holidays and summer) for better hotel prices and fewer crowds.  Spring and fall offer pleasant weather.  The times listed in the JSON are suggestions and can be adjusted based on your preferences.\n\n\nRemember to replace the placeholder values (\"Check Online Travel Agencies\", \"Find on Google Images\", etc.) with the actual information you find online before your trip.  Always double-check prices and availability on official websites.\n"},
          ],
        },
      ],
    });
  
   
  