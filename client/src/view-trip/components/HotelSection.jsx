import React from 'react';

export const HotelSection = ({ hotels }) => {
  const hotelsList = Array.isArray(hotels) ? hotels : [];

  return (
    <div className="my-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-6">Recommended Hotels</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {hotelsList.length > 0 ? (
          hotelsList.map((hotel, index) => {
            const { latitude, longitude } = hotel.location || {};
            const googleMapsUrl = latitude && longitude
              ? `https://www.google.com/maps/search/?q=${latitude},${longitude}`
              : `https://www.google.com/maps/search/?q=${encodeURIComponent(hotel.locationInMap || hotel.location || '')}`;

            return (
              <div key={index} className="border rounded-lg p-4 shadow-md">
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full sm:w-1/2 mb-4 sm:mb-0">
                    <img 
                      src={'/tour.webp'} 
                      alt={hotel.hotelName} 
                      className="w-full h-48 sm:h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="w-full sm:w-1/2 sm:pl-6">
                    <h3 className="text-xl font-semibold mb-2">{hotel.hotelName || "Hotel Name not available"}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{hotel.description || "Description not available"}</p>

                    <p className="text-sm text-gray-500 flex items-center gap-2 mb-2">
                      🌟 <span className="font-bold">Rating:</span> {hotel.rating || "Rating not available"}
                    </p>

                    <p className="text-sm text-gray-500 flex items-center gap-2 mb-2">
                      💵 <span className="font-bold">Price:</span> {hotel.price || "Price not available"}
                    </p>

                    <p className="text-sm text-gray-500 flex items-center gap-2 mb-2">
                      📍 <span className="font-bold">Location:</span> {hotel.location || "Location not available"}
                    </p>

                    <a 
                      href={googleMapsUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-500 hover:underline text-sm"
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
