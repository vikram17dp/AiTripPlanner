import React from 'react';

export const HotelSection = ({ hotels }) => {
  const hotelsList = Array.isArray(hotels) ? hotels : [];

  return (
    <div className="my-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-6">Recommended Hotels</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hotelsList.length > 0 ? (
          hotelsList.map((hotel, index) => {
            const { latitude, longitude } = hotel.location || {};
            const googleMapsUrl = latitude && longitude
              ? `https://www.google.com/maps/search/?q=${latitude},${longitude}`
              : `https://www.google.com/maps/search/?q=${encodeURIComponent(hotel.locationInMap || hotel.location || '')}`;

            return (
              <div key={index} className="border rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg hover:scale-[1.02]">
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full sm:w-4/6 h-48 sm:h-auto p-4">
                    <img 
                      src={'/tour.webp'} 
                      alt={hotel.hotelName} 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="w-full sm:w-3/5 p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 ">{hotel.hotelName || "Hotel Name not available"}</h3>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-2">{hotel.description || "Description not available"}</p>

                    <div className="space-y-2">
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        🌟 <span className="font-medium">Rating:</span> {hotel.rating || "N/A"}
                      </p>

                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        💵 <span className="font-medium">Price:</span> {hotel.price || "N/A"}
                      </p>

                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        📍 <span className="font-medium">Location:</span> 
                        <span className="line-clamp-1">{hotel.location || "N/A"}</span>
                      </p>
                    </div>

                    <a 
                      href={googleMapsUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-block mt-4 text-blue-500 hover:underline text-sm"
                    >
                      View on Map
                    </a>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="col-span-full text-center py-8 bg-gray-100 rounded-lg text-gray-600">No hotels available at this time.</p>
        )}
      </div>
    </div>
  );
};

