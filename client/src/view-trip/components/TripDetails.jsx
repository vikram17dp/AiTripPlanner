import React from 'react';

const TripDetails = ({ tripDetails = {} }) => {
  const {
    destination = "Location not available",
    budget = "Budget not available",
    duration = "Duration not available",
    travelers = "Travelers not available",
  } = tripDetails;

  return (
    <div className="my-8 p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Trip Details</h2>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <p className="text-lg font-medium">📍Destination:</p>
          <p className="text-sm text-gray-600">{destination}</p>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-lg font-medium">💵 Budget:</p>
          <p className="text-sm text-gray-600">{budget}</p>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-lg font-medium">📆 Duration:</p>
          <p className="text-sm text-gray-600">{duration}</p>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-lg font-medium">🤝 Travelers:</p>
          <p className="text-sm text-gray-600">{travelers}</p>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
