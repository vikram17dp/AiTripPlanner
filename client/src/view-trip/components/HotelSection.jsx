export const HotelSection = ({ hotels }) => {
  const hotelsList = Array.isArray(hotels) ? hotels : [];

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-6">Recommended Hotels</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hotelsList.length > 0 ? (
          hotelsList.map((hotel, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-md">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 mb-4 md:mb-0">
                  <img 
                    src={ '/tour.webp'} 
                    alt={hotel.hotelName} 
                    className="w-full h-[250px] object-cover rounded-lg"
                  />
                </div>
                <div className="w-full md:w-1/2 md:pl-6">
                  <h3 className="text-xl font-semibold mb-2">{hotel.hotelName || "Hotel Name not available"}</h3>
                  <p className="text-gray-600 mb-4">{hotel.description || "Description not available"}</p>

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
                    href={hotel.locationInMap  ? `https://www.google.com/maps/search/?q=${hotel.locationInMap }` : "#"} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-500 hover:underline"
                  >
                    View on Map
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hotels available at this time.</p>
        )}
      </div>
    </div>
  );
};
