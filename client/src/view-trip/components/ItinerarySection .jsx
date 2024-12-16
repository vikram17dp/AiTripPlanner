// ItinerarySection.js
import React from 'react';

const ItinerarySection = ({ itinerary = {} }) => {
  const validItinerary = typeof itinerary === 'object' ? itinerary : {};

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Daily Plan</h2>
      <div className="space-y-6">
        {Object.keys(validItinerary).length > 0 ? (
          Object.keys(validItinerary).map((dayKey, index) => {
            const day = validItinerary[dayKey];
            return (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Day {index + 1}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {day.map((place, placeIndex) => {
                    const imageUrl = place.imageUrl || '/tour.webp';
                    const { latitude, longitude } = place.location || {};

                    const googleMapsUrl = latitude && longitude 
                      ? `https://www.google.com/maps/search/?q=${latitude},${longitude}`
                      : '#';

                    return (
                      <div key={placeIndex} className="border-l-4 border-blue-500 pl-4">
                        <div className="mb-4">
                          <img
                            src={imageUrl}
                            alt={place.placeName || 'Place Image'}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                        <h4 className="font-medium">🏰 {place.placeName || 'Place Name not available'}</h4>
                        <p className="text-sm text-gray-600">
                          {place.details || 'Details not available'}
                        </p>
                        <p className="text-sm text-gray-500">
                          💰 <span className="font-bold">Pricing:</span> {place.pricing || 'Pricing not available'}
                        </p>
                        <p className="text-sm text-gray-500">
                          ⏰ <span className="font-bold">Timings:</span> {place.timings || 'Timings not available'}
                        </p>
                        <a 
                          href={googleMapsUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-blue-500 hover:underline"
                        >
                          View on Map
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <p>No itinerary available at this time. 🛑</p>
        )}
      </div>
    </div>
  );
};

export default ItinerarySection;
