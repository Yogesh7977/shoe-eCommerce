import axios from 'axios';
import { db } from "../components/firebase"; // Ensure this file exists and is correctly configured
import {collection,getDocs, addDoc } from 'firebase/firestore';

// Function to fetch and store data
export const fetchAndStoreData = async () => {
  const options = {
    method: 'GET',
    url: 'https://shoes-collections.p.rapidapi.com/shoes',
    headers: {
      'x-rapidapi-key': 'a88709cecbmsh932127d2d586a68p1f8c31jsncac6db5897ef',
      'x-rapidapi-host': 'shoes-collections.p.rapidapi.com'
    }
  };
  
  const fetchApiWatches = async () => {
    try {
      const shoesCollectionRef = collection(db, "shoes");
      const querySnapshot = await getDocs(shoesCollectionRef);

      if (!querySnapshot.empty) {
        console.log("Data already exists in Firestore. No need to fetch new data.");
        return;
      }

      const response = await axios.request(options);
      const shoesData = response.data;


      for (const shoe of shoesData){
        await addDoc(shoesCollectionRef, shoe)
      }

      

      console.log("Data Stored Successfully in fireStore");
    } catch (error) {
      console.error(error);
    }
  };
  fetchApiWatches();

};
