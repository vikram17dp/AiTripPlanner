import { db } from '@/create-trip/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTripcard from './components/UserTripcard';
import { toast } from 'sonner';

const MyTrips = () => {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    try {
      const userString = localStorage.getItem('user');
      if (!userString) {
        console.error('User data not found in localStorage');
        toast.error('User not found. Please log in.');
        navigate('/login'); 
        return;
      }

      const user = JSON.parse(userString);
      if (!user?.email) {
        console.error('User email is missing in localStorage data:', user);
        toast.error('User data is incomplete. Please log in again.');
        navigate('/login'); 
        return;
      }

      const tripsRef = collection(db, 'AiTrips');
      const q = query(tripsRef, where('userEmail', '==', user.email));

      const querySnapshot = await getDocs(q);
      const tripsData = [];

      if (querySnapshot.empty) {
        console.log("No trips found for this user.");
        toast.info('No trips found. Create your first trip!');
      } else {
        querySnapshot.forEach((doc) => {
          let tripData = {
            id: doc.id,
            ...doc.data()
          };

          if (typeof tripData.tripData === 'string') {
            tripData.tripData = JSON.parse(tripData.tripData);
          }

          if (typeof tripData.userSelection === 'string') {
            tripData.userSelection = JSON.parse(tripData.userSelection);
          }

          tripsData.push(tripData);
        });

        setUserTrips(tripsData);
        // console.log("Trips data fetched:", tripsData);
      }
    } catch (error) {
      console.error("Error fetching user trips:", error);
      toast.error('Error fetching user trips');
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl mb-2 text-gray-600">My Trips</h2>
      <h3 className="text-md sm:text-md mb-4 text-gray-4400">Explore your personalized travel experiences</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 cursor-pointer">
        {userTrips.length > 0 ? (
          userTrips.map((trip) => (
            <UserTripcard key={trip.id} trip={trip} />
          ))
        ) : (
          <div className="col-span-full text-center">No trips found. Create your first trip!</div>
        )}
      </div>
    </div>
  );
};

export default MyTrips;

