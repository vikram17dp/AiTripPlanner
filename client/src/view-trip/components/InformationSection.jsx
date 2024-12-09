import React from 'react';

const InformationSection = ({ trip }) => {
  const imageUrl = 
  trip?.userSelection?.tripDetails?.imageUrl?.trim() 
    ? trip.userSelection.tripDetails.imageUrl 
    : '/tour.webp';


  return (
    <div>
      <img 
        src={imageUrl}  
        alt="place img" 
        className="h-[340px] w-full object-cover rounded-xl"
      />
      <div className="my-5 flex flex-col gap-4 md:flex-row md:gap-8">
        <div className="flex flex-wrap gap-4 md:flex-nowrap">
          <h2 className="p-2 px-4 bg-gray-200 rounded-full text-gray-500">
            📍{trip?.userSelection?.tripDetails?.destination || "Location not available"}
          </h2>

          <h2 className="p-2 px-4 bg-gray-200 rounded-full text-gray-500">
          📆 {trip?.userSelection?.tripDetails?.duration}
          </h2>

          <h2 className="p-2 px-4 bg-gray-200 rounded-full text-gray-500">
          💵 Budget: {trip?.userSelection?.tripDetails?.budget} 
          </h2>

          <h2 className="p-2 px-4 bg-gray-200 rounded-full text-gray-500">
          🤝No. of travelers: {trip?.userSelection?.tripDetails?.travelers}  
          </h2>
        </div>
      </div>
    </div>
  );
};

export default InformationSection;