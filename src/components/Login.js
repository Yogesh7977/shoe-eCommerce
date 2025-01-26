import React from 'react';
import loginStyle from "../css/loginStyle.module.css";
import LoginBackground from "../images/shoe1.avif";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetLoginCredentials, updateLoginCredentials } from '../redux/slices/authslice';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const {loginCredentials} = useSelector((state) => state.auth)
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    e.preventDefault();
    const{name, value} = e.target;
    dispatch(updateLoginCredentials({ field: name, value}));
  }
  
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginCredentials.email, loginCredentials.password);
      console.log("User Logged In Successfully");
      navigate("/")
      toast.success("User Logged In Successfully", {position:"top-center"})
      dispatch(resetLoginCredentials());
    } catch (error) {
      console.log(error.message);
      toast.error(error.message ,{position:"top-center"});
    }
  }

  return (
    <>
    <div className={`container ${loginStyle.registerContainer}`}>
      <div className={`card mb-3 ${loginStyle.card}`} style={{maxWidth:"90%"}}>
        <div className="row g-0">
          <div className="col-md-4" style={{width:"55%"}}>
          <img
              src={LoginBackground}
              className={`img-fluid rounded-start ${loginStyle['img-fluid']}`}
              alt="login Background"
            />        
          </div>
          <div className="col-md-8" style={{width:"45%"}}>
          <h3 className={`${loginStyle.registerHead}`}>Login</h3>
            <div className="card-body">
              <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    name='email'
                    value={loginCredentials.email}
                    onChange={handleOnChange}
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
                    name='password'
                    value={loginCredentials.password}
                    onChange={handleOnChange}
                  />
                </div>
                <div className={`${loginStyle.registerBtn}`}>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                </div>
                <div className={`${loginStyle.loginLink}`}>
                You don’t have any account? <Link to="/register" style={{marginLeft:"0.5em", textDecoration:"none"}}>Register</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Login
