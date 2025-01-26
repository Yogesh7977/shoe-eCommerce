import React, { useEffect, useRef, useState } from "react";
import { FaRegUser, FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { IoLogIn } from "react-icons/io5";
import navbarStyle from "../css/navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search, setSearchVal] = useState("");
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const navbarRef = useRef(null);
  const navbarTogglerRef = useRef(null);

  const toggleNavbar = () => {
    setIsNavbarOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target) &&
        !navbarTogglerRef.current.contains(event.target)
      ) {
        setIsNavbarOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  let startX;
  let endX;

  const handleTouchStart = (e) => {
    startX = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    endX = e.changedTouches[0].screenX;
    if (startX > endX + 50) {
      setIsNavbarOpen(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

  const onChangeHandeler = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSearchVal(value);

    console.log(value);

    if (value.trim() === "") {
      navigate(`/category/allproducts`);
    } else {
      navigate(`/category/allproducts?search=${value}`);
    }
  };

  return (
    <>
      <div className={`container ${navbarStyle['nav-container']}`}>
        <nav className="navbar navbar-expand-lg ">
          <div className={`container-fluid ${navbarStyle.containerfluid}`}>
          <button
              className="navbar-toggler"
              type="button"
              ref={navbarTogglerRef}
              onClick={toggleNavbar}
              aria-expanded={isNavbarOpen}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" style={{height:"1.3rem", width:"1.3rem"}}></span>
            </button>
            <Link
              className={`navbar-brand ${navbarStyle["navbar-brand"]}`}
              to="/"
              style={{ fontFamily: "algerian", fontSize: "2rem" }}
            >
              MYSHOES
              <label
                className={`${navbarStyle.subLabel}`}
                style={{
                  fontFamily: "Gabriola",
                  fontSize: "1rem",
                  position: "relative",
                  top: "-4px",
                }}
              >
                <b style={{ fontFamily: "algerian", fontSize: "1.7rem" }}>|</b>
                Step into style with every stride.
              </label>
            </Link>

            
            <div
              className={`collapse navbar-collapse ${
                isNavbarOpen ? "show" : ""
              }`}
              id="navbarSupportedContent"
              ref={navbarRef}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              style={{ transition: "left 0.3s ease-in-out" }}
            >
              <ul className="navbar-nav ms-4 me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/category/allproducts">
                    Shoes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/category/mens">
                    Men
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/category/womens">
                    Women
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/category/unisex">
                    Unisex
                  </Link>
                </li>
              </ul>
              
              <ul className="navbar-nav ms-4" style={{ zIndex: "2" }}>
                {isLoggedIn ? (
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      <FaRegUser />
                    </Link>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                      <IoLogIn />
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link className="nav-link" to="/wishlist">
                    <FaRegHeart />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    <FiShoppingCart />
                  </Link>
                </li>
              </ul>
            </div>
            <form
                className={`d-flex ms-4 ${navbarStyle["search-box"]}`}
                role="search"
                style={{ zIndex: "2" }}
              >
                <input
                  className="form-control me-2"
                  id={`${navbarStyle["searchInput"]}`}
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={onChangeHandeler}
                />
              </form>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
