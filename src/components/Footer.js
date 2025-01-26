import React from "react";
import footerStyle from "../css/footer.module.css";
import { TbTruckDelivery } from "react-icons/tb";
import { RiSecurePaymentLine } from "react-icons/ri";
import { BsBoxSeamFill } from "react-icons/bs";
import { MdLiveHelp } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
const Footer = () => {
  return (
    <>
      <div className={`${footerStyle["footer-container"]}`}>
        <a
          className={`${footerStyle["navbar-brand"]}`}
          href="/"
          style={{ fontFamily: "algerian", fontSize: "2rem", color: "white" }}
        >
          MYWATCHES 
          <label
          className={`${footerStyle["label1"]}`}
            style={{
              fontFamily: "Gabriola",
              fontSize: "1rem",
              position: "relative",
              top: "-4px",
              color: "white",
            }}
          >
           <b style={{ fontFamily: "algerian", fontSize: "1.7rem" }}>|</b> Time with Perfection
          </label>
        </a>
        <div className={`${footerStyle.features}`}>
          <div className={`${footerStyle.svgs}`}>
            <TbTruckDelivery className={`${footerStyle.featuesIcons}`} />
           
            <p>Free Delivery Across India</p>
          </div>
          <div className={`${footerStyle.svgs}`}>
            <RiSecurePaymentLine className={`${footerStyle.featuesIcons}`} />
            
            <p>100% SECURE PAYMENTS</p>
          </div>
          <div className={`${footerStyle.svgs}`}>
            <BsBoxSeamFill className={`${footerStyle.featuesIcons}`} />
            
            <p>Easy Return & Exchange</p>
          </div>
          <div className={`${footerStyle.svgs}`}>
            <MdLiveHelp className={`${footerStyle.featuesIcons}`} />
            
            <p>24/7 Customer Support</p>
          </div>
        </div>
        <div className={`${footerStyle["footer-links"]}`}>
          <h5>Quick Links</h5>
          <div className={`${footerStyle.QuickIcons}`}>
          <FaInstagram className={`${footerStyle.linkIcons}`}/>
          <CiLinkedin className={`${footerStyle.linkIcons}`}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
