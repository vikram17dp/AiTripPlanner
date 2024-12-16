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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tripid) {
      getTripData();
    }
  }, [tripid]);

  const safeJsonParse = (jsonString, fieldName) => {
    if (typeof jsonString !== 'string') {
      console.warn(`safeJsonParse received a non-string value for ${fieldName}:`, jsonString);
      return jsonString;
    }
    try {
      const fixedJsonString = jsonString
        .replace(/\/\/.*$/gm, '') 
        .replace(/\/\*[\s\S]*?\*\//g, '') 
        .replace(/,\s*}/g, '}')
        .replace(/,\s*]/g, ']')
        .trim();
      return JSON.parse(fixedJsonString);
    } catch (error) {
      console.error(`Error parsing ${fieldName}:`, error);
      console.log(`Problematic JSON string for ${fieldName}:`, jsonString);
      toast.error(`Error parsing ${fieldName}. Some data may be missing.`);
      return {};
    }
  };

  const getTripData = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, 'AiTrips', tripid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        let tripData = docSnap.data();
        // console.log("Raw document data:", tripData);

        if (typeof tripData.tripData === 'string') {
          tripData.tripData = safeJsonParse(tripData.tripData, 'tripData');
        }

        if (typeof tripData.userSelection === 'string') {
          tripData.userSelection = safeJsonParse(tripData.userSelection, 'userSelection');
        }

        // console.log("Processed trip data:", tripData);
        setTrip(tripData);
      } else {
        console.log("No such document");
        toast.error('No trip found');
      }
    } catch (error) {
      console.error("Error fetching trip data:", error);
      toast.error('Error fetching trip data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!trip) {
    return <div className="p-10 text-center">No trip data available.</div>;
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

