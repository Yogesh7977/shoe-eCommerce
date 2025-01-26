import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { fetchWishlistStart, fetchWishlistSuccess } from "../redux/slices/wishlistslice";
import { getAuth } from "firebase/auth";

export const fetchWishlistData = (navigate) => (dispatch) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("No user is logged in");
    navigate("/login");
    return;
  }

  const db = getFirestore();
  const wishlistCollectionRef = collection(db, "users", user.uid, "wishlist");
  dispatch(fetchWishlistStart());

  // Setup real-time listener
  const unsubscribe = onSnapshot(wishlistCollectionRef, (snapshot) => {
    const wishlistData = snapshot.docs.map((doc) => ({
      uid: doc.id,
      ...doc.data(),
    }));

    dispatch(fetchWishlistSuccess(wishlistData));
  });

  // Return the unsubscribe function
  return unsubscribe;
};
