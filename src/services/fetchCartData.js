import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { fetchsCartstart, setCartItems } from "../redux/slices/cartslice";
import { getAuth } from "firebase/auth";

export const fetchCartData = (navigate) => async (dispatch) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if(!user){
        console.error("No user is logged in");
        navigate("/login")
        return;
    }

    const db = getFirestore();
    const cartCollectionRef = collection(db, "users", user.uid, "cart");
    dispatch(fetchsCartstart())

    const unsubscribe = onSnapshot(cartCollectionRef, (snapshot) => {
        const cartData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        dispatch(setCartItems(cartData));
    });

    return unsubscribe;

};