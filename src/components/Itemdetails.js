import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import itemDetailsStyle from "../css/itemDetails.module.css";
import { deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchShoesData } from "../services/fetchShoesData";
import { toast } from "react-toastify";
import { fetchWishlistData } from "../services/fetchWishlistData";

const Itemdetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); 
  const { shoes, loading } = useSelector((state) => state.shoes);
  const { wishlist } = useSelector((state) => state.wishlist);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Find the shoe by its `uid` from the Redux store
  const shoe = shoes.find((shoe) => shoe.uid === id);


  useEffect(() => {
    
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate("/login");
      }
    });

    
    return () => unsubscribeAuth();
  }, [navigate]);

  useEffect(() => {
    if (shoes.length === 0) {
      dispatch(fetchShoesData()); 
    }
    if (!shoe) {
      console.log("Shoe not found with ID:", id);
    }
  }, [dispatch, id, shoe, shoes]);

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch wishlist data only if the user is authenticated
      const unsubscribe = dispatch(fetchWishlistData(navigate));

      // Cleanup the listener on component unmount
      return () => {
        if (unsubscribe) {
          unsubscribe(); // Call the unsubscribe function to clean up the listener
        }
      };
    }
  }, [dispatch, navigate, isAuthenticated]);

  const randomMultiplier = Math.floor(Math.random() * 10);

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
  if (!shoe) return <p>Shoe not found...</p>;

  const sendDetailsToCart = async (shoedata) => {
    if (!shoedata) return;

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      toast.error("Please login to add to cart", { position: "top-center" });
      navigate("/login");
      return;
    }

    const db = getFirestore();
    const userCartRef = doc(db, "users", user.uid, "cart", shoedata.uid);

    try {
      await setDoc(userCartRef, {
        ...shoedata,
      });
      toast.success("Item added to cart!", { position: "top-center" });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Failed to add item to cart.", { position: "top-center" });
    }
  };

  const sendDetailsToWishlist = async (shoedata) => {
    if (!shoedata) return;

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
      shoedata.uid
    );

    try {
      if (wishlist.some((item) => item.uid === shoedata.uid)) {
        await deleteDoc(userWishlistRef);
        toast.success("Item removed from Wishlist!", {
          position: "top-center",
        });
      } else {
        await setDoc(userWishlistRef, {
          ...shoedata,
        });
        toast.success("Item added to Wishlist!", { position: "top-center" });
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
    <div className="container" style={{ maxWidth: "90%" }}>
      <div className={`${itemDetailsStyle["details-container"]}`}>
        <div className={`${itemDetailsStyle["details-image"]}`}>
          <img src={shoe.image} alt={shoe.name} />
        </div>
        <div className={`${itemDetailsStyle["details-body"]}`}>
          <div className={`${itemDetailsStyle["fav-container"]}`}>
            <h3>{shoe.name}</h3>
            <div role="button" onClick={() => sendDetailsToWishlist(shoe)}>
              {wishlist.some((item) => item.uid === shoe.uid) ? (
                <FaHeart size="1.5em" style={{ fill: "red" }} />
              ) : (
                <CiHeart size="2em" />
              )}
            </div>
          </div>
          <p className={`${itemDetailsStyle["details-rating"]}`}>
            {shoe.rating.rate} Rating based on {shoe.rating.count} reviews
          </p>
          <p className={`${itemDetailsStyle["details-description"]}`}>
            {shoe.description}
          </p>
          <p className={`${itemDetailsStyle["details-price"]}`}>
            Price: ₹{(shoe.price * 80).toFixed(2)}{" "}
          </p>
          <div className={`${itemDetailsStyle["details-genderAndQuantity"]}`}>
            <p className={`${itemDetailsStyle["details-gender"]}`}>
              Gender: {shoe.gender}
            </p>
            <p className={`${itemDetailsStyle["details-quantity"]}`}>
              Quantity: {shoe.quantity * randomMultiplier}
            </p>
          </div>

          <div>
            <button
              className={`btn btn-warning ${itemDetailsStyle["add-to-cart"]}`}
              onClick={() => sendDetailsToCart(shoe)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Itemdetails;
