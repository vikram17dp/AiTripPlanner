import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserTripcard = ({ trip }) => {
  const imageUrl =
    trip?.userSelection?.tripDetails?.imageUrl?.trim()
      ? trip.userSelection.tripDetails.imageUrl
      : '/tour.webp';

  const destination = trip?.userSelection?.tripDetails?.destination || "Location not available";
  const duration = trip?.userSelection?.tripDetails?.duration || "Duration not available";
  const budget = trip?.userSelection?.tripDetails?.budget || "Budget not available";
  const navigate = useNavigate();

  const handleTripClick = () => {
    
    navigate(`/view-trip/${trip.id}`);
  };
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105" onClick={handleTripClick}>
      <div className="aspect-w-16 aspect-h-9">
        <img src={imageUrl} alt="Trip location" className="object-cover w-full h-full" />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">📍 {destination}</h2>
        <p className="text-sm text-gray-600 mb-1">📆 Duration: {duration}</p>
        <p className="text-sm text-gray-600">💵 Budget: {budget}</p>
      </div>
    </div>
  );
};

export default UserTripcard;

