import React, { useEffect } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileDetails } from "../redux/slices/authslice";
import profileStyle from "../css/profile.module.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profileDetails } = useSelector((state) => state.auth);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          dispatch(updateProfileDetails(docSnap.data()));
        } else {
          console.log("No user document found!");
          toast.error("No user document found!",{position:"top-center"})
        }
      }else{
        console.log("User Is not Logged In");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line 
  }, []);

  const handleLogout = async () => {
      try {
        await auth.signOut();
        navigate("/login");
        toast.success("User Logged Out Successfully!",{position:"top-center"})
      } catch (error) {
        console.log("error Logging Out: ", error.message);
      }
  }

  return (
    <>
      <div className={`container ${profileStyle.container}`}>
        <h3>MY ACCOUNT</h3>
        {profileDetails ? (
          <div className={`${profileStyle.persnolDetails}`}>
            <div className={`${profileStyle.subheading}`}>
            <h4>Personal Information</h4>
            </div>
            <div className={`${profileStyle.info}`}>
            <div className={`row ${profileStyle["info-item"]}`}>
                <span className={`col-sm ${profileStyle.label}`}>Name</span>
                <span className={`col-auto ${profileStyle.label}`}>:</span>
                <span className={`col ${profileStyle.label}`}>{profileDetails.name}</span>
            </div>    
            <div className={`row ${profileStyle["info-item"]}`}>
                <span className={`col-sm ${profileStyle.label}`}>Email</span>
                <span className={`col-auto ${profileStyle.label}`}>:</span>
                <span className={`col-sm ${profileStyle.label}`}>{profileDetails.email}</span>
            </div>  
            <div className={`row ${profileStyle["info-item"]}`}>
                <span className={`col-sm ${profileStyle.label}`}>Phone Number</span>
                <span className={`col-auto ${profileStyle.label}`}>:</span>
                <span className={`col-sm ${profileStyle.label}`}>{profileDetails.number}</span>
            </div>
            </div>
            <div className={` ${profileStyle.logoutbtn}`}>
            <button className={`btn btn-danger ${profileStyle.btn1}`} type="button" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default Profile;
