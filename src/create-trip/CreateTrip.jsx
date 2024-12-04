import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const CreateTrip = () => {
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
          <h2 className="text-xl my-3  font-medium">
            What is destination of choice?
          </h2>
          <GooglePlacesAutocomplete 
          apiKey="" 
          
          />
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
