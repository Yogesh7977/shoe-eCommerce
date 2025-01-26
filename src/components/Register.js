import React from "react";
import registerStyle from "../css/register.module.css";
import registerBackground from "../images/shoe2.avif";
import { Link } from "react-router-dom";
import {
  updateRegistrationCredentials,
  resetRegistrationCredentials,
} from "../redux/slices/authslice";
import { useDispatch, useSelector } from "react-redux";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const { registrationcredentials } = useSelector((state) => state.auth)

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    dispatch(updateRegistrationCredentials({ field: name, value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(registrationcredentials)
    try{
      await createUserWithEmailAndPassword(auth, registrationcredentials.email, registrationcredentials.password);
      const user = auth.currentUser;
      console.log(user);
      if(user){
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          name: registrationcredentials.name,
          number: registrationcredentials.number
        });
      }
      console.log("User Registred as successfully");
      toast.success("User Registred as successfully",{position:"top-center"})
      dispatch(resetRegistrationCredentials());
    }
    catch (error){
      console.log(error.message)
      toast.error(error.message ,{position:"top-center"})
    }

    
  }

  return (
    <>
      <div className={`container ${registerStyle.registerContainer}`}>
        <div className={`card mb-3 ${registerStyle.card}`} style={{maxWidth:"90%"}}>
          <div className="row g-0">
            <div className="col-md-4" style={{width:"45%"}}>
              <h3 className={`${registerStyle.registerHead}`}>Registration</h3>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={registrationcredentials.name}
                      onChange={onChangeHandler}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      aria-describedby="emailHelp"
                      value={registrationcredentials.email}
                      name="email"
                      onChange={onChangeHandler}
                    />
                  </div>
                  <div className="mb-3">
                  <label htmlFor="mobileNumber" className="form-label">
                      Mobile Number
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="mobileNumber"
                      name="number"
                      value={registrationcredentials.number}
                      onChange={onChangeHandler}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      name="password"
                      value={registrationcredentials.password}
                      onChange={onChangeHandler}
                    />
                  </div>
                  <div className={`${registerStyle.registerBtn}`}>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                  </div>
                  <div className={`${registerStyle.loginLink}`}>
                  Already have an account? <Link to="/login" style={{marginLeft:"0.5em", textDecoration:"none"}}>Login</Link>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-8" style={{width:"55%"}}>
              <img
                src={registerBackground}
                className={`img-fluid rounded-start ${registerStyle['img-fluid']}`}
                alt="Regisiter Background"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
