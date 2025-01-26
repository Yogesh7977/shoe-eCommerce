import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchWishlistData } from "../services/fetchWishlistData";
import wishlistStyle from "../css/wishlist.module.css";
import { MdDelete } from "react-icons/md";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { wishlist, loading } = useSelector((state) => state.wishlist);
  console.log(wishlist);

  useEffect(() => {
    const auth = getAuth();
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(fetchWishlistData(navigate));
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);

  if (loading)
    return (
      <div
        class="spinner-border"
        style={{
          width: "3rem",
          height: "3rem",
          position: "fixed",
          top: "50%",
          left: "50%",
          zIndex: 1000,
        }}
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    );

  const handleCardDetails = (ID) => {
    navigate(`/Itemdetails/${ID}`);
  };

  const handleDeleteButton = async (shoeData) => {
    if (!shoeData) return;

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      alert("Please login to add to Wishlist");
      navigate("/login");
      return;
    }

    const db = getFirestore();
    const userWishlistRef = doc(
      db,
      "users",
      user.uid,
      "wishlist",
      shoeData.uid
    );

    try {
      if (wishlist.some((item) => item.uid === shoeData.uid)) {
        await deleteDoc(userWishlistRef);
        toast.success("Item removed from Wishlist!", {
          position: "top-center",
        });
      }
      dispatch(fetchWishlistData(navigate));
    } catch (error) {
      console.error("Error adding item to Wishlist:", error);
      toast.error("Failed to add item to Wishlist.", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <div className={`container ${wishlistStyle["main-cart-container"]}`}>
        <h3>MY WISHLIST ({wishlist.length})</h3>
        <div className={`container ${wishlistStyle["cart-container"]}`}>
          {wishlist.map((wishlist) => (
            <div
              key={wishlist.uid}
              className={`col ${wishlistStyle["cart-item"]}`}
              role="button"
              onClick={() => handleCardDetails(wishlist.uid)}
            >
              <div className={` ${wishlistStyle["card-image"]}`}>
                <img src={wishlist.image} alt={wishlist.name} />
              </div>
              <div className={`card-body ${wishlistStyle["card-body"]}`}>
                <div className={`${wishlistStyle["card-title-and-delete"]}`}>
                  <h5 className={`${wishlistStyle["card-title"]}`}>
                    {wishlist.name}
                  </h5>
                  <MdDelete
                    className={`${wishlistStyle["delete-icon"]}`}
                    role="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteButton(wishlist);
                    }}
                  />
                </div>
                <p className={`${wishlistStyle["details-rating"]}`}>
                  {wishlist.rating.rate} Rating based on {wishlist.rating.count}{" "}
                  reviews
                </p>
                <p className={`${wishlistStyle["card-text"]}`}>
                  <b>Price: ₹{(wishlist.price * 80).toFixed(2)}</b>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
