import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCartData } from "../services/fetchCartData";
import cartStyle from "../css/cart.module.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { decrementQuantity, incrementQuantity } from "../redux/slices/cartslice";
import { MdDelete } from "react-icons/md";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((state) => state.cart);
  console.log(cart);
  const totalPrice = cart
    .reduce((total, item) => total + item.price * 80 * item.quantity, 0)
    .toFixed(2);

    useEffect(() => {
      const auth = getAuth();
      // Listen for authentication state changes
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(fetchCartData(navigate));
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

     const handleDeleteButton = async (shoeData) => {
         if (!shoeData) return;
     
         const auth = getAuth();
         const user = auth.currentUser;
         if (!user) {
           alert("Please login to add to Cart");
           navigate("/login");
           return;
         }
     
         const db = getFirestore();
         const userCartRef = doc(
           db,
           "users",
           user.uid,
           "cart",
           shoeData.uid
         );
     
         try {
           if (cart.some((item) => item.uid === shoeData.uid)) {
             await deleteDoc(userCartRef);
             toast.success("Item removed from Cart!", {
               position: "top-center",
             });
           }
           dispatch(fetchCartData(navigate));
         } catch (error) {
           console.error("Error adding item to Cart:", error);
           toast.error("Failed to add item to Cart.", {
             position: "top-center",
           });
         }
       };
  return (
    <>
      <div className={`container ${cartStyle["main-cart-container"]}`}>
        <div className={`container ${cartStyle["cart-container"]}`}>
          {cart.map((cart) => (
            <div key={cart.uid} className={`col ${cartStyle["cart-item"]}`}>
              <div className={` ${cartStyle["card-image"]}`}>
                <img src={cart.image} alt={cart.name} />
                
              </div>
              <div className={`card-body ${cartStyle["card-body"]}`}>
              <div className={`${cartStyle["card-title-and-delete"]}`}>
                <h5 className={`${cartStyle["card-title"]}`}>{cart.name}</h5>
                <MdDelete
                    className={`${cartStyle["delete-icon"]}`}
                    role="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteButton(cart);
                    }}
                  />
                </div>  
                <p className="card-text">
                  Price: ₹{(cart.price * 80).toFixed(2)}
                </p>
                <div className={cartStyle["quantity-controls"]}>
                <button
                  className={cartStyle["decrement-btn"]}
                  onClick={() => dispatch(decrementQuantity(cart.uid))}
                >
                  -
                </button>
                <span>{cart.quantity}</span>
                <button
                  className={cartStyle["increment-btn"]}
                  onClick={() => dispatch(incrementQuantity(cart.uid))}
                >
                  +
                </button>
              </div>
              </div>
            </div>
          ))}
          <div className={`${cartStyle["checkout-btn-container"]}`}>
            <div className={`${cartStyle["price-details-container"]}`}>
              <h5 className={`card-title ${cartStyle["card-title"]}`}>
                Price Details
              </h5>
              <p className={`card-text ${cartStyle["card-text-totalPrice"]}`}>
                Price ({cart.length} items) = ₹{totalPrice}
              </p>
            </div>
            <button className={`${cartStyle["checkout-btn"]}`}>Checkout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
