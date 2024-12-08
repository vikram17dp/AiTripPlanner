import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import InformationSection from './InformationSection';
import ItinerarySection from './ItinerarySection ';
import { db } from '@/create-trip/firebase';
import { HotelSection } from './HotelSection';
import TripDetails from './TripDetails';


const ViewTrip = () => {
  const { tripid } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    if (tripid) {
      getTripData();
    }
  }, [tripid]);

  const getTripData = async () => {
    try {
      console.log("Fetching trip data...");
      const docRef = doc(db, 'AiTrips', tripid);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        let tripData = docSnap.data();
        console.log("Document data:", tripData);
  
        if (typeof tripData.tripData === 'string') {
          tripData.tripData = JSON.parse(tripData.tripData);
        }
  
        if (typeof tripData.userSelection === 'string') {
          tripData.userSelection = JSON.parse(tripData.userSelection);
        }
  
        setTrip(tripData);
      } else {
        console.log("No such document");
        toast.error('No trip found');
      }
    } catch (error) {
      console.error("Error fetching trip data:", error);
      toast.error('Error fetching trip data');
    }
  };
  
  

  if (!trip) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      <InformationSection trip={trip} />
      <HotelSection hotels={trip?.userSelection?.hotels || []} />

      <ItinerarySection itinerary={trip?.userSelection?.itinerary || {}} />
      <TripDetails tripDetails={trip?.userSelection?.tripDetails} /> 
    </div>
  );
};


export default ViewTrip;

