import { getFirestore, collection, getDocs } from "firebase/firestore";
import { fetchshoesstart, fetchShoesSuccess } from "../redux/slices/shoesslice";

export const fetchShoesData = () => async (dispatch) => {
  const db = getFirestore();
  dispatch(fetchshoesstart());

  try {
    const querySnapshot = await getDocs(collection(db, "shoes"));
    const shoesData = querySnapshot.docs.map((doc) => {
      console.log("Document ID:", doc.id);  // Log the document ID here
      return {
        uid: doc.id,
        ...doc.data(),
      };
    });
    dispatch(fetchShoesSuccess(shoesData));
  } catch (error) {
    console.log(error);
  }
};
