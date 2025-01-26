import React, { useEffect } from "react";
import threedshoe from "../images/threedshoes.png";
import homeStyle from "../css/home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchShoesData } from "../services/fetchShoesData";
import mensimg from "../images/mens.png";
import womensimg from "../images/womens.png";
import uniseximg from "../images/unisex.png";
import allproductsimg from "../images/allproducts.png";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shoes, loading } = useSelector((state) => state.shoes);

  const catogaryimg = [
    { id: 1, img: mensimg, name: "Mens", path: "/category/mens" },
    { id: 2, img: womensimg, name: "Womens", path: "/category/womens" },
    { id: 3, img: uniseximg, name: "Unisex", path: "/category/unisex" },
    {
      id: 4,
      img: allproductsimg,
      name: "All Products",
      path: "/category/allproducts",
    },
  ];

  useEffect(() => {
    dispatch(fetchShoesData());
  }, [dispatch]);

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

  const ShoesToDisplay = shoes.filter((shoe, index) => [0, 1].includes(index));
  const eightShoesToDisplay = shoes.slice(0, 8);

  const handleCardDetails = (ID) => {
    navigate(`/Itemdetails/${ID}`);
  };

  return (
    <>
      <div className={`${homeStyle["banner-container"]}`}>
        <div className={`${homeStyle["text-container"]}`}>
          <h1>
            GIVING A STYLE
            <br />
            THAT MATTERS
          </h1>
        </div>
        <div className={`${homeStyle["image-container"]}`}>
          <img src={threedshoe} alt="shoe" />
        </div>
      </div>

      <div className={`container ${homeStyle["catogary-container"]}`}>
        <div class={`row row-cols-1 row-cols-md-4 g-4 ${homeStyle['row']}`}>
          {catogaryimg.map((catogary) => (
            <div key={catogary.id} class={`col-6 ${homeStyle["col"]}`}>
              <Link to={catogary.path} className="text-decoration-none">
                <div class={`card ${homeStyle["card"]}`}>
                  <img
                    src={catogary.img}
                    class={`card-img-top ${homeStyle["custom-img"]}`}
                    alt={catogary.name}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className={`${homeStyle["shoes-container"]}`}>
        {ShoesToDisplay.map((shoe, index) => (
          <div
            key={shoe.id}
            className={`${homeStyle["shoe-item"]} ${
              index % 2 === 0
                ? homeStyle["left-image"]
                : homeStyle["right-image"]
            }`}
            role="button"
            onClick={() => handleCardDetails(shoe.uid)}
          >
            <div className={`img-fluid ${homeStyle["shoe-image"]}`}>
              <img src={shoe.image} alt={shoe.name} />
            </div>
            <div className={`${homeStyle["shoe-details"]}`}>
              <h2>{shoe.name}</h2>
              <p>{shoe.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="container" style={{ maxWidth: "90%", marginTop: "3%" }}>
        <h1>Best Products</h1>
      </div>
      <div className={`container ${homeStyle["all-shoe-container"]}`}>
        {eightShoesToDisplay.map((shoe) => (
          <div
            key={shoe.id}
            class={`card ${homeStyle.eachcard}`}
            role="button"
            onClick={() => handleCardDetails(shoe.uid)}
            style={{ width: "25rem" }}
          >
            <img
              src={shoe.image}
              class={`card-img-top ${homeStyle["custom-img2"]}`}
              alt={shoe.name}
            />
            <div class={`card-body ${homeStyle["card-body"]}`}>
              <h5 className={`card-title ${homeStyle["card-title"]}`}>
                {shoe.name.length > 30
                  ? shoe.name.slice(0, 30) + "..."
                  : shoe.name}
              </h5>
              <p className={`card-text ${homeStyle["card-text"]}`}>{shoe.description.slice(0, 80) + "..."}</p>
              <p className={` ${homeStyle["price"]}`}>Price: ₹{(shoe.price * 83).toFixed(2)}</p>
              <p className={` ${homeStyle["gender"]}`}>{shoe.gender}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
